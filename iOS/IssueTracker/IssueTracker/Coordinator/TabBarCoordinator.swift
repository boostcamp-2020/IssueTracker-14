//
//  TabBarCoordinator.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/02.
//

import UIKit

protocol TabBarCoordinator: class {
    var tabBarController: UITabBarController? { get set }

    func start()
}
