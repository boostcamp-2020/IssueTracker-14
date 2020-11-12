//
//  TableViewController.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/12.
//

import UIKit

final class FilterTableViewController: UITableViewController {
    
    static var identifier: String {
        return String(describing: Self.self)
    }
    @IBOutlet private var conditions: [UITableViewCell]!
    @IBOutlet private var detailConditions: [UITableViewCell]!
    private var seletedRowInFirstSection: Int = 0
    
    override func viewDidLoad() {
        super.viewDidLoad()
        configure()
    }
}

extension FilterTableViewController {
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
