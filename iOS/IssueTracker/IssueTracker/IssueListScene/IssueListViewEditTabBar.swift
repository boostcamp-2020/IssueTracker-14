//
//  IssueListViewEditTabBar.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/09.
//

import UIKit

protocol IssueListViewEditTabBarDelegate: class {
    func closeButtonDidTouchUp(_ issueListViewEditTabBarDelegate: IssueListViewEditTabBar)
}

final class IssueListViewEditTabBar: UIView {
    
    private let closeButton: UIButton =  UIButton()
    weak var delegate: IssueListViewEditTabBarDelegate?
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        configure()
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        
        closeButton.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([closeButton.topAnchor.constraint(equalTo: self.topAnchor, constant: 10),
                                     closeButton.trailingAnchor.constraint(equalTo: self.trailingAnchor, constant: -8)])
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}

extension IssueListViewEditTabBar {
    func configure() {
        backgroundColor = .systemGray6
        closeButton.setTitle("선택 이슈 닫기", for: .normal)
        closeButton.titleLabel?.font = UIFont.systemFont(ofSize: 17)
        closeButton.setTitleColor(.systemBlue, for: .normal)
        closeButton.setTitleColor(closeButton.currentTitleColor.withAlphaComponent(0.3), for: .highlighted)
        addSubview(closeButton)
        closeButton.addTarget(self, action: #selector(closeButtonDidTouchUp), for: .touchUpInside)
    }
    
    @objc func closeButtonDidTouchUp() {
        delegate?.closeButtonDidTouchUp(self)
    }
}
