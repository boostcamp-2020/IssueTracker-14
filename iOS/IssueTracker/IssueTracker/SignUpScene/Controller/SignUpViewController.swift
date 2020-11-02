//
//  SignUpViewController.swift
//  IssueTracker
//
//  Created by TTOzzi on 2020/10/28.
//

import UIKit

final class SignUpViewController: UIViewController {
    
    static var identifier: String {
        return String(describing: Self.self)
    }
    private let signUpUseCase: SignUpUseCase
    weak var coordinator: MainCoordinator?
    
    init?(coder: NSCoder, useCase: SignUpUseCase) {
        signUpUseCase = useCase
        super.init(coder: coder)
    }
    
    required init?(coder: NSCoder) {
        fatalError("This viewController must be init with useCase.")
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
}
