//
//  LabelUseCaseTests.swift
//  IssueTrackerUnitTests
//
//  Created by TTOzzi on 2020/11/12.
//

import XCTest
@testable import IssueTracker

final class LabelUseCaseTests: XCTestCase {
    
    struct MockSuccessNetworkService: NetworkServiceProviding {
        var userToken: String? = nil
        
        func request(requestType: RequestType, completionHandler: @escaping (Result<Data, NetworkError>) -> Void) {
            completionHandler(.success(Data()))
        }
    }
    
    private let testLabel = Label(id: 0, title: "", color: "", description: nil)
    
    func testLabelEditSuccess() {
        let useCase = LabelEditUseCase(networkService: MockSuccessNetworkService())
        useCase.save(label: testLabel) { error in
            XCTAssertNil(error)
        }
    }
    
    func testLabelEditFailure() {
        let useCase = LabelEditUseCase(networkService: MockFailureNetworkService())
        useCase.save(label: testLabel) { error in
            XCTAssertEqual(error, .networkError(message: ""))
        }
    }
    
    func testLabelCreateSuccess() {
        let useCase = LabelCreateUseCase(networkService: MockSuccessNetworkService())
        useCase.save(label: testLabel) { error in
            XCTAssertNil(error)
        }
    }
    
    func testLabelCreateFailure() {
        let useCase = LabelCreateUseCase(networkService: MockFailureNetworkService())
        useCase.save(label: testLabel) { error in
            XCTAssertEqual(error, .networkError(message: ""))
        }
    }
}
