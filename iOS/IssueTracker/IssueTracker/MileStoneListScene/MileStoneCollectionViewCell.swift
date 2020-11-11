//
//  MileStoneCollectionViewCell.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/11.
//

import UIKit

final class MileStoneCollectionViewCell: UICollectionViewCell {
    static var identifier: String {
        return String(describing: Self.self)
    }
    @IBOutlet private weak var mileStoneLabel: PaddingLabel!
    @IBOutlet private weak var descriptionLabel: UILabel!
    @IBOutlet private weak var dueDateLabel: UILabel!
     
    func update(with mileStone: MileStone) {
        mileStoneLabel.text = mileStone.title
        descriptionLabel.text = mileStone.description
        dueDateLabel.text = mileStone.duedate?.customDateFormat()
    }
}
