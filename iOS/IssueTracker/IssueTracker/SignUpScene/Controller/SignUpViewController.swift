//
//  SignUpViewController.swift
//  IssueTracker
//
//  Created by TTOzzi on 2020/10/28.
//

import UIKit

final class SignUpViewController: UIViewController {
    
    @IBOutlet private weak var emailInputView: InputView!
    @IBOutlet private weak var passwordInputView: InputView!
    @IBOutlet private weak var passwordConfirmInputView: InputView!
    @IBOutlet private weak var nameInputView: InputView!
    @IBOutlet private weak var completeButton: UIButton!
    private let patternChecker: PatternChecker = PatternChecker()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        configureInputViews()
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
}

private extension SignUpViewController {
    func configureInputViews() {
        emailInputView.delegate = self
        passwordInputView.delegate = self
        passwordConfirmInputView.delegate = self
        nameInputView.delegate = self
    }
}
