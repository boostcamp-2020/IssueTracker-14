//
//  SettingViewController.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/04.
//

import UIKit

final class SettingViewController: UITableViewController {
    
    static var identifier: String {
        return String(describing: Self.self)
    }
    weak var coordinator: SettingCoordinator?

    override func viewDidLoad() {
        super.viewDidLoad()
        navigationController?.navigationBar.prefersLargeTitles = true
        navigationController?.navigationBar.topItem?.title = "설정"
    }
}

extension SettingViewController {
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        let alertController = UIAlertController(title: "지금 로그아웃 하시겠습니까?",
                                                message: nil,
                                                preferredStyle: .alert)
        let okAction = UIAlertAction(title: "로그아웃", style: .destructive,
                                     handler: { [weak self] _ in self?.coordinator?.showLogin()
                                     })
        let cancel = UIAlertAction(title: "취소", style: .cancel, handler: nil)

        alertController.addAction(okAction)
        alertController.addAction(cancel)
        present(alertController, animated: true, completion: nil)
    }
}
