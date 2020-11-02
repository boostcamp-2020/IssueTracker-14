//
//  MainCoordinator.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/02.
//

import UIKit

final class MainCoordinator: Coordinator {
    var navigationController: UINavigationController
    private let storyboard = UIStoryboard(name: "Main", bundle: nil)
    private let networkService: NetworkServiceProviding
    
    init(navigationController: UINavigationController, networkService: NetworkServiceProviding) {
        self.navigationController = navigationController
        self.networkService = networkService
    }
    
    func start() {
        let viewContoller = storyboard.instantiateViewController(
            identifier: LoginViewController.identifier,
            creator: { [unowned self] coder -> LoginViewController? in
                return LoginViewController(coder: coder, useCase: LoginUseCase(networkService: self.networkService))
            }
        )
        viewContoller.coordinator = self
        navigationController.pushViewController(viewContoller, animated: true)
    }
    
    func showSignUp() {
        let viewContoller = storyboard.instantiateViewController(
            identifier: SignUpViewController.identifier,
            creator: { [unowned self] coder -> SignUpViewController? in
                return SignUpViewController(coder: coder, useCase: SignUpUseCase(networkService: self.networkService))
            }
        )
        viewContoller.coordinator = self
        navigationController.pushViewController(viewContoller, animated: true)
    }
    
    func showIssueList() {
        let viewContoller = storyboard.instantiateViewController(
            identifier: IssueListViewController.identifier,
            creator: { coder -> IssueListViewController? in
                return IssueListViewController(coder: coder)
            }
        )
        navigationController.setViewControllers([viewContoller], animated: false)
    }
}
