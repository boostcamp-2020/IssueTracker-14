//
//  IssueDetailPullUpViewController.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/05.
//

import UIKit

final class IssueDetailPullUpViewController: UIViewController {

    static var identifier: String {
        return String(describing: Self.self)
    }
    override func viewDidLoad() {
        super.viewDidLoad()
        configure()
    }
}

extension IssueDetailPullUpViewController {
    private func configure() {
        let baseFrame = UIScreen.main.bounds
        let centerX = baseFrame.width / 2
        let centerY = baseFrame.height / 2 * 2.5
        
        view.frame =
            CGRect(x: baseFrame.minX,
                   y: baseFrame.minY,
                   width: baseFrame.width,
                   height: baseFrame.height * 0.85)
        view.center = CGPoint(x: centerX, y: centerY)
        view.layer.cornerRadius = 15
        view.clipsToBounds = true
    }
}
