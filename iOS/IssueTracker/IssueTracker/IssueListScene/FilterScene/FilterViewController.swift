//
//  FilterViewController.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/12.
//

import UIKit

class FilterViewController: UIViewController {

    static var identifier: String {
        return String(describing: Self.self)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
}
private extension FilterViewController {
    @IBAction func doneButtonDidTouchUp(_ sender: UIButton) {
        dismiss(animated: true)
    }
    
    @IBAction func cancelButtonDidTouchUp(_ sender: UIButton) {
        dismiss(animated: true)
    }
}
