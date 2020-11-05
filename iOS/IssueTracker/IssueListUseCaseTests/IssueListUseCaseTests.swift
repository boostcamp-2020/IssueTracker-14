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
                                  mileStone: MileStone(id: 3, title: "마일스톤"), description: "내용"),
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
    
    struct MockFailureNetworkService: NetworkServiceProviding {
        var userToken: String?
        
        func request(requestType: RequestType, completionHandler: @escaping (Result<Data, NetworkError>) -> Void) {
            completionHandler(.failure(.invalidData))
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

extension IssueResponse: Encodable {
    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(issues, forKey: .issues)
    }

    enum CodingKeys: String, CodingKey {
        case issues
    }
}

extension Issue: Encodable {
    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(description, forKey: .description)
        try container.encode(id, forKey: .id)
        try container.encode(mileStone, forKey: .mileStone)
        try container.encode(status, forKey: .status)
        try container.encode(title, forKey: .title)
    }
}

extension MileStone: Encodable {
    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encode(title, forKey: .title)
    }
    
    enum CodingKeys: String, CodingKey {
        case id
        case title
    }
}

extension IssueListUseCaseError: Equatable {
    public static func == (lhs: Self, rhs: Self) -> Bool {
        switch (lhs, rhs) {
        case (.decodingError, .decodingError):
            return true
        case (.networkError, .networkError):
            return true
        case (.encodingError, .encodingError):
            return true
        default:
            return false
        }
    }
}
