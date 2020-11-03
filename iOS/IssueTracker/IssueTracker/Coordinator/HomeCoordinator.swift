//
//  HomeCoordinator.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/03.
//

import UIKit

final class HomeTabBarCoordinator: TabBarCoordinator {
    var tabBarController: UITabBarController
    private let networkService: NetworkServiceProviding
    private var issueCoordinator: IssueCoordinator
    private var labelCoordinator: LabelCoordinator
    
    init(tabBarController: UITabBarController, networkService: NetworkServiceProviding) {
        self.tabBarController = tabBarController
        self.networkService = networkService
        let IssueNavigationController = UINavigationController()
        issueCoordinator  = IssueCoordinator(navigationController: IssueNavigationController,
                                             networkService: networkService)
        let LabelNavigationController = UINavigationController()
        labelCoordinator  = LabelCoordinator(navigationController: LabelNavigationController,
                                             networkService: networkService)
    }
    
    func start() {
        tabBarController.viewControllers = [issueCoordinator.navigationController,
                                            labelCoordinator.navigationController]
        let image = UIImage(systemName: "1.circle.fill")
        let icon  = UITabBarItem(title: "이슈", image: image, selectedImage: nil)
        issueCoordinator.navigationController.tabBarItem = icon
        issueCoordinator.start()
        labelCoordinator.start()
    }
}
