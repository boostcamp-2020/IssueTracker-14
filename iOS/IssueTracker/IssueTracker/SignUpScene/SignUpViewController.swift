//
//  SignUpViewController.swift
//  IssueTracker
//
//  Created by TTOzzi on 2020/10/28.
//

import UIKit

final class SignUpViewController: UIViewController {
    
    static var identifier: String {
        return String(describing: Self.self)
    }
    @IBOutlet private weak var emailInputView: InputView!
    @IBOutlet private weak var passwordInputView: InputView!
    @IBOutlet private weak var passwordConfirmInputView: InputView!
    @IBOutlet private weak var nameInputView: InputView!
    @IBOutlet private weak var completeButton: UIButton!
    private let patternChecker: PatternChecker = PatternChecker()
    private let signUpUseCase: SignUpUseCase
    private var activeTextField: UITextField?
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
        configureObservers()
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
        activeTextField = textField
    }
    
    func textFieldDidEndEditing(_ textField: UITextField) {
        activeTextField = nil
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

private extension SignUpViewController {
    func configureObservers() {
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(keyboardWillShow),
            name: UIResponder.keyboardWillShowNotification,
            object: nil
        )
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(keyboardWillHide),
            name: UIResponder.keyboardWillHideNotification,
            object: nil
        )
    }
    
    @objc func keyboardWillShow(_ notification: NSNotification) {
        guard let keyboardFrame = notification.userInfo?[UIResponder.keyboardFrameEndUserInfoKey] as? NSValue,
              let textField = activeTextField else { return }
        let keyboardHeight = keyboardFrame.cgRectValue.height
        let textFieldOrigin = textField.frame.origin
        let textFieldHeight = textField.convert(textFieldOrigin, to: nil).y + textField.frame.height
        let displayAreaHeight = view.frame.height - keyboardHeight
        UIViewPropertyAnimator(duration: 0.25, curve: .easeInOut) { [weak self] in
            self?.view.transform = textFieldHeight > displayAreaHeight ?
                CGAffineTransform(translationX: 0, y: -(textFieldHeight - displayAreaHeight)) : .identity
        }.startAnimation()
    }
    
    @objc func keyboardWillHide() {
        UIViewPropertyAnimator(duration: 0.25, curve: .easeInOut) { [weak self] in
            self?.view.transform = .identity
        }.startAnimation()
    }
}
