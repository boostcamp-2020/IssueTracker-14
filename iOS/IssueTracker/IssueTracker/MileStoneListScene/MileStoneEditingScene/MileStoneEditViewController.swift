//
//  MileStoneEditViewController.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/12.
//

import UIKit

final class MileStoneEditViewController: DimmedViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        let editingView = MileStoneEditingView()
        editingView.delegate = self
        addContentView(editingView)
    }
}

extension MileStoneEditViewController: EditingViewDelegate {
    func closeButtonDidTouchUp(_ editingView: EditingView) {
        dismissWithAnimation()
    }
    
    func resetButtonDidTouchUp(_ editingView: EditingView) {
        
    }
    
    func saveButtonDidTouchUp(_ editingView: EditingView) {
        dismissWithAnimation()
    }
}
