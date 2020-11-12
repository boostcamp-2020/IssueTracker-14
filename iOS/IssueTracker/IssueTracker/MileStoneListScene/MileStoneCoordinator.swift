//
//  MileStoneCoordinator.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/04.
//

import UIKit

final class MileStoneCoordinator: NavigationCoordinator {
    
    weak var parentCoordinator: HomeTabBarCoordinator?
    weak var navigationController: UINavigationController?
    private let storyboard = UIStoryboard(name: "Main", bundle: nil)
    private let networkService: NetworkServiceProviding
    
    init(navigationController: UINavigationController, networkService: NetworkServiceProviding) {
        self.navigationController = navigationController
        self.networkService = networkService
        
    }
    
    func start() {
        let viewContoller = storyboard.instantiateViewController(
            identifier: MileStoneListViewController.identifier,
         creator: {[unowned self] coder -> MileStoneListViewController? in
            let useCase = MileStoneListUseCase(networkService: self.networkService)
            return MileStoneListViewController(coder: coder, useCase: useCase) }
            )
        viewContoller.coordinator = self
        navigationController?.pushViewController(viewContoller, animated: true)
    }
}

extension MileStoneCoordinator {
    func showEdit(mileStone: MileStone, _ delegate: MileStoneEditViewControllerDelegate) {
        let viewController = MileStoneEditViewController(
            useCase: MileStoneEditUseCase(networkService: networkService),
            mileStone: mileStone
        )
        viewController.modalPresentationStyle = .overFullScreen
        viewController.delegate = delegate
        navigationController?.present(viewController, animated: true)
    }
    
    func showCreate(mileStone: MileStone, _ delegate: MileStoneEditViewControllerDelegate) {
        let viewController = MileStoneEditViewController(
            useCase: MileStoneCreateUseCase(networkService: networkService),
            mileStone: mileStone
        )
        viewController.modalPresentationStyle = .overFullScreen
        viewController.delegate = delegate
        navigationController?.present(viewController, animated: true)
    }
}
