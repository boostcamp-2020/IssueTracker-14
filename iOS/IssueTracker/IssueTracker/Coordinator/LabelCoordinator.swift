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
        let viewController = storyboard.instantiateViewController(
            identifier: LabelListViewController.identifier,
            creator: {[unowned self] coder -> LabelListViewController? in
            let useCase = LabelListUseCase(networkService: self.networkService)
            return LabelListViewController(coder: coder, useCase: useCase) }
        )
        viewController.coordinator = self
        navigationController?.pushViewController(viewController, animated: true)
    }
}

extension LabelCoordinator {
    func showEdit() {
        let viewController = LabelEditViewController()
        viewController.modalPresentationStyle = .overFullScreen
        navigationController?.present(viewController, animated: true)
    }
}
