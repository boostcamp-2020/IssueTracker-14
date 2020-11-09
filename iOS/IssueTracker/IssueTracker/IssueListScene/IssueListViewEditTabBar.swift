//
//  IssueListViewEditTabBar.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/09.
//

import UIKit

final class IssueListViewEditTabBar: UIView {
    
    let closeButton: UIButton =  UIButton()
    weak var issueListViewEditTabBardelegate: IssueListViewEditTabBarDelegate?
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        configure()
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        NSLayoutConstraint.activate([closeButton.topAnchor.constraint(equalTo: self.topAnchor, constant: 10),
                                     closeButton.trailingAnchor.constraint(equalTo: self.trailingAnchor, constant: -8)])
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}

extension IssueListViewEditTabBar {
    func configure() {
        self.backgroundColor = .systemGray6
        closeButton.setTitle("선택 이슈 닫기", for: .normal)
        closeButton.titleLabel?.font = UIFont.systemFont(ofSize: 17)
        closeButton.titleLabel?.sizeToFit()
        closeButton.frame = CGRect(origin: .zero, size: closeButton.titleLabel!.frame.size)
        closeButton.setTitleColor(.systemBlue, for: .normal)
        closeButton.setTitleColor(closeButton.currentTitleColor.withAlphaComponent(0.3), for: .highlighted)
        closeButton.isUserInteractionEnabled
            = true
        addSubview(closeButton)
        closeButton.translatesAutoresizingMaskIntoConstraints = false
        closeButton.addTarget(self, action: #selector(closeButtonDidTouchUp), for: .touchUpInside)
    }
    
    @objc func closeButtonDidTouchUp() {
        issueListViewEditTabBardelegate?.closeButtonDidTouchUp(self)
    }
}

protocol IssueListViewEditTabBarDelegate: class {
    func closeButtonDidTouchUp(_ issueListViewEditTabBarDelegate: IssueListViewEditTabBar)
}
