//
//  HomeCoordinator.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/03.
//

import UIKit

final class HomeTabBarCoordinator: TabBarCoordinator {
    
    var tabBarController: UITabBarController
    weak var parentCoordinator: MainCoordinator?
    private let networkService: NetworkServiceProviding
    private var chlidCoordinators: [NavigationCoordinator] = []
    
    init(tabBarController: UITabBarController, networkService: NetworkServiceProviding) {
        self.tabBarController = tabBarController
        self.networkService = networkService
    }
    
    func start() {
        let issueNavigationController = UINavigationController()
        let labelNavigationController = UINavigationController()
        let mileStoneNavigationController = UINavigationController()
        let settingNavigationController = UINavigationController()
        
        let issueCoordinator = IssueCoordinator(navigationController: issueNavigationController,
                                                 networkService: networkService)
        let labelCoordinator = LabelCoordinator(navigationController: labelNavigationController,
                                                 networkService: networkService)
        let mileStoneCoordinator = MileStoneCoordinator(navigationController: mileStoneNavigationController,
                                                         networkService: networkService)
        let settingCoordinator = SettingCoordinator(navigationController: settingNavigationController,
                                                     networkService: networkService)
        
        let iconIssue = UITabBarItem(title: "이슈", image: UIImage(systemName: "1.circle.fill"), selectedImage: nil)
        let iconLabel = UITabBarItem(title: "레이블", image: UIImage(systemName: "2.circle.fill"), selectedImage: nil)
        let iconMileStone = UITabBarItem(title: "마일스톤", image: UIImage(systemName: "3.circle.fill"), selectedImage: nil)
        let iconSetting = UITabBarItem(title: "설정", image: UIImage(systemName: "4.circle.fill"), selectedImage: nil)
                                    
        issueCoordinator.navigationController?.tabBarItem = iconIssue
        labelCoordinator.navigationController?.tabBarItem = iconLabel
        mileStoneCoordinator.navigationController?.tabBarItem = iconMileStone
        settingCoordinator.navigationController?.tabBarItem = iconSetting
        
        chlidCoordinators = [issueCoordinator,
                             labelCoordinator,
                             mileStoneCoordinator,
                             settingCoordinator]
        
        tabBarController.viewControllers = [issueNavigationController,
                                            labelNavigationController,
                                            mileStoneNavigationController,
                                            settingNavigationController]
        
        issueCoordinator.parentCoordinator = self
        labelCoordinator.parentCoordinator = self
        mileStoneCoordinator.parentCoordinator = self
        settingCoordinator.parentCoordinator = self
        
        issueCoordinator.start()
        labelCoordinator.start()
        mileStoneCoordinator.start()
        settingCoordinator.start()
    }
}
