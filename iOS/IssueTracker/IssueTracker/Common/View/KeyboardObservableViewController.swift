//
//  KeyboardObservableViewController.swift
//  IssueTracker
//
//  Created by TTOzzi on 2020/11/12.
//

import UIKit

class KeyboardObservableViewController: UIViewController {
    
    var activeView: UIView?
    
    override init(nibName nibNameOrNil: String?, bundle nibBundleOrNil: Bundle?) {
        super.init(nibName: nibNameOrNil, bundle: nibBundleOrNil)
        configureKeyboardObservers()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        configureKeyboardObservers()
    }
    
    func configureKeyboardObservers() {
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
              let activeView = activeView else { return }
        let keyboardHeight = keyboardFrame.cgRectValue.height
        let activeViewOrigin = activeView.frame.origin
        let activeViewHeight = activeView.convert(activeViewOrigin, to: view).y + activeView.frame.height
        let displayAreaHeight = view.frame.height - keyboardHeight
        UIViewPropertyAnimator(duration: 0.25, curve: .easeInOut) { [weak self] in
            self?.view.transform = activeViewHeight > displayAreaHeight ?
                CGAffineTransform(translationX: 0, y: -(activeViewHeight - displayAreaHeight)) : .identity
        }.startAnimation()
    }
    
    @objc func keyboardWillHide() {
        UIViewPropertyAnimator(duration: 0.25, curve: .easeInOut) { [weak self] in
            self?.view.transform = .identity
        }.startAnimation()
    }
}
