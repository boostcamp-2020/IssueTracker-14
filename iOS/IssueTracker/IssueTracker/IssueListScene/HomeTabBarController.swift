//
//  HomeController.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/03.
//

import UIKit

final class HomeTabBarController: UITabBarController, UITabBarControllerDelegate {
    
    weak var coordinator: HomeTabBarCoordinator?
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
}
