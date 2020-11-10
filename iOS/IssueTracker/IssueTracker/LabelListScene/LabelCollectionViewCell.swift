//
//  LabelCollectionViewCell.swift
//  IssueTracker
//
//  Created by TTOzzi on 2020/11/10.
//

import UIKit

final class LabelCollectionViewCell: UICollectionViewListCell {
    
    static var identifier: String {
        return String(describing: Self.self)
    }
    @IBOutlet private weak var labelLabel: PaddingLabel!
    @IBOutlet private weak var descriptionLabel: UILabel!
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        configure()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        configure()
    }
    
    func update(with label: Label) {
        labelLabel.text = label.title
        descriptionLabel.text = label.description
    }
}

private extension LabelCollectionViewCell {
    func configure() {
        accessories = [.disclosureIndicator()]
    }
}
