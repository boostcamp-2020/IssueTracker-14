//
//  IssueInfoView.swift
//  IssueTracker
//
//  Created by TTOzzi on 2020/11/06.
//

import UIKit

final class IssueInfoView: UIView {
    
    @IBOutlet private weak var statusView: UIView!
    
    override func layoutSubviews() {
        super.layoutSubviews()
        configure()
    }
}

private extension IssueInfoView {
    func configure() {
        statusView.layer.cornerRadius = 6
        let height = CGFloat(1)
        let bottomBorder = CALayer()
        bottomBorder.backgroundColor = UIColor.opaqueSeparator.cgColor
        bottomBorder.frame = CGRect(x: frame.minX,
                                    y: frame.maxY - height,
                                    width: frame.width,
                                    height: height)
        layer.addSublayer(bottomBorder)
    }
}
