//
//  IssueListUseCaseTests.swift
//  IssueListUseCaseTests
//
//  Created by 최동규 on 2020/11/05.
//

import XCTest
@testable import IssueTracker

class IssueListUseCaseTests: XCTestCase {

    var issues: [Issue]  = [Issue(id: 1, title: "이슈 1", status: "open",
                                  mileStone: MileStone(id: 3, title: "마일스톤", status: nil, description: nil, createAt: nil, duedate: nil, updatedAt: nil), description: "내용"),
                            Issue(id: 2, title: "이슈 2", status: "open", mileStone: nil, description: nil),
                            Issue(id: 3, title: "이슈 3", status: "closed", mileStone: nil, description: "내용"),
                            Issue(id: 4, title: "이슈 4", status: "open", mileStone: nil, description: nil)]
    
    struct MockSuccessNetworkService: NetworkServiceProviding {
        var userToken: String?
        
        let issues: [Issue]
        func request(requestType: RequestType, completionHandler: @escaping (Result<Data, NetworkError>) -> Void) {
            let response = IssueResponse(issues: issues)
            let data = try? JSONEncoder().encode(response)
            completionHandler(.success(data!))
        }
    }
    
    func testLoadListSuccess() {
        let useCase = IssueListUseCase(networkService: MockSuccessNetworkService(issues: issues))
        useCase.loadList(completion: { result in
            switch result {
            case let .success(receivedIssues):
                XCTAssertEqual(receivedIssues, self.issues)
            case let .failure(error):
                XCTFail(error.localizedDescription)
            }
        })
    }

    func testLoadListFailure() {
    
        let useCase = IssueListUseCase(networkService: MockFailureNetworkService())
        useCase.loadList(completion: { result in
            switch result {
            case let .success(issue):
                XCTFail("서버에서 잘못된 데이터가 왔음에도 성공\n\(issue.description)")
            case let .failure(error):
                XCTAssertEqual(error, .networkError(message: ""))
            }
        })
    }

    func testCloseIssueSuccess() {
        let useCase = IssueListUseCase(networkService: MockSuccessNetworkService( issues: issues))
        useCase.closeIssue(with: 4) { error in
            XCTAssertNil(error)
        }
    }

    func testCloseIssueFailure() {
        let useCase = IssueListUseCase(networkService: MockFailureNetworkService())
        useCase.closeIssue(with: 4) { error in
            XCTAssertEqual(error, .networkError(message: ""))
        }
    }
}
