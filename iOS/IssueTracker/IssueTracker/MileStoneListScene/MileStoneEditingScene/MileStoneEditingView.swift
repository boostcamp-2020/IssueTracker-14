//
//  MileStoneEditingView.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/12.
//

import UIKit

final class MileStoneEditingView: EditingView, XibLoadable {
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        configure()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        configure()
    }
}

private extension MileStoneEditingView {
    func configure() {
        guard let contentView = loadNib() else { return }
        addContentView(contentView)
    }
}
