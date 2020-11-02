//
//  SignUpViewController.swift
//  IssueTracker
//
//  Created by TTOzzi on 2020/10/28.
//

import UIKit

final class SignUpViewController: UIViewController {
    
    private let signUpUseCase: SignUpUseCase = SignUpUseCase(networkService: NetworkService())
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
}
