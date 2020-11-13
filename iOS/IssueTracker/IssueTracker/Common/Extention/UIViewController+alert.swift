//
//  UIViewController+alert.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/02.
//

import UIKit

extension UIViewController {
    
    func alert(message: String, completion: @escaping ((UIAlertAction) -> Void) = { _ in }) {
        let alertController = UIAlertController(title: message,
                                                message: nil,
                                                preferredStyle: .alert)
        let okAction = UIAlertAction(title: "OK", style: .cancel, handler: completion)
        alertController.addAction(okAction)
        present(alertController, animated: true, completion: nil)
    }
}
