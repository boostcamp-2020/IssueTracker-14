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
    func editingDidChanged(_ labelEditingView: MileStoneEditingView, isEditing: Bool)
}

final class MileStoneEditingView: EditingView, XibLoadable {
    
    @IBOutlet private weak var titleTextField: UITextField!
    @IBOutlet private weak var descriptionTextField: UITextField!
    @IBOutlet private weak var duedateTextField: UITextField!
    @IBOutlet private weak var errorLabel: UILabel!
    weak var mileStoneEditingDelegate: MileStoneEditingViewDelegate?
    
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
        saveButton.isEnabled = false
        guard let contentView = loadNib() else { return }
        addContentView(contentView)
    }
}

extension MileStoneEditingView: UITextFieldDelegate {
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        switch textField {
        case titleTextField:
            titleTextField.resignFirstResponder()
            duedateTextField.becomeFirstResponder()
        case duedateTextField:
            duedateTextField.resignFirstResponder()
            descriptionTextField.becomeFirstResponder()
        case descriptionTextField:
            descriptionTextField.resignFirstResponder()
        default:
            break
        }
        return true
    }
    
    func textFieldDidChangeSelection(_ textField: UITextField) {
        guard let value = textField.text else { return }
        switch textField {
        case titleTextField:
            mileStoneEditingDelegate?.titleChanged(self, value: value)
        case duedateTextField:
            mileStoneEditingDelegate?.duedateChanged(self, value: value)
        case descriptionTextField:
            mileStoneEditingDelegate?.descriptionChanged(self, value: value)
        default:
            break
        }
    }
    
    func textFieldDidBeginEditing(_ textField: UITextField) {
        mileStoneEditingDelegate?.editingDidChanged(self, isEditing: true)
    }
    
    func textFieldDidEndEditing(_ textField: UITextField) {
        mileStoneEditingDelegate?.editingDidChanged(self, isEditing: false)
    }
    
    // MARK: - 자동 하이픈 생성, 숫자만 입력, 입력 길이 10 제한
    func textField(_ textField: UITextField,
                   shouldChangeCharactersIn range: NSRange,
                   replacementString string: String) -> Bool {
        guard textField == duedateTextField else { return true }
        let characterSet = CharacterSet(charactersIn: string)
        if !CharacterSet.decimalDigits.isSuperset(of: characterSet) {
            return false
        }
        if let text = textField.text, let textRange = Range(range, in: text) {
            let updatedText = text.replacingCharacters(in: textRange, with: string)
            if autoHyphen(
                textField: textField, updatedText: updatedText, replacementString: string, index: 4)
                || autoHyphen(textField: textField, updatedText: updatedText, replacementString: string, index: 7) {
                return false
            }
        }
        guard let text = textField.text else { return false }
        let count = text.count - range.length + string.count
        return count <= 10
    }
    
    private func autoHyphen(textField: UITextField, updatedText: String,
                            replacementString string: String, index: Int) -> Bool {
        guard let text = textField.text else { return true }
        if text.count == index && updatedText.count == index + 1 {
            textField.text = text + "-" + string
            return true
        }
        if text.count == index + 1 && updatedText.count == index {
            let text = text
            textField.text = String(text.prefix(index - 1))
            return true
        }
        return false
    }
}

extension MileStoneEditingView {
    func update(with mileStone: MileStone) {
        titleTextField.text = mileStone.title
        descriptionTextField.text = mileStone.description
        duedateTextField.text = mileStone.duedate
    }
    
    func update(error: String?) {
        errorLabel.text = error
        errorLabel.isHidden = error == nil
    }
}
