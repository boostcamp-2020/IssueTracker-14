//
//  MileStoneCoordinator.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/04.
//

import UIKit

final class MileStoneCoordinator: NavigationCoordinator {
    
    weak var parentCoordinator: HomeTabBarCoordinator?
    weak var navigationController: UINavigationController?
    private let storyboard = UIStoryboard(name: "Main", bundle: nil)
    private let networkService: NetworkServiceProviding
    
    init(navigationController: UINavigationController, networkService: NetworkServiceProviding) {
        self.navigationController = navigationController
        self.networkService = networkService
        
    }
    
    func start() {
        let viewContoller = storyboard.instantiateViewController(
            identifier: MileStoneListViewController.identifier) as MileStoneListViewController
        viewContoller.coordinator = self
        navigationController?.pushViewController(viewContoller, animated: true)
    }
}

extension MileStoneCoordinator {
    func showEdit() {
        let editingViewController = EditingViewController()
        editingViewController.modalPresentationStyle = .overFullScreen
        navigationController?.present(editingViewController, animated: true)
    }
}
