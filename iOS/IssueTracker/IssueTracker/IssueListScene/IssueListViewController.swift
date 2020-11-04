//
//  IssueListViewController.swift
//  IssueTracker
//
//  Created by TTOzzi on 2020/11/02.
//

import UIKit

final class IssueListViewController: UIViewController {
    
    static var identifier: String {
        return String(describing: Self.self)
    }
    weak var coordinator: IssueCoordinator?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        navigationItem.leftBarButtonItem = UIBarButtonItem(title: "Filter", style: .plain, target: nil, action: nil)
        navigationItem.rightBarButtonItem = UIBarButtonItem(title: "Edit", style: .plain, target: nil, action: nil)
        navigationItem.searchController = UISearchController(searchResultsController: nil)
        navigationController?.navigationBar.prefersLargeTitles = true
        navigationController?.navigationBar.topItem?.title = "이슈"
    }
    
}
