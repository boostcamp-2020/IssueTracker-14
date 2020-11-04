//
//  IssueListViewController.swift
//  IssueTracker
//
//  Created by TTOzzi on 2020/11/02.
//

import UIKit

final class IssueListViewController: UIViewController {
    
    private enum Constant {
        static let closeActionTitle: String = "Close"
    }
    
    static var identifier: String {
        return String(describing: Self.self)
    }
    @IBOutlet private weak var issueCollectionView: UICollectionView!
    weak var coordinator: IssueCoordinator?
    private let useCase: IssueListUseCaseType
    private var dataSource: IssueCollectionViewDataSource?
    private var issues: [Issue] = [] {
        didSet {
            updateList()
        }
    }
    
    init?(coder: NSCoder, useCase: IssueListUseCaseType) {
        self.useCase = useCase
        super.init(coder: coder)
    }
    
    required init?(coder: NSCoder) {
        fatalError("This viewController must be init with useCase.")
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        navigationItem.leftBarButtonItem = UIBarButtonItem(title: "Filter", style: .plain, target: nil, action: nil)
        navigationItem.rightBarButtonItem = UIBarButtonItem(title: "Edit", style: .plain, target: nil, action: nil)
        navigationItem.searchController = UISearchController(searchResultsController: nil)
        navigationController?.navigationBar.prefersLargeTitles = true
        navigationController?.navigationBar.topItem?.title = "이슈"
        let cellNib = UINib(nibName: IssueCollectionViewCell.identifier, bundle: .main)
        issueCollectionView.register(cellNib, forCellWithReuseIdentifier: IssueCollectionViewCell.identifier)
        dataSource = issueDataSource()
        issueCollectionView.dataSource = dataSource
        issueCollectionView.setCollectionViewLayout(issueCollectionViewLayout(), animated: true)
        updateList()
        useCase.loadList { result in
            switch result {
            case let .success(issues):
                self.issues = issues
            case let .failure(error):
                break
            }
        }
    }
}

private extension IssueListViewController {
    func issueCollectionViewLayout() -> UICollectionViewCompositionalLayout {
        var configuration = UICollectionLayoutListConfiguration(appearance: .plain)
        configuration.trailingSwipeActionsConfigurationProvider = { indexPath in
            let closeAction = UIContextualAction(
                style: .destructive,
                title: Constant.closeActionTitle,
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
        DispatchQueue.main.async { [weak self] in
            self?.dataSource?.apply(snapshot)
        }
    }
}
