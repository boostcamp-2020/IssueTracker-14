//
//  LabelListController.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/04.
//

import UIKit

final class LabelListViewController: UIViewController {
    
    static var identifier: String {
        return String(describing: Self.self)
    }
    weak var coordinator: LabelCoordinator?
    
    override func viewDidLoad() {
        super.viewDidLoad()

        navigationItem.rightBarButtonItem = UIBarButtonItem(systemItem: .add)
        navigationController?.navigationBar.prefersLargeTitles = true
        navigationController?.navigationBar.topItem?.title = "레이블"
    }
}
