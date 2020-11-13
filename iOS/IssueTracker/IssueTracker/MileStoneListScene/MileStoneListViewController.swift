//
//  MileStoneListViewController.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/04.
//

import UIKit

final class MileStoneListViewController: UIViewController {
    
    static var identifier: String {
        return String(describing: Self.self)
    }
    @IBOutlet private weak var mileStoneCollectionView: UICollectionView!
    weak var coordinator: MileStoneCoordinator?
    private let useCase: MileStoneListUseCaseType
    private var mileStones: [MileStone] = [] {
        didSet {
            updateList()
        }
    }
    private lazy var dataSource: MileStoneCollectionViewDataSource = mileStoneDataSource()
    
    init?(coder: NSCoder, useCase: MileStoneListUseCaseType) {
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

private extension MileStoneListViewController {
    @objc func addButtonDidTouchUp() {
        let newMileStone = MileStone(id: 0,
                             title: "",
                             description: nil, duedate: nil)
        coordinator?.showCreate(mileStone: newMileStone, self)
    }
}

extension MileStoneListViewController: UICollectionViewDelegate {
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        guard let selectedMileStone = dataSource.itemIdentifier(for: indexPath) else { return }
        useCase.loadMileStone(for: selectedMileStone.id) { [weak self] result in
            guard let self = self else { return }
            DispatchQueue.main.async {
                switch result {
                case let .success(mileStone):
                    self.coordinator?.showEdit(mileStone: mileStone, self)
                case let .failure(error):
                    self.alert(message: error.localizedDescription)
                }
            }
        }
    }
}

private extension MileStoneListViewController {
    func mileStoneCollectionViewLayout() -> UICollectionViewCompositionalLayout {
        var configuration = UICollectionLayoutListConfiguration(appearance: .plain)
        configuration.trailingSwipeActionsConfigurationProvider = { [weak self] indexPath in
            let closeAction = UIContextualAction(
                style: .destructive,
                title: "Delete",
                handler: { _, _, _ in
                    guard let self = self,
                          let label = self.dataSource.itemIdentifier(for: indexPath) else { return }
                    self.remove(with: label.id)
                    self.mileStones.remove(at: indexPath.item)
                }
            )
            return UISwipeActionsConfiguration(actions: [closeAction])
        }
        return UICollectionViewCompositionalLayout.list(using: configuration)
    }
}

private extension MileStoneListViewController {
    enum Section {
        case main
    }
    
    typealias MileStoneCollectionViewDataSource = UICollectionViewDiffableDataSource<Section, MileStone>
    typealias MileStoneCollectionViewSnapshot = NSDiffableDataSourceSnapshot<Section, MileStone>
    
    func mileStoneDataSource() -> MileStoneCollectionViewDataSource {
        return MileStoneCollectionViewDataSource(
            collectionView: mileStoneCollectionView,
            cellProvider: { collectionView, indexPath, mileStone -> MileStoneCollectionViewCell? in
                let cell = collectionView.dequeueReusableCell(
                    withReuseIdentifier: MileStoneCollectionViewCell.identifier,
                    for: indexPath) as? MileStoneCollectionViewCell
                cell?.update(with: mileStone)
                return cell
            }
        )
    }
    
    func updateList() {
        var snapshot = MileStoneCollectionViewSnapshot()
        snapshot.appendSections([.main])
        snapshot.appendItems(mileStones, toSection: .main)
        DispatchQueue.main.async { [weak self] in
            self?.dataSource.apply(snapshot)
        }
    }
}

private extension MileStoneListViewController {
    func configure() {
        configureNavigationBar()
        configureCollectionView()
    }
    
    func configureNavigationBar() {
        navigationItem.rightBarButtonItem = UIBarButtonItem(barButtonSystemItem: .add,
                                                            target: self,
                                                            action: #selector(addButtonDidTouchUp))
        navigationController?.navigationBar.prefersLargeTitles = true
        navigationController?.navigationBar.topItem?.title = "마일스톤"
    }
    
    func configureCollectionView() {
        mileStoneCollectionView.dataSource = dataSource
        mileStoneCollectionView.setCollectionViewLayout(mileStoneCollectionViewLayout(), animated: true)
        mileStoneCollectionView.delegate = self
    }
}

extension MileStoneListViewController: MileStoneEditViewControllerDelegate {
    func mileStoneChanged(_ mileStoneEditViewController: MileStoneEditViewController) {
        loadList()
    }
}

private extension MileStoneListViewController {
    func loadList() {
        useCase.loadList {[weak self] result in
            switch result {
            case let .success(mileStones):
                self?.mileStones = mileStones
            case let .failure(error):
                DispatchQueue.main.async {
                    self?.alert(message: error.localizedDescription)
                }
            }
        }
    }
    
    func remove(with id: Int) {
        useCase.removeMileStone(for: id) { [weak self] error in
            guard let error = error else {
                self?.loadList()
                return
            }
            self?.alert(message: error.localizedDescription)
        }
    }
}
