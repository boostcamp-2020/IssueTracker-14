//
//  MileStoneListUseCaseTests.swift
//  IssueTrackerUnitTests
//
//  Created by 최동규 on 2020/11/13.
//

import XCTest
@testable import IssueTracker

final class MileStoneListUseCaseTests: XCTestCase {

    private let mileStones: [MileStone] = [
        MileStone(id: 1, title: "milestone1"),
        MileStone(id: 2, title: "milestone2",description: ""),
        MileStone(id: 3, title: "milestone13", description: "", duedate: "2025-12-13")
    ]
    
    struct MockSuccessMileStoneListNetworkService: NetworkServiceProviding {
        
        var userToken: String? = nil
        let mileStones: [MileStone]
        
        func request(requestType: RequestType, completionHandler: @escaping (Result<Data, NetworkError>) -> Void) {
            let response = MileStoneListResponse(mileStones: mileStones)
            let data = try? JSONEncoder().encode(response)
            completionHandler(.success(data!))
        }
    }

    struct MockSuccessMileStoneNetworkService: NetworkServiceProviding {

        var userToken: String? = nil
        let mileStone: MileStone

        func request(requestType: RequestType, completionHandler: @escaping (Result<Data, NetworkError>) -> Void) {
            let response = MileStoneResponse(mileStone: mileStone)
            let data = try? JSONEncoder().encode(response)
            completionHandler(.success(data!))
        }
    }

    func testLoadListSuccess() {
        let useCase = MileStoneListUseCase(networkService: MockSuccessMileStoneListNetworkService(mileStones: mileStones))
        useCase.loadList { [weak self] result in
            switch result {
            case let .success(mileStones):
                XCTAssertEqual(self?.mileStones, mileStones)
            case .failure:
                XCTFail()
            }
        }
    }
    
    func testLoadListFailure() {
        let useCase = MileStoneListUseCase(networkService: MockFailureNetworkService())
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
        let useCase = MileStoneListUseCase(networkService: MockSuccessMileStoneNetworkService(mileStone: mileStones[0]))
        useCase.loadMileStone(for: 1) { [weak self] result in
            switch result {
            case let .success(mileStone):
                XCTAssertEqual(self?.mileStones[0], mileStone)
            case .failure:
                XCTFail()
            }
        }
    }

    func testLoadLabelFailure() {
        let useCase = MileStoneListUseCase(networkService: MockFailureNetworkService())
        useCase.loadMileStone(for: 1) { result in
            switch result {
            case .success:
                XCTFail()
            case let .failure(error):
                XCTAssertEqual(error, .networkError(message: ""))
            }
        }
    }

    func testRemoveLabelSuccess() {
        let useCase = MileStoneListUseCase(networkService: MockSuccessMileStoneListNetworkService(mileStones: mileStones))
        useCase.removeMileStone(for: 1) { error in
            XCTAssertNil(error)
        }
    }

    func testRemoveLabelFailure() {
        let useCase = MileStoneListUseCase(networkService: MockFailureNetworkService())
        useCase.removeMileStone(for: 1) { error in
            XCTAssertEqual(error, .networkError(message: ""))
        }
    }
}
