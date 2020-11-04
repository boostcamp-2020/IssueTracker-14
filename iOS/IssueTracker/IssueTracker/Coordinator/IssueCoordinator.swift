//
//  IssueCoordinator.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/03.
//

import UIKit

final class IssueCoordinator: NavigationCoordinator {
    
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
            identifier: IssueListViewController.identifier,
            creator: { [unowned self] coder -> IssueListViewController? in
                let useCase = IssueListUseCase(networkService: networkService)
                return IssueListViewController(coder: coder, useCase: useCase)
            })
        viewController.coordinator = self      
        navigationController?.pushViewController(viewController, animated: true)
    }
}
