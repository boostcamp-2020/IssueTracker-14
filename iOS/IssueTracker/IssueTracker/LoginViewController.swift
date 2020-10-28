//
//  LoginViewController.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/10/27.
//

import UIKit
import AuthenticationServices

final class LoginViewController: UIViewController {
    
    @IBOutlet private weak var githubLoginButton: UIButton!
    private let appleLoginButton: ASAuthorizationAppleIDButton = ASAuthorizationAppleIDButton()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        configureAppleLoginButton()
    }
}

private extension LoginViewController {
    
    func configureAppleLoginButton() {
        appleLoginButton.translatesAutoresizingMaskIntoConstraints = false
        appleLoginButton.cornerRadius = 10
        view.addSubview(appleLoginButton)
        NSLayoutConstraint.activate([
            appleLoginButton.widthAnchor.constraint(equalTo: githubLoginButton.widthAnchor),
            appleLoginButton.topAnchor.constraint(equalTo: githubLoginButton.bottomAnchor, constant: 18),
            appleLoginButton.heightAnchor.constraint(equalTo: githubLoginButton.heightAnchor),
            appleLoginButton.centerXAnchor.constraint(equalTo: view.centerXAnchor)
        ])
    }
}
