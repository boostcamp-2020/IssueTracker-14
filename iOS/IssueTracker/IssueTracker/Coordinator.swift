//
//  Coordinator.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/02.
//

import UIKit

protocol navigationCoordinator {
    var navigationController: UINavigationController { get set }

    func start()
}
