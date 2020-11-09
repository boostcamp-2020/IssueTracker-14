//
//  IssueDetailViewController.swift
//  IssueTracker
//
//  Created by TTOzzi on 2020/11/05.
//

import UIKit

final class IssueDetailViewController: UIViewController {
    
    static var identifier: String {
        return String(describing: Self.self)
    }
    @IBOutlet private weak var issueDetailTableView: UITableView!
    weak var coordinator: IssueCoordinator?
    private let pullUpViewController: IssueDetailPullUpViewController
    private let pullUpViewAnimator: UIViewPropertyAnimator = UIViewPropertyAnimator(duration: 0.1,
                                                                                    curve: .easeOut,
                                                                                    animations: nil)
    
    init?(coder: NSCoder, pullUpViewController: IssueDetailPullUpViewController) {
        self.pullUpViewController = pullUpViewController
        super.init(coder: coder)
    }
    
    required init?(coder: NSCoder) {
        fatalError("This viewController must be init with pullUpViewController.")
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        navigationItem.rightBarButtonItem = UIBarButtonItem(title: "Edit", style: .plain, target: nil, action: nil)
        issueDetailTableView.dataSource = self
        issueDetailTableView.delegate = self
        configuePullUpView()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        tabBarController?.tabBar.isHidden = true
        navigationController?.navigationBar.prefersLargeTitles = true

    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        tabBarController?.tabBar.isHidden = false
    }
}

extension IssueDetailViewController: UITableViewDataSource {
    func numberOfSections(in tableView: UITableView) -> Int {
        return 10
    }

    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 1
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let cell = tableView.dequeueReusableCell(
                withIdentifier: IssueDetailTableViewCell.identifier,
                for: indexPath
        ) as? IssueDetailTableViewCell else { return UITableViewCell() }
        cell.update(isComment: indexPath.section > 0)
        return cell
    }
}

extension IssueDetailViewController: UITableViewDelegate {
    func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        let header = UIView()
        header.backgroundColor = .systemGroupedBackground
        return header
    }
    
    func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        return 24
    }
}

private extension IssueDetailViewController {
    func configuePullUpView() {
        view.addSubview(pullUpViewController.view)
        let panGesture = UIPanGestureRecognizer(target: self, action: #selector(pullUpAction))
        pullUpViewController.view.addGestureRecognizer(panGesture)
    }
    
    @objc func pullUpAction(_ panGestureRecognizer: UIPanGestureRecognizer) {
        guard let pullUpView = pullUpViewController.view else { return }
        let transition = panGestureRecognizer.translation(in: pullUpView)
        let velocity = panGestureRecognizer.velocity(in: pullUpView)
        let changedY = pullUpView.center.y + transition.y
        let maxY = view.center.y * 2.5
        let minY = view.center.y * 1.16
        let isNavigationBarHidden = velocity.y < 0
        let willMoveY = velocity.y < 0  ? minY : maxY
        
        navigationController?.setNavigationBarHidden(isNavigationBarHidden, animated: true)
        guard (minY...maxY).contains(changedY) else { return }
        
        pullUpView.center = CGPoint(x: pullUpView.center.x, y: changedY)
        panGestureRecognizer.setTranslation(.zero, in: pullUpView)
        guard panGestureRecognizer.state == .ended else { return }
        
        pullUpViewAnimator.stopAnimation(true)
        pullUpViewAnimator.addAnimations {
            pullUpView.center = CGPoint(x: pullUpView.center.x, y: willMoveY)
        }
        pullUpViewAnimator.startAnimation()
    }
}
