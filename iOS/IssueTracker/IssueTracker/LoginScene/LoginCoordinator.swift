//
//  LoginCoordinator.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/02.
//

import UIKit

final class LoginCoordinator: NavigationCoordinator {
    var navigationController: UINavigationController?
    private let storyboard = UIStoryboard(name: "Main", bundle: nil)
    private var networkService: NetworkServiceProviding
    private var childCoordinator: HomeTabBarCoordinator?
    
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
        navigationController?.pushViewController(viewContoller, animated: true)
    }
}

extension LoginCoordinator {
    func showGithubLogin(delegate: GithubLoginViewControllerDelegate) {
        let viewContoller = storyboard.instantiateViewController(
            identifier: GithubLoginViewController.identifier
        ) as GithubLoginViewController
        viewContoller.coordinator = self
        viewContoller.delegate = delegate
        navigationController?.present(viewContoller, animated: true)
    }
    
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
    
    func showIssueList(userToken: String?) {
        let homeController = HomeTabBarController()
        networkService.userToken = userToken
        childCoordinator  = HomeTabBarCoordinator(tabBarController: homeController, networkService: networkService)
        guard let childCoordinator = childCoordinator else { return }
        navigationController?.setViewControllers([childCoordinator.tabBarController], animated: false)
        childCoordinator.start()
        childCoordinator.parentCoordinator = self
    }
}
