//
//  IssueCreateViewController.swift
//  IssueTracker
//
//  Created by TTOzzi on 2020/11/09.
//

import UIKit

final class IssueCreateViewController: UIViewController {
    
    static var identifier: String {
        return String(describing: Self.self)
    }
    
    @IBOutlet private weak var contentStackView: UIStackView!
    @IBOutlet private weak var topBarView: UIView!
    @IBOutlet private weak var titleLabel: UILabel!
    @IBOutlet private weak var titleTextField: UITextField!
    
    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        configure()
    }
    
    @IBAction private func cancelButtonDidTouchUp(_ sender: UIButton) {
        dismiss(animated: true)
    }
}

private extension IssueCreateViewController {
    func configure() {
        let border = CAShapeLayer()
        let borderWidth = CGFloat(1)
        border.backgroundColor = UIColor.opaqueSeparator.cgColor
        border.frame = CGRect(x: 0,
                              y: topBarView.frame.maxY - borderWidth,
                              width: topBarView.frame.width,
                              height: borderWidth)
        topBarView.layer.addSublayer(border)
        contentStackView.setCustomSpacing(12, after: titleTextField)
    }
}
