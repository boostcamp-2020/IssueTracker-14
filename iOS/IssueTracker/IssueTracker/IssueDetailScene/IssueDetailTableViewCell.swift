//
//  IssueDetailTableViewCell.swift
//  IssueTracker
//
//  Created by TTOzzi on 2020/11/05.
//

import UIKit

final class IssueDetailTableViewCell: UITableViewCell {
    
    static var identifier: String {
        return String(describing: Self.self)
    }
    @IBOutlet private weak var writerLabel: UILabel!
    @IBOutlet private weak var creationDateLabel: UILabel!
    @IBOutlet private weak var contentLabel: UILabel!
    @IBOutlet private weak var emojiButton: UIButton!
    private let topBorder: CALayer = CALayer()
    private let bottomBorder: CALayer = CALayer()
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        addSublayers()
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        configure()
    }
    
    func update(isComment: Bool, comment: Comment) {
        contentLabel.numberOfLines = isComment ? 2 : 0
        writerLabel.text = comment.writer
        creationDateLabel.text = comment.createdAt
        contentLabel.text = comment.content
    }
}

private extension IssueDetailTableViewCell {
    func addSublayers() {
        topBorder.backgroundColor = UIColor.opaqueSeparator.cgColor
        contentView.layer.addSublayer(topBorder)
        bottomBorder.backgroundColor = UIColor.opaqueSeparator.cgColor
        contentView.layer.addSublayer(bottomBorder)
    }
    
    func configure() {
        let height = CGFloat(1)
        topBorder.frame = CGRect(x: contentView.frame.minX,
                                 y: contentView.frame.minY,
                                 width: contentView.frame.width,
                                 height: height)
        bottomBorder.frame = CGRect(x: contentView.frame.minX,
                                    y: contentView.frame.maxY - height,
                                    width: contentView.frame.width,
                                    height: height)
        emojiButton.layer.cornerRadius = emojiButton.frame.height / 2
    }
}
