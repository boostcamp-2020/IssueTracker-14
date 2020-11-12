//
//  EditingView.swift
//  IssueTracker
//
//  Created by TTOzzi on 2020/11/10.
//

import UIKit

protocol EditingViewDelegate: class {
    func closeButtonDidTouchUp(_ editingView: EditingView)
    func resetButtonDidTouchUp(_ editingView: EditingView)
    func saveButtonDidTouchUp(_ editingView: EditingView)
}

class EditingView: UIView {
    
    private let closeButton: AnimatableButton = {
        let button = AnimatableButton()
        let image = UIImage(systemName: "xmark",
                            withConfiguration: UIImage.SymbolConfiguration(pointSize: 18, weight: .semibold))
        button.translatesAutoresizingMaskIntoConstraints = false
        button.setImage(image, for: .normal)
        button.tintColor = .black
        button.addTarget(self, action: #selector(closeButtonDidTouchUp), for: .touchUpInside)
        return button
    }()
    private let borderView: UIView = {
        let view = UIView()
        view.translatesAutoresizingMaskIntoConstraints = false
        view.backgroundColor = .opaqueSeparator
        return view
    }()
    private let resetButton: UIButton = {
        let button = UIButton()
        button.translatesAutoresizingMaskIntoConstraints = false
        button.setTitle("초기화", for: .normal)
        button.setTitleColor(.systemGray, for: .normal)
        button.setTitleColor(button.currentTitleColor.withAlphaComponent(0.3), for: .highlighted)
        button.titleLabel?.font = .boldSystemFont(ofSize: 14)
        button.addTarget(self, action: #selector(resetButtonDidTouchUp), for: .touchUpInside)
        return button
    }()
    let saveButton: AnimatableButton = {
        let button = AnimatableButton()
        button.translatesAutoresizingMaskIntoConstraints = false
        button.setTitle("저장", for: .normal)
        button.setTitleColor(.systemBackground, for: .normal)
        button.backgroundColor = .label
        button.layer.cornerRadius = 10
        button.addTarget(self, action: #selector(saveButtonDidTouchUp), for: .touchUpInside)
        return button
    }()
    weak var delegate: EditingViewDelegate?
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        configure()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        configure()
    }
    
    func addContentView(_ contentView: UIView) {
        contentView.translatesAutoresizingMaskIntoConstraints = false
        addSubview(contentView)
        NSLayoutConstraint.activate([
            contentView.topAnchor.constraint(equalTo: borderView.bottomAnchor, constant: 8),
            contentView.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 24),
            contentView.bottomAnchor.constraint(equalTo: saveButton.topAnchor, constant: -36),
            contentView.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -24)
        ])
    }
    
    @objc private func closeButtonDidTouchUp() {
        delegate?.closeButtonDidTouchUp(self)
    }
    
    @objc private func resetButtonDidTouchUp() {
        delegate?.resetButtonDidTouchUp(self)
    }
    
    @objc private func saveButtonDidTouchUp() {
        delegate?.saveButtonDidTouchUp(self)
    }
}

private extension EditingView {
    func configure() {
        layer.cornerRadius = 10
        backgroundColor = .systemBackground
        configureCloseButton()
        configureBorderView()
        configureResetButton()
        configureSaveButton()
    }
    
    func configureCloseButton() {
        addSubview(closeButton)
        NSLayoutConstraint.activate([
            closeButton.topAnchor.constraint(equalTo: topAnchor, constant: 8),
            closeButton.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 16),
            closeButton.widthAnchor.constraint(equalToConstant: 44),
            closeButton.heightAnchor.constraint(equalToConstant: 44)
        ])
    }
    
    func configureBorderView() {
        addSubview(borderView)
        NSLayoutConstraint.activate([
            borderView.topAnchor.constraint(equalTo: closeButton.bottomAnchor, constant: 8),
            borderView.leadingAnchor.constraint(equalTo: leadingAnchor),
            borderView.trailingAnchor.constraint(equalTo: trailingAnchor),
            borderView.heightAnchor.constraint(equalToConstant: 1.5)
        ])
    }
    
    func configureResetButton() {
        addSubview(resetButton)
        NSLayoutConstraint.activate([
            resetButton.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 16),
            resetButton.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -8),
            resetButton.widthAnchor.constraint(equalToConstant: 60),
            resetButton.heightAnchor.constraint(equalToConstant: 44)
        ])
    }
    
    func configureSaveButton() {
        addSubview(saveButton)
        NSLayoutConstraint.activate([
            saveButton.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -16),
            saveButton.bottomAnchor.constraint(lessThanOrEqualTo: bottomAnchor, constant: -8),
            saveButton.centerYAnchor.constraint(equalTo: resetButton.centerYAnchor),
            saveButton.widthAnchor.constraint(equalToConstant: 72),
            saveButton.heightAnchor.constraint(equalToConstant: 44)
        ])
    }
}
