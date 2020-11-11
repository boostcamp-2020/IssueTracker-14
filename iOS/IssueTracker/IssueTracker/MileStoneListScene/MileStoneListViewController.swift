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
    private var mileStones: [MileStone] = [
        MileStone(id: 1, title: "milstone1", status: "open", description: "이번 배포를 위한 스프린트",
                  duedate: "2020-11-03T08:08:28.000Z", updatedAt: "2020-11-03T08:08:28.000Z"),
        MileStone(id: 2, title: "milstone2", status: "open", description: "SwiftUI를 위한 스프린트",
                  createAt: "2020-11-03T08:08:28.000Z",
                  duedate: "2020-11-03T08:08:28.000Z", updatedAt: "2020-11-03T08:08:28.000Z"),
        MileStone(id: 3, title: "m", status: "closed", description: "컴바인을 위한 스프린트",
                  createAt: "2020-11-03T08:08:28.000Z",
                  duedate: "2020-11-14T08:08:28.000Z", updatedAt: "2020-11-03T08:08:28.000Z"),
        MileStone(id: 4, title: "조금긴milstone11aaaaaaaaaaaaaaaaaaa",
                  description: "예외테스트예외테스트예외테스트예외테스트예외테스트예외테스트\n예외테스트외테스트예외테스트", createAt: "2020-11-03T08:08:28.000Z",
                  duedate: "2020-11-03T08:08:28.000Z", updatedAt: "2020-11-03T08:08:28.000Z")
    ] {
        didSet {
            updateList()
        }
    }
    private lazy var dataSource: MileStoneCollectionViewDataSource = mileStoneDataSource()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        configure()
        updateList()
    }
}

private extension MileStoneListViewController {
    @objc func addButtonDidTouchUp() {
        coordinator?.showEdit()
    }
}

private extension MileStoneListViewController {
    func mileStoneViewLayout() -> UICollectionViewCompositionalLayout {
        let configuration = UICollectionLayoutListConfiguration(appearance: .plain)
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
        mileStoneCollectionView.setCollectionViewLayout(mileStoneViewLayout(), animated: true)
        mileStoneCollectionView.allowsSelection = false
    }
}
