//
//  LabelEditingView.swift
//  IssueTracker
//
//  Created by TTOzzi on 2020/11/11.
//

import UIKit

protocol LabelEditingViewDelegate: class {
    func titleChanged(_ labelEditingView: LabelEditingView, value: String)
    func descriptionChanged(_ labelEditingView: LabelEditingView, value: String)
    func colorChanged(_ labelEditingView: LabelEditingView, value: String)
    func colorGenerated(_ labelEditingView: LabelEditingView)
}

final class LabelEditingView: EditingView, XibLoadable {
    
    @IBOutlet private weak var titleTextField: UITextField!
    @IBOutlet private weak var descriptionTextField: UITextField!
    @IBOutlet private weak var colorTextField: UITextField!
    @IBOutlet private weak var colorView: ShadowView!
    weak var labelEditingDelegate: LabelEditingViewDelegate?
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        configure()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        configure()
    }
    
    @IBAction private func generateColorButtonDidTouchUp(_ sender: UIButton) {
        labelEditingDelegate?.colorGenerated(self)
    }
}

extension LabelEditingView {
    func update(with label: Label) {
        titleTextField.text = label.title
        descriptionTextField.text = label.description
        colorTextField.text = label.color
        UIViewPropertyAnimator(duration: 0.25, curve: .easeInOut) { [weak self] in
            self?.colorView.backgroundColor = UIColor(from: label.color)
        }.startAnimation()
    }
}

extension LabelEditingView: UITextFieldDelegate {
    func textFieldDidChangeSelection(_ textField: UITextField) {
        guard let value = textField.text else { return }
        switch textField {
        case titleTextField:
            labelEditingDelegate?.titleChanged(self, value: value)
        case descriptionTextField:
            labelEditingDelegate?.descriptionChanged(self, value: value)
        case colorTextField:
            labelEditingDelegate?.colorChanged(self, value: value)
        default:
            break
        }
    }
}

private extension LabelEditingView {
    func configure() {
        guard let contentView = loadNib() else { return }
        addContentView(contentView)
    }
}
