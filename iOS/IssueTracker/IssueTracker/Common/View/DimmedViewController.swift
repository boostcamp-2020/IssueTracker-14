//
//  DimmedViewController.swift
//  IssueTracker
//
//  Created by TTOzzi on 2020/11/10.
//

import UIKit

class DimmedViewController: KeyboardObservableViewController {
    
    private let backgroundView: UIView = UIView()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        configureBackgroundView()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        UIViewPropertyAnimator(duration: 0.25, curve: .linear) { [weak self] in
            self?.backgroundView.alpha = 0.3
        }.startAnimation()
    }
    
    override func keyboardWillShow(_ notification: NSNotification) {
        guard let keyboardFrame = notification.userInfo?[UIResponder.keyboardFrameEndUserInfoKey] as? NSValue,
              let activeView = activeView else { return }
        let keyboardHeight = keyboardFrame.cgRectValue.height
        let activeViewOrigin = activeView.frame.origin
        let activeViewHeight = activeViewOrigin.y + activeView.frame.height
        let displayAreaHeight = view.frame.height - keyboardHeight
        UIViewPropertyAnimator(duration: 0.25, curve: .easeInOut) { [weak self] in
            self?.view.transform = activeViewHeight > displayAreaHeight ?
                CGAffineTransform(translationX: 0, y: -(activeViewHeight - displayAreaHeight)) : .identity
        }.startAnimation()
    }
}

extension DimmedViewController {
    func addContentView(_ contentView: UIView) {
        contentView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(contentView)
        NSLayoutConstraint.activate([
            contentView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            contentView.centerYAnchor.constraint(equalTo: view.centerYAnchor),
            contentView.heightAnchor.constraint(greaterThanOrEqualTo: view.heightAnchor, multiplier: 0.4),
            contentView.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.85)
        ])
    }
    
    @objc func dismissWithAnimation() {
        let animator = UIViewPropertyAnimator(duration: 0.25, curve: .linear) { [weak self] in
            self?.backgroundView.alpha = 0
        }
        animator.addCompletion { [weak self] _ in
            self?.dismiss(animated: true)
        }
        animator.startAnimation()
    }
}

private extension DimmedViewController {
    func configureBackgroundView() {
        backgroundView.backgroundColor = .black
        backgroundView.alpha = 0
        backgroundView.frame = view.frame
        let tapGesture = UITapGestureRecognizer(target: self, action: #selector(dismissWithAnimation))
        backgroundView.addGestureRecognizer(tapGesture)
        view.insertSubview(backgroundView, at: 0)
    }
}
