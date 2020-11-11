//
//  DimmedViewController.swift
//  IssueTracker
//
//  Created by TTOzzi on 2020/11/10.
//

import UIKit

class DimmedViewController: UIViewController {
    
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
    
    @objc func dismissWithAnimation(completion: (() -> Void)? = nil) {
        let animator = UIViewPropertyAnimator(duration: 0.25, curve: .linear) { [weak self] in
            self?.backgroundView.alpha = 0
        }
        animator.addCompletion { [weak self] _ in
            self?.dismiss(animated: true, completion: completion)
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
