//
//  IssueDetailPullUpViewController.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/05.
//

import UIKit

protocol IssueDetailPullUpViewControllerDelegate: class {
    func scrollUpButtonDidTouchUp(_ issueDetailPullUpViewController: IssueDetailPullUpViewController)
    func scrollDownButtonDidTouchUp(_ issueDetailPullUpViewController: IssueDetailPullUpViewController)
}

final class IssueDetailPullUpViewController: UIViewController {

    @IBOutlet private weak var scrollUpButton: UIButton!
    @IBOutlet private weak var scrollDownButton: UIButton!
    static var identifier: String {
        return String(describing: Self.self)
    }
    weak var delegate: IssueDetailPullUpViewControllerDelegate?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        configure()
    }
    
    @IBAction func scrollUpButtonDidTouchUp(_ sender: UIButton) {
        delegate?.scrollUpButtonDidTouchUp(self)
    }
    
    @IBAction func scrollDownButtonDidTouchUp(_ sender: UIButton) {
        delegate?.scrollDownButtonDidTouchUp(self)
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
