//
//  NetworkServiceTests.swift
//  IssueTrackerUnitTests
//
//  Created by 최동규 on 2020/11/05.
//

import XCTest
@testable import IssueTracker

final class NetworkServiceTests: XCTestCase {
    
    func testSuccess() {
        let expectation = XCTestExpectation(description: "NetworkTaskExpectation")
        defer { wait(for: [expectation], timeout: 5.0)}
        let networkService = NetworkService()
        let request = IssueEndPoint(path: .issues, method: .get)
        networkService.userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJBQGIuYyIsIm5pY2tuYW1lIjoiQXNkZiIsImlhdCI6MTYwNDQ3ODg2N30.v0ZSPVEW3IyNMVVHPn2mHGUPGw7VeNpMJ3aechf62k4"
        
        networkService.request(requestType: request) { result in
            switch result {
            case let .success(data):
                let decoder = JSONDecoder()
                XCTAssertNoThrow(try? decoder.decode([Issue].self, from: data))
                expectation.fulfill()
            case let .failure(error):
                XCTFail("네트워크 서버 연결 실패\(error)")
            }
        }
    }
    
    func testFailureWithInvalidToken() {
        let expectation = XCTestExpectation(description: "NetworkTaskExpectation")
        defer { wait(for: [expectation], timeout: 5.0)}
        let networkService = NetworkService()
        let request = IssueEndPoint(path: .issues, method: .get)
        networkService.userToken = "fake"
        networkService.request(requestType: request) { result in
            switch result {
            case let .success(data):
                XCTFail("잘못된 토큰임에도 데이터가 받아와짐\(data)")
            case let .failure(error):
                XCTAssertEqual(error, .invalidResponse(msg: ""))
                expectation.fulfill()
            }
        }
    }
}

