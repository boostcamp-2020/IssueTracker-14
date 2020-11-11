//
//  FilterTableViewHeaderFooterView.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/12.
//

import UIKit

class FilterTableViewHeaderFooterView: UITableViewHeaderFooterView {

    static var identifier: String {
        return String(describing: Self.self)
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        configure()
    }
}

private extension FilterTableViewHeaderFooterView {
    func configure() {
        textLabel?.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            textLabel!.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 20),
            textLabel!.bottomAnchor.constraint(equalTo: contentView.bottomAnchor, constant: -5)
        ])
        textLabel?.font = .systemFont(ofSize: 13)
        textLabel?.textColor = .darkGray
        contentView.backgroundColor = .systemGray6
    }
}
