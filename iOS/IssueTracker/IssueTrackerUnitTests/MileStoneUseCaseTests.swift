//
//  MileStoneUseCaseTests.swift
//  IssueTrackerUnitTests
//
//  Created by 최동규 on 2020/11/13.
//

import XCTest
@testable import IssueTracker

final class MileStoneUseCaseTests: XCTestCase {
        
        struct MockSuccessNetworkService: NetworkServiceProviding {
            var userToken: String? = nil
            
            func request(requestType: RequestType, completionHandler: @escaping (Result<Data, NetworkError>) -> Void) {
                completionHandler(.success(Data()))
            }
        }
        
        private let testMileStone = MileStone(id: 1, title: "test")
        
        func testMileStoneEditSuccess() {
            let useCase = MileStoneEditUseCase(networkService: MockSuccessNetworkService())
            useCase.save(mileStone: testMileStone) { error in
                XCTAssertNil(error)
            }
        }
        
        func testMileStoneEditFailure() {
            let useCase = MileStoneEditUseCase(networkService: MockFailureNetworkService())
            useCase.save(mileStone: testMileStone) { error in
                XCTAssertEqual(error, .networkError(message: ""))
            }
        }

        func testMileStoneCreateSuccess() {
            let useCase = MileStoneCreateUseCase(networkService: MockSuccessNetworkService())
            useCase.save(mileStone: testMileStone) { error in
                XCTAssertNil(error)
            }
        }

        func testLabelCreateFailure() {
            let useCase = MileStoneCreateUseCase(networkService: MockFailureNetworkService())
            useCase.save(mileStone: testMileStone) { error in
                XCTAssertEqual(error, .networkError(message: ""))
            }
        }
    }

