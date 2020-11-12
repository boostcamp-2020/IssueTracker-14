//
//  NavigationCoordinator.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/02.
//

import UIKit

protocol NavigationCoordinator: class {
    var navigationController: UINavigationController? { get set }

    func start()
}
