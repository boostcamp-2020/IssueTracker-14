//
//  LabelCoordinator.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/04.
//

import UIKit

final class LabelCoordinator: NavigationCoordinator {
    
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
            identifier: LabelListViewController.identifier) as LabelListViewController
        viewContoller.coordinator = self
        navigationController?.pushViewController(viewContoller, animated: true)
    }
}

extension LabelCoordinator {
    func showEdit() {
        let viewController = LabelEditViewController()
        viewController.modalPresentationStyle = .overFullScreen
        navigationController?.present(viewController, animated: true)
    }
}
