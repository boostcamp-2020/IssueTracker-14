//
//  HomeCoordinator.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/03.
//

import UIKit

final class HomeTabBarCoordinator: TabBarCoordinator {
    
    var tabBarController: UITabBarController?
    weak var parentCoordinator: MainCoordinator?
    private let networkService: NetworkServiceProviding
    private var issueCoordinator: IssueCoordinator
    private var labelCoordinator: LabelCoordinator
    private var mileStoneCoordinator: MileStoneCoordinator
    private var settingCoordinator: SettingCoordinator
    
    init(tabBarController: UITabBarController, networkService: NetworkServiceProviding) {
        self.tabBarController = tabBarController
        self.networkService = networkService
        let issueNavigationController = UINavigationController()
        issueCoordinator  = IssueCoordinator(navigationController: issueNavigationController,
                                             networkService: networkService)
        let labelNavigationController = UINavigationController()
        labelCoordinator  = LabelCoordinator(navigationController: labelNavigationController,
                                             networkService: networkService)
        let mileStoneNavigationController = UINavigationController()
        mileStoneCoordinator  = MileStoneCoordinator(navigationController: mileStoneNavigationController,
                                                     networkService: networkService)
        let settingNavigationController = UINavigationController()
        settingCoordinator  = SettingCoordinator(navigationController: settingNavigationController,
                                                 networkService: networkService)
        tabBarController.viewControllers = [issueNavigationController,
                                            labelNavigationController,
                                            mileStoneNavigationController,
                                            settingNavigationController]
        configure()
    }
    
    func start() {
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

private extension HomeTabBarCoordinator {
    private func configure() {
        
        let image1 = UIImage(systemName: "1.circle.fill")
        let icon1  = UITabBarItem(title: "이슈", image: image1, selectedImage: nil)
        let image2 = UIImage(systemName: "2.circle.fill")
        let icon2 = UITabBarItem(title: "레이블", image: image2, selectedImage: nil)
        let image3 = UIImage(systemName: "3.circle.fill")
        let icon3 = UITabBarItem(title: "마일스톤", image: image3, selectedImage: nil)
        let image4 = UIImage(systemName: "4.circle.fill")
        let icon4 = UITabBarItem(title: "설정", image: image4, selectedImage: nil)
        
        issueCoordinator.navigationController?.tabBarItem = icon1
        labelCoordinator.navigationController?.tabBarItem = icon2
        mileStoneCoordinator.navigationController?.tabBarItem = icon3
        settingCoordinator.navigationController?.tabBarItem = icon4
    }
}
