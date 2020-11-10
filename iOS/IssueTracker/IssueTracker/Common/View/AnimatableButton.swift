//
//  AnimatableButton.swift
//  IssueTracker
//
//  Created by TTOzzi on 2020/11/10.
//

import UIKit

class AnimatableButton: UIButton {
    
    private let animator: UIViewPropertyAnimator = UIViewPropertyAnimator(duration: 0.15, curve: .easeInOut)
    private var isClicked: Bool = false

    override init(frame: CGRect) {
        super.init(frame: frame)
        configure()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        configure()
    }
    
    private func configure() {
        addTarget(self, action: #selector(animate(_:)), for: .touchUpInside)
        addTarget(self, action: #selector(animate(_:)), for: .touchDown)
        addTarget(self, action: #selector(animate(_:)), for: .touchUpOutside)
        titleLabel?.minimumScaleFactor = 0.1
        titleLabel?.adjustsFontSizeToFitWidth = true
    }
    
    private func scaleUp(_ sender: UIButton) {
        animator.addAnimations {
            sender.transform = .identity
        }
    }
    
    private func scaleDown(_ sender: UIButton) {
        animator.addAnimations {
            sender.transform = CGAffineTransform(scaleX: 0.94, y: 0.94)
        }
    }
    
    @objc private func animate(_ sender: UIButton) {
        isClicked.toggle()
        isClicked ? scaleDown(sender) : scaleUp(sender)
        animator.startAnimation()
    }
}
