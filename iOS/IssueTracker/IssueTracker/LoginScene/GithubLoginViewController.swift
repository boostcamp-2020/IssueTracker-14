//
//  GithubLoginViewController.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/12.
//

import UIKit
import WebKit

protocol GithubLoginViewControllerDelegate: class {
    func loginComplete(token: String)
}

final class GithubLoginViewController: UIViewController {
    
    static var identifier: String {
        return String(describing: Self.self)
    }
    @IBOutlet private weak var webView: WKWebView!
    private let githubLoginURL: URL? = URL(string: "http://115.85.183.106:3000/api/user/oauth/github")
    private let queryName: String = "access_token"
    weak var coordinator: MainCoordinator?
    weak var delegate: GithubLoginViewControllerDelegate?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        cleanAllCookies()
        configure()
    }
}

extension GithubLoginViewController: WKNavigationDelegate {
    func webView(_ webView: WKWebView, didReceiveServerRedirectForProvisionalNavigation navigation: WKNavigation!) {
        guard let url = webView.url else { return }
        let urlComponents = URLComponents(url: url, resolvingAgainstBaseURL: true)
        guard let queryItems = urlComponents?.queryItems,
              let token = queryItems.first(where: {$0.name == queryName})?.value else { return }
        dismiss(animated: true) { [weak self] in
            self?.delegate?.loginComplete(token: token)
        }
    }
}

private extension GithubLoginViewController {
    func configure() {
        webView.navigationDelegate = self
        guard let githubLoginURL = githubLoginURL else { return }
        let githubLoginRequest = URLRequest(url: githubLoginURL)
        webView.load(githubLoginRequest)
    }
    
    func cleanAllCookies() {
        let dataStore = WKWebsiteDataStore.default()
        dataStore.fetchDataRecords(ofTypes: WKWebsiteDataStore.allWebsiteDataTypes()) { records in
            records.forEach { record in
                dataStore.removeData(
                    ofTypes: record.dataTypes, for: [record], completionHandler: {})
            }
        }
    }
}
