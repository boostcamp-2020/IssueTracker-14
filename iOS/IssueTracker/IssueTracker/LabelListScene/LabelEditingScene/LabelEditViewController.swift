//
//  LabelEditViewController.swift
//  IssueTracker
//
//  Created by TTOzzi on 2020/11/11.
//

import UIKit

protocol LabelEditViewControllerDelegate: class {
    func labelChanged(_ labelEditViewController: LabelEditViewController)
}

final class LabelEditViewController: DimmedViewController {
    
    private let editingView: LabelEditingView = LabelEditingView()
    private let useCase: LabelUseCaseType
    private var label: Label {
        didSet {
            editingView.saveButton.isEnabled = !label.title.isEmpty
            guard oldValue.color != label.color else { return }
            editingView.update(with: label)
        }
    }
    weak var delegate: LabelEditViewControllerDelegate?
    
    init(useCase: LabelUseCaseType, label: Label) {
        self.useCase = useCase
        self.label = label
        super.init(nibName: nil, bundle: nil)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init?(coder: NSCoder) is not supported.")
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        configureEditingView()
    }
}

extension LabelEditViewController: EditingViewDelegate {
    func closeButtonDidTouchUp(_ editingView: EditingView) {
        dismissWithAnimation()
    }
    
    func resetButtonDidTouchUp(_ editingView: EditingView) {
        label.reset()
    }
    
    func saveButtonDidTouchUp(_ editingView: EditingView) {
        useCase.save(label: label) { [weak self] error in
            guard let self = self else { return }
            DispatchQueue.main.async {
                guard let error = error else {
                    self.dismissWithAnimation()
                    self.delegate?.labelChanged(self)
                    return
                }
                self.alert(message: error.localizedDescription)
            }
        }
    }
}

extension LabelEditViewController: LabelEditingViewDelegate {
    func titleChanged(_ labelEditingView: LabelEditingView, value: String) {
        label.title = value
    }
    
    func descriptionChanged(_ labelEditingView: LabelEditingView, value: String) {
        label.description = value
    }
    
    func colorChanged(_ labelEditingView: LabelEditingView, value: String) {
        label.color = value
    }
    
    func colorGenerated(_ labelEditingView: LabelEditingView) {
        guard let color = RandomHexColorGenerator.generate(exceptFor: label.color) else { return }
        label.color = color
    }
    
    func editingDidChanged(_ labelEditingView: LabelEditingView, isEditing: Bool) {
        activeView = isEditing ? editingView : nil
    }
}

private extension LabelEditViewController {
    func configureEditingView() {
        editingView.delegate = self
        editingView.labelEditingDelegate = self
        addContentView(editingView)
        editingView.update(with: label)
    }
}
