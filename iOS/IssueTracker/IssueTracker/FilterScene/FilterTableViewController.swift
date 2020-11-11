//
//  TableViewController.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/12.
//

import UIKit

class FilterTableViewController: UITableViewController {
    
    private enum Constant {
        static let firstSectionHeaderTitle: String = "다음 중에 조건을 고르세요"
        static let SecondSectionHeaderTitle: String = "세부 조건"
    }
    
    static var identifier: String {
        return String(describing: Self.self)
    }
    @IBOutlet var conditions: [UITableViewCell]!
    @IBOutlet var detailConditions: [UITableViewCell]!
    private var seletedRowInFirstSection = 0
    
    override func viewDidLoad() {
        super.viewDidLoad()
        configure()
    }
}

extension FilterTableViewController {
    override func numberOfSections(in tableView: UITableView) -> Int {
        return 2
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return section == 0 ? 5 : 4
    }
    
    override func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        return section == 0 ? 50 : 38
    }

    override func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        if let header = tableView.dequeueReusableHeaderFooterView(
            withIdentifier: FilterTableViewHeaderFooterView.identifier) as?
            FilterTableViewHeaderFooterView {
            return header
        }
        return nil
    }
    
    override func tableView(_ tableView: UITableView, willDisplayHeaderView view: UIView, forSection section: Int) {
        guard let view = view as? FilterTableViewHeaderFooterView else { return }
        view.textLabel?.text = section == 0 ? Constant.firstSectionHeaderTitle : Constant.SecondSectionHeaderTitle

    }
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        guard indexPath.section == 0 else { return }
        let cell = tableView.cellForRow(at: indexPath)
        cell?.accessoryType = .checkmark
    }
    
    override func tableView(_ tableView: UITableView, willSelectRowAt indexPath: IndexPath) -> IndexPath? {
        guard indexPath.section == 0 else { return indexPath}
        let selectedIndexPath = IndexPath(item: seletedRowInFirstSection, section: 0)
        tableView.deselectRow(at: selectedIndexPath, animated: false)
        tableView.cellForRow(at: selectedIndexPath)?.accessoryType = .none
        seletedRowInFirstSection = indexPath.item
        return indexPath
    }
    
    override func tableView(_ tableView: UITableView, didDeselectRowAt indexPath: IndexPath) {
        guard indexPath.section == 0 else { return }
        let cell = tableView.cellForRow(at: indexPath)
         cell?.accessoryType = .none
    }
    
    override func tableView(_ tableView: UITableView, willDeselectRowAt indexPath: IndexPath) -> IndexPath? {
        return nil
    }
}
private extension FilterTableViewController {
    func configure() {
        configureNavigationBar()
        configureTableView()
    }
    
    func configureNavigationBar() {
        navigationController?.navigationBar.prefersLargeTitles = true
        navigationController?.navigationBar.topItem?.title = "필터 선택"
        navigationItem.rightBarButtonItem = editButtonItem
    }
    
    func configureTableView() {
        let indexPath = IndexPath(row: 0, section: 0)
        tableView.allowsMultipleSelection = true
        tableView.selectRow(at: indexPath, animated: true, scrollPosition: .top)
        conditions[0].accessoryType = .checkmark
        conditions.forEach { cell in
            cell.selectionStyle = .none
        }
        detailConditions.forEach { cell in
            cell.accessoryType = .disclosureIndicator
            cell.selectionStyle = .none
        }
        tableView.register(
            FilterTableViewHeaderFooterView.self,
            forHeaderFooterViewReuseIdentifier: FilterTableViewHeaderFooterView.identifier)
    }
}

private extension FilterTableViewController {
    @IBAction func doneButtonDidTouchUp(_ sender: UIButton) {
        dismiss(animated: true)
    }
    
    @IBAction func cancelButtonDidTouchUp(_ sender: UIButton) {
        dismiss(animated: true)
    }
}
