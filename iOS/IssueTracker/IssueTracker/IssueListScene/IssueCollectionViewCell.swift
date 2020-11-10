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
    @IBOutlet private weak var mileStoneLabel: PaddingLabel!
    @IBOutlet private weak var labelLabel: PaddingLabel!
    @IBOutlet private weak var selectButton: UIButton!
    override var isSelected: Bool {
        didSet {
            selectButton.isSelected = isSelected
        }
    }
    var isEditing: Bool = false {
        didSet {
            animate()
        }
    }
}

extension IssueCollectionViewCell {
    func update(with issue: Issue, isEditing: Bool) {
        titleLabel.text = issue.title
        descriptionLabel.text = issue.description
        mileStoneLabel.text = issue.mileStone?.title
        mileStoneLabel.isHidden = issue.mileStone == nil
        self.isEditing = isEditing
    }
}

private extension IssueCollectionViewCell {
    func animate() {
        let changedX: CGFloat = isEditing ? -50 : 0
        let animator = UIViewPropertyAnimator(duration: 0.3,
                                              curve: .easeInOut,
                                              animations: {
                                                [weak self] in
                                                guard let self = self else { return }
                                                self.layer.bounds = CGRect(x: changedX,
                                                                           y: self.bounds.minY,
                                                                           width: self.bounds.width,
                                                                           height: self.bounds.height)
                                              })
        animator.startAnimation()
    }
}
