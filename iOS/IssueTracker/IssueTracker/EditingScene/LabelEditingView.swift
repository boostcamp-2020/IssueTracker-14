//
//  LabelEditingView.swift
//  IssueTracker
//
//  Created by TTOzzi on 2020/11/11.
//

import UIKit

final class LabelEditingView: EditingView, XibLoadable {
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        configure()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        configure()
    }
}

private extension LabelEditingView {
    func configure() {
        guard let contentView = loadNib() else { return }
        addContentView(contentView)
    }
}
