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
    @IBOutlet private weak var passwordInputView: InputView!
    @IBOutlet private weak var emailInputView: InputView!
    @IBOutlet private weak var localLoginButton: UIButton!
    @IBOutlet private weak var githubLoginButton: UIButton!
    private let appleLoginButton: ASAuthorizationAppleIDButton = ASAuthorizationAppleIDButton()
    private let patternChecker: PatternChecker = PatternChecker()
    private let loginUseCase: LoginUseCaseType
    weak var coordinator: MainCoordinator?
    
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
    
    @IBAction func loginButtonDidTouchUp(_ sender: Any) {
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
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        navigationController?.setNavigationBarHidden(true, animated: animated)
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        navigationController?.setNavigationBarHidden(false, animated: animated)
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
        guard let email = credential?.email,
              let familyName = credential?.fullName?.familyName,
              let givenName = credential?.fullName?.givenName,
              let hashcode = credential?.user else { return }
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
