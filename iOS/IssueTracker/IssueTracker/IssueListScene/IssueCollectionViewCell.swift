//
//  IssueCollectionViewCell.swift
//  IssueTracker
//
//  Created by TTOzzi on 2020/11/03.
//

import UIKit

final class IssueCollectionViewCell: UICollectionViewCell {
    
    static var identifier: String {
        return String(describing: Self.self)
    }
    @IBOutlet private weak var titleLabel: UILabel!
    @IBOutlet private weak var descriptionLabel: UILabel!
    
    func update(with issue: Issue) {
        titleLabel.text = issue.title
        descriptionLabel.text = issue.description
    }
}
