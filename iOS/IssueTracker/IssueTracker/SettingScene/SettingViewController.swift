//
//  SettingViewController.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/04.
//

import UIKit

final class SettingViewController: UIViewController {
    
    static var identifier: String {
        return String(describing: Self.self)
    }
    weak var coordinator: NavigationCoordinator?
    
    override func viewDidLoad() {
        super.viewDidLoad()

        navigationController?.navigationBar.prefersLargeTitles = true
        navigationController?.navigationBar.topItem?.title = "설정"
    }
}
