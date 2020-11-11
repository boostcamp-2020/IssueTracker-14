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
    weak var coordinator: LabelCoordinator?
    private let useCase: LabelListUseCaseType
    private var labels: [Label] = [
        Label(id: 1, title: "hello", color: "", description: "asdf"),
        Label(id: 2, title: "asdf", color: "", description: "vzxcvz"),
        Label(id: 3, title: "afewfwa", color: "", description: "asdfasdfasdf"),
        Label(id: 4, title: "ff", color: "", description: nil)
    ] {
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

private extension LabelListViewController {
    @objc func addButtonDidTouchUp() {
        coordinator?.showEdit()
    }
}

private extension LabelListViewController {
    func labelCollectionViewLayout() -> UICollectionViewCompositionalLayout {
        let configuration = UICollectionLayoutListConfiguration(appearance: .plain)
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
    func loadList() {
        useCase.loadList {[weak self] result in
            switch result {
            case let .success(labels):
                self?.labels = labels
            case let .failure(error):
                DispatchQueue.main.async {
                    self?.alert(message: error.localizedDescription)
                }
            }
        }
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
        labelCollectionView.dataSource = dataSource
        labelCollectionView.setCollectionViewLayout(labelCollectionViewLayout(), animated: true)
        labelCollectionView.allowsSelection = false
    }
}
