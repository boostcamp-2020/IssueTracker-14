//
//  EditingViewController.swift
//  IssueTracker
//
//  Created by TTOzzi on 2020/11/10.
//

import UIKit

class EditingViewController: UIViewController {
    
    private let backgroundView: UIView = UIView()
    private let editingView: EditingView = EditingView()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        editingView.delegate = self
        configure()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        UIViewPropertyAnimator(duration: 0.25, curve: .linear) { [weak self] in
            self?.backgroundView.alpha = 0.3
        }.startAnimation()
    }
}

extension EditingViewController: EditingViewDelegate {
    func closeButtonDidTouchUp(_ editingView: EditingView) {
        dismissWithAnimation()
    }
    
    func resetButtonDidTouchUp(_ editingView: EditingView) {
        
    }
    
    func saveButtonDidTouchUp(_ editingView: EditingView) {
        dismissWithAnimation()
    }
}

private extension EditingViewController {
    func configure() {
        configureBackgroundView()
        configureEditingView()
    }
    
    func configureBackgroundView() {
        backgroundView.backgroundColor = .black
        backgroundView.alpha = 0
        backgroundView.frame = view.frame
        let tapGesture = UITapGestureRecognizer(target: self, action: #selector(dismissWithAnimation))
        backgroundView.addGestureRecognizer(tapGesture)
        view.insertSubview(backgroundView, at: 0)
    }
    
    func configureEditingView() {
        editingView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(editingView)
        NSLayoutConstraint.activate([
            editingView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            editingView.centerYAnchor.constraint(equalTo: view.centerYAnchor),
            editingView.heightAnchor.constraint(equalTo: view.heightAnchor, multiplier: 0.5),
            editingView.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.9)
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
