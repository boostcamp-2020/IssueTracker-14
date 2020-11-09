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
                let useCase = IssueListUseCase(networkService: self.networkService)
                return IssueListViewController(coder: coder, useCase: useCase)
            })
        viewController.coordinator = self
        navigationController?.pushViewController(viewController, animated: true)
    }
}

extension IssueCoordinator {
    func showDetail(of issue: IssueDetail) {
        let pullUpViewController: IssueDetailPullUpViewController =
            storyboard.instantiateViewController(identifier: IssueDetailPullUpViewController.identifier)
        let viewController = storyboard.instantiateViewController(
            identifier: IssueDetailViewController.identifier,
            creator: { coder -> IssueDetailViewController? in
                return IssueDetailViewController(coder: coder,
                                                 issue: issue,
                                                 pullUpViewController: pullUpViewController)
            })
        viewController.coordinator = self
        navigationController?.pushViewController(viewController, animated: true)
    }
    
    func showCreateIssue() {
        let createIssueViewController = storyboard
            .instantiateViewController(identifier: IssueCreateViewController.identifier)
        navigationController?.present(createIssueViewController, animated: true)
    }
}
