//
//  SceneDelegate.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/10/27.
//

import UIKit

class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    
    var coordinator: MainCoordinator?
    var window: UIWindow?
    
    func scene(_ scene: UIScene, willConnectTo session: UISceneSession,
               options connectionOptions: UIScene.ConnectionOptions) {
//        let navigationController = UINavigationController()
//        guard let windowScene = scene as? UIWindowScene else { return }
//        
//        window = UIWindow(windowScene: windowScene)
//        coordinator = MainCoordinator(navigationController: navigationController, networkService: NetworkService())
//        coordinator?.start()
//        window?.rootViewController = navigationController
//        window?.makeKeyAndVisible()
    }
}
