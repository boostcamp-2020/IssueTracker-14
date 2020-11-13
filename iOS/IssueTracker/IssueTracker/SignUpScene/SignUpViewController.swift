//
//  SignUpViewController.swift
//  IssueTracker
//
//  Created by TTOzzi on 2020/10/28.
//

import UIKit

final class SignUpViewController: KeyboardObservableViewController {
    
    static var identifier: String {
        return String(describing: Self.self)
    }
    @IBOutlet private weak var emailInputView: InputView!
    @IBOutlet private weak var passwordInputView: InputView!
    @IBOutlet private weak var passwordConfirmInputView: InputView!
    @IBOutlet private weak var nameInputView: InputView!
    @IBOutlet private weak var completeButton: UIButton!
    private let patternChecker: SignUpPatternChecker = SignUpPatternChecker()
    private let signUpUseCase: SignUpUseCase
    weak var coordinator: LoginCoordinator?
    
    init?(coder: NSCoder, useCase: SignUpUseCase) {
        signUpUseCase = useCase
        super.init(coder: coder)
    }
    
    required init?(coder: NSCoder) {
        fatalError("This viewController must be init with useCase.")
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        configureInputViews()
    }
    
    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        super.touchesBegan(touches, with: event)
        view.endEditing(true)
    }
    
    @IBAction private func completeButtonTouchUp(_ sender: UIButton) {
        signUpUseCase.signUp(with: patternChecker.info) { [weak self] error in
            DispatchQueue.main.async {
                if let error = error {
                    self?.alert(message: error.localizedDescription)
                    return
                }
                self?.alert(message: "회원가입 성공!", completion: { _ in
                    self?.navigationController?.popViewController(animated: true)
                })
            }
        }
    }
}

extension SignUpViewController: UITextFieldDelegate {
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        switch textField {
        case emailInputView.textField:
            emailInputView.textField.resignFirstResponder()
            passwordInputView.textField.becomeFirstResponder()
        case passwordInputView.textField:
            passwordInputView.textField.resignFirstResponder()
            passwordConfirmInputView.textField.becomeFirstResponder()
        case passwordConfirmInputView.textField:
            passwordConfirmInputView.textField.resignFirstResponder()
            nameInputView.textField.becomeFirstResponder()
        case nameInputView.textField:
            nameInputView.textField.resignFirstResponder()
        default:
            break
        }
        return true
    }
}

extension SignUpViewController: InputViewDelegate {
    func textDidChanged(_ inputView: InputView, text: String) {
        switch inputView {
        case emailInputView:
            inputView.render(with: patternChecker.isValid(email: text))
        case passwordInputView:
            inputView.render(with: patternChecker.isValid(passWord: text))
            passwordConfirmInputView.render(with: patternChecker.isValid(passwordCheck: nil))
        case passwordConfirmInputView:
            inputView.render(with: patternChecker.isValid(passwordCheck: text))
        case nameInputView:
            inputView.render(with: patternChecker.isValid(nickName: text))
        default:
            break
        }
        completeButton.isEnabled = patternChecker.isComplete
    }
    
    func textFieldDidBeginEditing(_ textField: UITextField) {
        activeView = textField
    }
    
    func textFieldDidEndEditing(_ textField: UITextField) {
        activeView = nil
    }
}

private extension SignUpViewController {
    func configureInputViews() {
        emailInputView.delegate = self
        passwordInputView.delegate = self
        passwordConfirmInputView.delegate = self
        nameInputView.delegate = self
    }
}
