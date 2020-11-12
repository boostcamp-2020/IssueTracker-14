//
//  LabelListUseCaseTests.swift
//  IssueTrackerUnitTests
//
//  Created by TTOzzi on 2020/11/12.
//

import XCTest
@testable import IssueTracker

final class LabelListUseCaseTests: XCTestCase {

    private let labels: [Label] = [
        Label(id: 1, title: "test", color: "", description: ""),
        Label(id: 2, title: "t", color: "", description: nil),
        Label(id: 3, title: "testtest", color: "", description: "")
    ]
    
    struct MockSuccessLabelListNetworkService: NetworkServiceProviding {
        
        var userToken: String? = nil
        let labels: [Label]
        
        func request(requestType: RequestType, completionHandler: @escaping (Result<Data, NetworkError>) -> Void) {
            let response = LabelListResponse(labels: labels)
            let data = try? JSONEncoder().encode(response)
            completionHandler(.success(data!))
        }
    }
    
    struct MockSuccessLabelNetworkService: NetworkServiceProviding {
        
        var userToken: String? = nil
        let label: Label
        
        func request(requestType: RequestType, completionHandler: @escaping (Result<Data, NetworkError>) -> Void) {
            let response = LabelResponse(label: label)
            let data = try? JSONEncoder().encode(response)
            completionHandler(.success(data!))
        }
    }
    
    func testLoadListSuccess() {
        let useCase = LabelListUseCase(networkService: MockSuccessLabelListNetworkService(labels: labels))
        useCase.loadList { [weak self] result in
            switch result {
            case let .success(labels):
                XCTAssertEqual(self?.labels, labels)
            case .failure:
                XCTFail()
            }
        }
    }
    
    func testLoadListFailure() {
        let useCase = LabelListUseCase(networkService: MockFailureNetworkService())
        useCase.loadList { result in
            switch result {
            case .success:
                XCTFail()
            case let .failure(error):
                XCTAssertEqual(error, .networkError(message: ""))
            }
        }
    }
    
    func testLoadLabelSuccess() {
        let useCase = LabelListUseCase(networkService: MockSuccessLabelNetworkService(label: labels[0]))
        useCase.loadLabel(for: 1) { [weak self] result in
            switch result {
            case let .success(label):
                XCTAssertEqual(self?.labels[0], label)
            case .failure:
                XCTFail()
            }
        }
    }
    
    func testLoadLabelFailure() {
        let useCase = LabelListUseCase(networkService: MockFailureNetworkService())
        useCase.loadLabel(for: 1) { result in
            switch result {
            case .success:
                XCTFail()
            case let .failure(error):
                XCTAssertEqual(error, .networkError(message: ""))
            }
        }
    }

    func testRemoveLabelSuccess() {
        let useCase = LabelListUseCase(networkService: MockSuccessLabelListNetworkService(labels: labels))
        useCase.removeLabel(for: 1) { error in
            XCTAssertNil(error)
        }
    }
    
    func testRemoveLabelFailure() {
        let useCase = LabelListUseCase(networkService: MockFailureNetworkService())
        useCase.removeLabel(for: 1) { error in
            XCTAssertEqual(error, .networkError(message: ""))
        }
    }
}
