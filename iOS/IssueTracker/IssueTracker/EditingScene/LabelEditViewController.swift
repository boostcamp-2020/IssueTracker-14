//
//  LabelEditViewController.swift
//  IssueTracker
//
//  Created by TTOzzi on 2020/11/11.
//

import UIKit

final class LabelEditViewController: DimmedViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        let editingView = LabelEditingView()
        editingView.delegate = self
        addContentView(editingView)
    }
}

extension LabelEditViewController: EditingViewDelegate {
    func closeButtonDidTouchUp(_ editingView: EditingView) {
        dismissWithAnimation()
    }
    
    func resetButtonDidTouchUp(_ editingView: EditingView) {
        
    }
    
    func saveButtonDidTouchUp(_ editingView: EditingView) {
        dismissWithAnimation()
    }
}
