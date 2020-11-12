//
//  MileStoneEditingView.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/12.
//

import UIKit

protocol MileStoneEditingViewDelegate: class {
    func titleChanged(_ mileStoneEditingView: MileStoneEditingView, value: String)
    func descriptionChanged(_ mileStoneEditingView: MileStoneEditingView, value: String)
    func duedateChanged(_ mileStoneEditingView: MileStoneEditingView, value: String)
}

final class MileStoneEditingView: EditingView, XibLoadable {
    
    @IBOutlet weak var titleTextField: UITextField!
    @IBOutlet weak var descriptionTextField: UITextField!
    @IBOutlet weak var duedateTextField: UITextField!
    
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

extension MileStoneEditingView {
    func update(with mileStone: MileStone) {
        titleTextField.text = mileStone.title
        descriptionTextField.text = mileStone.description
        duedateTextField.text = mileStone.duedate?.customDateFormat(format: "yyyy-MM-dd")
    }
}
