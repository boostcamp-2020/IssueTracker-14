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
        let loginInfo = LoginInfo(email: email, password: password)
        loginUseCase.login(with: loginInfo) { result in
            switch result {
            case let .success(response):
                print(response)//로그인 성공 화면전환
            case let .failure(error):
                print(error) // alert 띄우기
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
        view.addSubview(appleLoginButton)
        NSLayoutConstraint.activate([
            appleLoginButton.widthAnchor.constraint(equalTo: githubLoginButton.widthAnchor),
            appleLoginButton.topAnchor.constraint(equalTo: githubLoginButton.bottomAnchor, constant: 18),
            appleLoginButton.heightAnchor.constraint(equalTo: githubLoginButton.heightAnchor),
            appleLoginButton.centerXAnchor.constraint(equalTo: view.centerXAnchor)
        ])
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
        localLoginButton.isEnabled = patternChecker.isValid(email: emailText)
            && patternChecker.isValid(passWord: passwordText)
    }
}
