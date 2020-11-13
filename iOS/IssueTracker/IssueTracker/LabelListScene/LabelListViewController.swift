//
//  LabelListController.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/04.
//

import UIKit

final class LabelListViewController: UIViewController {
    
    static var identifier: String {
        return String(describing: Self.self)
    }
    @IBOutlet private weak var labelCollectionView: UICollectionView!
    private let refeshControl: UIRefreshControl = UIRefreshControl()
    weak var coordinator: LabelCoordinator?
    private let useCase: LabelListUseCaseType
    private var labels: [Label] = [] {
        didSet {
            updateList()
        }
    }
    private lazy var dataSource: LabelCollectionViewDataSource = labelDataSource()
    
    init?(coder: NSCoder, useCase: LabelListUseCaseType) {
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
}

extension LabelListViewController: LabelEditViewControllerDelegate {
    func labelChanged(_ labelEditViewController: LabelEditViewController) {
        loadList()
    }
}

extension LabelListViewController: UICollectionViewDelegate {
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        guard let selectedLabel = dataSource.itemIdentifier(for: indexPath) else { return }
        useCase.loadLabel(for: selectedLabel.id) { [weak self] result in
            guard let self = self else { return }
            DispatchQueue.main.async {
                switch result {
                case let .success(label):
                    self.coordinator?.showEdit(label: label, self)
                case let .failure(error):
                    self.alert(message: error.localizedDescription)
                }
            }
        }
    }
}

private extension LabelListViewController {
    func labelCollectionViewLayout() -> UICollectionViewCompositionalLayout {
        var configuration = UICollectionLayoutListConfiguration(appearance: .plain)
        configuration.trailingSwipeActionsConfigurationProvider = { [weak self] indexPath in
            let closeAction = UIContextualAction(
                style: .destructive,
                title: "Delete",
                handler: { _, _, _ in
                    guard let self = self,
                          let label = self.dataSource.itemIdentifier(for: indexPath) else { return }
                    self.remove(with: label.id)
                    self.labels.remove(at: indexPath.item)
                }
            )
            return UISwipeActionsConfiguration(actions: [closeAction])
        }
        return UICollectionViewCompositionalLayout.list(using: configuration)
    }
}

private extension LabelListViewController {
    enum Section {
        case main
    }
    
    typealias LabelCollectionViewDataSource = UICollectionViewDiffableDataSource<Section, Label>
    typealias LabelCollectionViewSnapshot = NSDiffableDataSourceSnapshot<Section, Label>
    
    func labelDataSource() -> LabelCollectionViewDataSource {
        return LabelCollectionViewDataSource(
            collectionView: labelCollectionView,
            cellProvider: { collectionView, indexPath, label -> LabelCollectionViewCell? in
                let cell = collectionView.dequeueReusableCell(
                    withReuseIdentifier: LabelCollectionViewCell.identifier,
                    for: indexPath
                ) as? LabelCollectionViewCell
                cell?.update(with: label)
                return cell
            }
        )
    }
    
    func updateList() {
        var snapshot = LabelCollectionViewSnapshot()
        snapshot.appendSections([.main])
        snapshot.appendItems(labels, toSection: .main)
        DispatchQueue.main.async { [weak self] in
            self?.dataSource.apply(snapshot)
        }
    }
}

private extension LabelListViewController {
    func loadList(completion: (() -> Void)? = nil) {
        useCase.loadList {[weak self] result in
            switch result {
            case let .success(labels):
                self?.labels = labels
            case let .failure(error):
                DispatchQueue.main.async {
                    self?.alert(message: error.localizedDescription)
                }
            }
            completion?()
        }
    }
    
    func remove(with id: Int) {
        useCase.removeLabel(for: id) { [weak self] error in
            guard let error = error else {
                self?.loadList()
                return
            }
            self?.alert(message: error.localizedDescription)
        }
    }
    
    @objc func addButtonDidTouchUp() {
        let newLabel = Label(id: 0,
                             title: "",
                             color: RandomHexColorGenerator.generate(),
                             description: nil)
        coordinator?.showCreate(label: newLabel, self)
    }
}

private extension LabelListViewController {
    func configure() {
        configureNavigationBar()
        configureCollectionView()
    }

    func configureNavigationBar() {
        navigationItem.rightBarButtonItem = UIBarButtonItem(barButtonSystemItem: .add,
                                                            target: self,
                                                            action: #selector(addButtonDidTouchUp))
        navigationController?.navigationBar.prefersLargeTitles = true
        navigationController?.navigationBar.topItem?.title = "레이블"
    }
    
    func configureCollectionView() {
        labelCollectionView.refreshControl = refeshControl
        refeshControl.addTarget(self, action: #selector(reloadData), for: .valueChanged)
        labelCollectionView.delegate = self
        labelCollectionView.dataSource = dataSource
        labelCollectionView.setCollectionViewLayout(labelCollectionViewLayout(), animated: true)
    }
    
    @objc func reloadData() {
        loadList { [weak self] in
            DispatchQueue.main.async {
                self?.refeshControl.endRefreshing()
            }
        }
    }
}
