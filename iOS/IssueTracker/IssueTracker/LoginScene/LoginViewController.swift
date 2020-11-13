//
//  LoginViewController.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/10/27.
//

import UIKit
import AuthenticationServices

final class LoginViewController: UIViewController {
    
    static var identifier: String {
        return String(describing: Self.self)
    }
    @IBOutlet private weak var emailInputView: InputView!
    @IBOutlet private weak var passwordInputView: InputView!
    @IBOutlet private weak var localLoginButton: UIButton!
    @IBOutlet private weak var githubLoginButton: UIButton!
    private let appleLoginButton: ASAuthorizationAppleIDButton = ASAuthorizationAppleIDButton()
    private let patternChecker: SignUpPatternChecker = SignUpPatternChecker()
    private let loginUseCase: LoginUseCaseType
    weak var coordinator: LoginCoordinator?
    
    @IBAction func signUpButtonDidTouchUp(_ sender: Any) {
        coordinator?.showSignUp()
    }
    
    init?(coder: NSCoder, useCase: LoginUseCaseType) {
        loginUseCase = useCase
        super.init(coder: coder)
    }
    
    required init?(coder: NSCoder) {
        fatalError("This viewController must be init with useCase.")
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        configureAppleLoginButton()
        configureInputViews()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        navigationController?.setNavigationBarHidden(true, animated: animated)
        passwordInputView.textField.text = ""
        emailInputView.textField.text = ""
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        navigationController?.setNavigationBarHidden(false, animated: animated)
    }
    
    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        super.touchesBegan(touches, with: event)
        view.endEditing(true)
    }
    
    @IBAction private func githubLoginButtonDidTouchUp(_ sender: UIButton) {
        coordinator?.showGithubLogin(delegate: self)
    }
    
    @IBAction private func loginButtonDidTouchUp(_ sender: Any) {
        guard let email = emailInputView.textField.text,
              let password = passwordInputView.textField.text else { return }
        let loginInfo = LocalLoginInfo(email: email, password: password)
        loginUseCase.login(with: loginInfo) { [weak self] result in
            DispatchQueue.main.async {
                switch result {
                case let .success(response):
                    self?.coordinator?.showIssueList(userToken: response.token)
                case let .failure(error):
                    self?.alert(message: error.localizedDescription)
                }
            }
        }
    }
}

private extension LoginViewController {
    func configureAppleLoginButton() {
        appleLoginButton.translatesAutoresizingMaskIntoConstraints = false
        appleLoginButton.cornerRadius = 10
        appleLoginButton.addTarget(self, action: #selector(appleLoginButtonTouchUp), for: .touchUpInside)
        view.addSubview(appleLoginButton)
        NSLayoutConstraint.activate([
            appleLoginButton.widthAnchor.constraint(equalTo: githubLoginButton.widthAnchor),
            appleLoginButton.topAnchor.constraint(equalTo: githubLoginButton.bottomAnchor, constant: 18),
            appleLoginButton.heightAnchor.constraint(equalTo: githubLoginButton.heightAnchor),
            appleLoginButton.centerXAnchor.constraint(equalTo: view.centerXAnchor)
        ])
    }
    
    @objc func appleLoginButtonTouchUp() {
        let appleIDProvider = ASAuthorizationAppleIDProvider()
        let request = appleIDProvider.createRequest()
        request.requestedScopes = [.fullName, .email]
        
        let authorizationController = ASAuthorizationController(authorizationRequests: [request])
        authorizationController.delegate = self
        authorizationController.presentationContextProvider = self
        authorizationController.performRequests()
    }
}

extension LoginViewController: ASAuthorizationControllerDelegate {
    func authorizationController(controller: ASAuthorizationController,
                                 didCompleteWithAuthorization authorization: ASAuthorization) {
        let credential = authorization.credential as? ASAuthorizationAppleIDCredential
        let email = credential?.email ?? ""
        let familyName = credential?.fullName?.familyName ?? ""
        let givenName = credential?.fullName?.givenName ?? ""
        guard let hashcode = credential?.user else { return }
        let info = AppleLoginInfo(email: email, name: familyName + givenName, hashcode: hashcode)
        loginUseCase.login(with: info) { [weak self] result in
            DispatchQueue.main.async {
                switch result {
                case let .success(response):
                    self?.coordinator?.showIssueList(userToken: response.token)
                case let .failure(error):
                    self?.alert(message: error.localizedDescription)
                }
            }
        }
    }
    
    func authorizationController(controller: ASAuthorizationController, didCompleteWithError error: Error) {
        alert(message: "로그인 실패!\n\(error.localizedDescription)")
    }
}

extension LoginViewController: ASAuthorizationControllerPresentationContextProviding {
    func presentationAnchor(for controller: ASAuthorizationController) -> ASPresentationAnchor {
        return view.window ?? ASPresentationAnchor()
    }
}

extension LoginViewController: UITextFieldDelegate {
    private func configureInputViews() {
        passwordInputView.textField.delegate = self
        emailInputView.textField.delegate = self
    }
    
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        switch textField {
        case emailInputView.textField:
            emailInputView.textField.resignFirstResponder()
            passwordInputView.textField.becomeFirstResponder()
        case passwordInputView.textField:
            passwordInputView.textField.resignFirstResponder()
        default:
            break
        }
        return true
    }
    
    func textFieldDidBeginEditing(_ textField: UITextField) {
        textField.layer.borderWidth = 1
    }
    
    func textFieldDidEndEditing(_ textField: UITextField) {
        textField.layer.borderWidth = 0
    }
    
    func textFieldDidChangeSelection(_ textField: UITextField) {
        guard let emailText = emailInputView.textField.text,
              let passwordText = passwordInputView.textField.text else { return }
        localLoginButton.isEnabled = (!emailText.isEmpty && !passwordText.isEmpty)
    }
}

extension LoginViewController: GithubLoginViewControllerDelegate {
    func loginComplete(token: String) {
        coordinator?.showIssueList(userToken: token)
    }
}
