//
//  MainCoordinator.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/02.
//

import UIKit

final class MainCoordinator: NavigationCoordinator {
    var navigationController: UINavigationController?
    private let storyboard = UIStoryboard(name: "Main", bundle: nil)
    private let networkService: NetworkServiceProviding
    private var chlidCoordinator: HomeTabBarCoordinator
    
    init(navigationController: UINavigationController, networkService: NetworkServiceProviding) {
        self.navigationController = navigationController
        self.networkService = networkService
        let homeController = HomeTabBarController()
        chlidCoordinator  = HomeTabBarCoordinator(tabBarController: homeController, networkService: networkService)
    }
    
    func start() {
        let viewContoller = storyboard.instantiateViewController(
            identifier: LoginViewController.identifier,
            creator: { [unowned self] coder -> LoginViewController? in
                return LoginViewController(coder: coder, useCase: LoginUseCase(networkService: self.networkService))
            }
        )
        viewContoller.coordinator = self
        navigationController?.pushViewController(viewContoller, animated: true)
    }
}

extension MainCoordinator {
    func showSignUp() {
        let viewContoller = storyboard.instantiateViewController(
            identifier: SignUpViewController.identifier,
            creator: { [unowned self] coder -> SignUpViewController? in
                return SignUpViewController(coder: coder, useCase: SignUpUseCase(networkService: self.networkService))
            }
        )
        viewContoller.coordinator = self
        navigationController?.pushViewController(viewContoller, animated: true)
    }
    
    func showIssueList() {
        navigationController?.setViewControllers([chlidCoordinator.tabBarController!], animated: false)
        chlidCoordinator.start()
        chlidCoordinator.parentCoordinator = self
    }
}
