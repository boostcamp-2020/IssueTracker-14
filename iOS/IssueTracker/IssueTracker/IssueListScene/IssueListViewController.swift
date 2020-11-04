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
    @IBOutlet private weak var issueCollectionView: UICollectionView!
    private var dataSource: IssueCollectionViewDataSource?
    private var issues: [Issue] = [Issue(id: 1, title: "이슈 목록 구현", description: "2줄까지만표시?2줄까지만표시?2줄까지만표시?2줄까지만표시?2줄까지만표시?2줄까지만표시?"),
                                   Issue(id: 2, title: "레이블 목록 구현", description: "?"),
                                   Issue(id: 3, title: "마일스톤 목록 구현", description: "설명표시"),
                                   Issue(id: 4, title: "데모", description: "배포?")] {
        didSet {
            updateList()
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        let cellNib = UINib(nibName: IssueCollectionViewCell.identifier, bundle: .main)
        issueCollectionView.register(cellNib, forCellWithReuseIdentifier: IssueCollectionViewCell.identifier)
        dataSource = issueDataSource()
        issueCollectionView.dataSource = dataSource
        issueCollectionView.setCollectionViewLayout(issueCollectionViewLayout(), animated: true)
        updateList()
    }
}

private extension IssueListViewController {
    func issueCollectionViewLayout() -> UICollectionViewCompositionalLayout {
        var configuration = UICollectionLayoutListConfiguration(appearance: .plain)
        configuration.trailingSwipeActionsConfigurationProvider = { indexPath in
            let closeAction = UIContextualAction(
                style: .destructive,
                title: "Close",
                handler: { [weak self] _, _, _ in
                    self?.issues.remove(at: indexPath.item)
                }
            )
            return UISwipeActionsConfiguration(actions: [closeAction])
        }
        return UICollectionViewCompositionalLayout.list(using: configuration)
    }
}

private extension IssueListViewController {
    enum Section {
        case main
    }
    
    typealias IssueCollectionViewDataSource = UICollectionViewDiffableDataSource<Section, Issue>
    typealias IssueCollectionViewSnapshot = NSDiffableDataSourceSnapshot<Section, Issue>
    
    func issueDataSource() -> IssueCollectionViewDataSource {
        return IssueCollectionViewDataSource(
            collectionView: issueCollectionView,
            cellProvider: { collectionView, indexPath, issue -> IssueCollectionViewCell? in
                let cell = collectionView.dequeueReusableCell(
                    withReuseIdentifier: IssueCollectionViewCell.identifier,
                    for: indexPath
                ) as? IssueCollectionViewCell
                cell?.update(with: issue)
                return cell
            }
        )
    }
    
    func updateList() {
        var snapshot = IssueCollectionViewSnapshot()
        snapshot.appendSections([.main])
        snapshot.appendItems(issues, toSection: .main)
        dataSource?.apply(snapshot)
    }
}
