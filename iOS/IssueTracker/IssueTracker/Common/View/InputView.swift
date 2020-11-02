//
//  InputView.swift
//  IssueTracker
//
//  Created by TTOzzi on 2020/10/28.
//

import UIKit

final class InputView: UIView {
    
    private let label: UILabel = UILabel()
    let textField: UITextField = UITextField()
    @IBInspectable var title: String? {
        get { label.text }
        set { label.text = newValue }
    }
    @IBInspectable var isSecureTextEntry: Bool {
        get { textField.isSecureTextEntry }
        set { textField.isSecureTextEntry = newValue }
    }
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        configure()
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        configure()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        configure()
    }
}

private extension InputView {
    func configure() {
        configureLabel()
        configureTextField()
        translatesAutoresizingMaskIntoConstraints = false
        layer.cornerRadius = 10
        backgroundColor = .systemBackground
    }
    
    func configureLabel() {
        label.translatesAutoresizingMaskIntoConstraints = false
        label.font = .systemFont(ofSize: 17)
        label.adjustsFontSizeToFitWidth = true
        label.minimumScaleFactor = 0.5
        label.textAlignment = .right
        addSubview(label)
        NSLayoutConstraint.activate([
            label.heightAnchor.constraint(equalToConstant: 20),
            label.widthAnchor.constraint(equalTo: widthAnchor, multiplier: 0.25),
            label.topAnchor.constraint(equalTo: topAnchor, constant: 12),
            label.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -12),
            label.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 8),
            label.centerYAnchor.constraint(equalTo: centerYAnchor)
        ])
    }
    
    func configureTextField() {
        textField.translatesAutoresizingMaskIntoConstraints = false
        textField.textContentType = .oneTimeCode
        textField.layer.borderColor = UIColor.systemBlue.cgColor
        addSubview(textField)
        NSLayoutConstraint.activate([
            textField.leadingAnchor.constraint(equalTo: label.trailingAnchor, constant: 8),
            textField.topAnchor.constraint(equalTo: topAnchor, constant: 12),
            textField.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -12),
            textField.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -8)
        ])
    }
}
