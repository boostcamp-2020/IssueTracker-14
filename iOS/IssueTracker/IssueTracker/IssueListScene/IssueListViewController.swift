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
        static let navigationBarTopTitle: String = "이슈"
        static let leftBarButtonItemTitle: String = "Filter"
        static let leftBarButtonItemTitleDuringEditing: String = "Select All"
        static let rightBarButtonItemTitle: String = "Edit"
        static let rightBarButtonItemTitleDuringEditing: String = "Cancel"
    }
    
    static var identifier: String {
        return String(describing: Self.self)
    }
    @IBOutlet private weak var issueCollectionView: UICollectionView!
    private let refeshControl: UIRefreshControl = UIRefreshControl()
    weak var coordinator: IssueCoordinator?
    private let useCase: IssueListUseCaseType
    private var issueListViewEditTabBar: IssueListViewEditTabBar!
    private var selectedCellsCount: Int =  0 {
        didSet {
            guard isEditing else { return }
            navigationController?.navigationBar.topItem?.title = "\(selectedCellsCount)개 선택"
        }
    }
    private var issues: [Issue] = [] {
        didSet {
            updateList()
        }
    }
    private lazy var dataSource: IssueCollectionViewDataSource = issueDataSource()
    init?(coder: NSCoder, useCase: IssueListUseCaseType) {
        self.useCase = useCase
        super.init(coder: coder)
    }
    
    required init?(coder: NSCoder) {
        fatalError("This viewController must be init with useCase.")
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        configure()
        loadList()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        navigationController?.navigationBar.prefersLargeTitles = true
    }
    
    override func setEditing(_ editing: Bool, animated: Bool) {
        super.setEditing(editing, animated: animated)
        selectedCellsCount = 0
        setEditingNavigationItem(editing)
        issueCollectionView.allowsMultipleSelection = editing
        issueCollectionView.indexPathsForVisibleItems.forEach { indexPath in
            let cell = issueCollectionView.cellForItem(at: indexPath) as? IssueCollectionViewCell
            cell?.isEditing = editing
        }
        if !editing {
            deselectAllItems()
            issueListViewEditTabBar.removeFromSuperview()
        } else {
            tabBarController?.tabBar.addSubview(issueListViewEditTabBar)
        }
    }

    @IBAction private func issueCreateButtonDidTouchUp(_ sender: ShadowButton) {
        coordinator?.showCreateIssue()
    }
}

extension IssueListViewController: UICollectionViewDelegate {
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        if !isEditing {
            guard let selectedIssue = dataSource.itemIdentifier(for: indexPath) else { return }
            useCase.loadDetail(with: selectedIssue.id) { [weak self] result in
                switch result {
                case let .success(issue):
                    self?.coordinator?.showDetail(of: issue)
                case let .failure(error):
                    self?.alert(message: error.localizedDescription)
                }
            }
            issueCollectionView.deselectItem(at: indexPath, animated: true)
        } else {
            selectedCellsCount = issueCollectionView.indexPathsForSelectedItems?.count ?? 0
        }
    }
    
    func collectionView(_ collectionView: UICollectionView, didDeselectItemAt indexPath: IndexPath) {
        guard isEditing else { return }
        selectedCellsCount = issueCollectionView.indexPathsForSelectedItems?.count ?? 0
    }
}

private extension IssueListViewController {
    func issueCollectionViewLayout() -> UICollectionViewCompositionalLayout {
        var configuration = UICollectionLayoutListConfiguration(appearance: .plain)
        configuration.trailingSwipeActionsConfigurationProvider = { [weak self] indexPath in
            let closeAction = UIContextualAction(
                style: .destructive,
                title: Constant.closeActionTitle,
                handler: { _, _, _ in
                    guard let self = self,
                          let issue = self.dataSource.itemIdentifier(for: indexPath) else { return }
                    self.closeIssue(with: issue.id)
                    self.issues.remove(at: indexPath.item)
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
            cellProvider: { [unowned self] collectionView, indexPath, issue -> IssueCollectionViewCell? in
                let cell = collectionView.dequeueReusableCell(
                    withReuseIdentifier: IssueCollectionViewCell.identifier,
                    for: indexPath
                ) as? IssueCollectionViewCell
                cell?.update(with: issue, isEditing: self.isEditing)
                return cell
            }
        )
    }
    
    func updateList() {
        var snapshot = IssueCollectionViewSnapshot()
        snapshot.appendSections([.main])
        snapshot.appendItems(issues, toSection: .main)
        DispatchQueue.main.async { [weak self] in
            self?.dataSource.apply(snapshot)
        }
    }
}

private extension IssueListViewController {
    func loadList(completion: (() -> Void)? = nil) {
        useCase.loadList {[weak self] result in
            switch result {
            case let .success(issues):
                self?.issues = issues
            case let .failure(error):
                DispatchQueue.main.async {
                    self?.alert(message: error.localizedDescription)
                }
            }
            completion?()
        }
    }
    
    func closeIssue(with id: Int) {
        useCase.closeIssue(with: id) {[weak self] error in
            if let error = error {
                DispatchQueue.main.async {
                    self?.alert(message: "Close 실패\n\(error.localizedDescription)")
                    return
                }
            }
            self?.loadList()
        }
    }
}

extension IssueListViewController: IssueListViewEditTabBarDelegate {
    func closeButtonDidTouchUp(_ issueListViewEditTabBar: IssueListViewEditTabBar) {
        guard let selectedItems = issueCollectionView.indexPathsForSelectedItems else { return }
        let set =  selectedItems.reduce(into: Set<Int>(), { result, indexPath in
            result.insert(issues[indexPath.item].id)
        })
        selectedCellsCount = 0
        issues.removeAll(where: { set.contains($0.id) })
    }
}

private extension IssueListViewController {
    @objc func selectAllButtonDidTouchUp() {
        guard isEditing else {
            coordinator?.showFilter()
            return
        }
        if selectedCellsCount == issues.count {
            deselectAllItems()
            navigationItem.leftBarButtonItem?.title = "SelectAll"
        } else {
            navigationItem.leftBarButtonItem?.title = "DeselectAll"
            (0..<issues.count).forEach { item in
                let indexPath = IndexPath(item: item, section: 0)
                issueCollectionView.selectItem(at: indexPath, animated: true, scrollPosition: .init())
            }
            selectedCellsCount = issues.count
        }
    }
    
    func deselectAllItems() {
        issueCollectionView.indexPathsForSelectedItems?.forEach { indexPath in
            issueCollectionView.deselectItem(at: indexPath, animated: true)
        }
        selectedCellsCount = 0
    }
}

private extension IssueListViewController {
    func configure() {
        configureNavigationBar()
        configureCollectionView()
        configureTabBar()
    }
    
    func configureNavigationBar() {
        navigationItem.leftBarButtonItem = UIBarButtonItem(title: Constant.leftBarButtonItemTitle,
                                                           style: .plain, target: self, action:
                                                            #selector(selectAllButtonDidTouchUp))
        navigationItem.rightBarButtonItem = editButtonItem
        navigationItem.searchController = UISearchController(searchResultsController: nil)
        navigationController?.navigationBar.topItem?.title = Constant.navigationBarTopTitle
    }
    
    func configureCollectionView() {
        issueCollectionView.refreshControl = refeshControl
        refeshControl.addTarget(self, action: #selector(reloadData), for: .valueChanged)
        let cellNib = UINib(nibName: IssueCollectionViewCell.identifier, bundle: .main)
        issueCollectionView.register(cellNib, forCellWithReuseIdentifier: IssueCollectionViewCell.identifier)
        issueCollectionView.dataSource = dataSource
        issueCollectionView.delegate = self
        issueCollectionView.setCollectionViewLayout(issueCollectionViewLayout(), animated: true)
    }
    
    func configureTabBar() {
        guard let tabBarController = tabBarController else { return }
        let tabBarFrame = CGRect(origin: .zero, size: (tabBarController.tabBar.frame.size))
        issueListViewEditTabBar = IssueListViewEditTabBar(frame: tabBarFrame)
        issueListViewEditTabBar.delegate = self
    }
    
    func setEditingNavigationItem(_ editing: Bool) {
        navigationItem.leftBarButtonItem?.title = editing ?
            Constant.leftBarButtonItemTitleDuringEditing : Constant.leftBarButtonItemTitle
        navigationItem.rightBarButtonItem?.title = editing ?
            Constant.rightBarButtonItemTitleDuringEditing : Constant.rightBarButtonItemTitle
        navigationItem.searchController?.searchBar.isHidden = editing
        if !editing {
            navigationController?.navigationBar.topItem?.title =  Constant.navigationBarTopTitle
        } else {
            let rightBarbuttonFont = UIFont.systemFont(ofSize: 17)
            navigationItem.rightBarButtonItem?.setTitleTextAttributes([.font: rightBarbuttonFont],
                                                                      for: .normal)
        }
    }
    
    @objc func reloadData() {
        loadList { [weak self] in
            DispatchQueue.main.async {
                self?.refeshControl.endRefreshing()
            }
        }
    }
}
