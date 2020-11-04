//
//  IssueListUseCaseTests.swift
//  IssueListUseCaseTests
//
//  Created by 최동규 on 2020/11/05.
//

import XCTest
@testable import IssueTracker

class IssueListUseCaseTests: XCTestCase {

    static var issues: [Issue] {
        let issue1 = Issue(id: 1, title: "이슈 1", status: "open",
                           mileStone: MileStone(id: 3, title: "마일스톤"), description: "내용")
        let issue2 = Issue(id: 2, title: "이슈 2", status: "open", mileStone: nil, description: nil)
        let issue3 = Issue(id: 3, title: "이슈 3", status: "closed", mileStone: nil, description: "내용")
        let issue4 = Issue(id: 4, title: "이슈 4", status: "open", mileStone: nil, description: nil)
        return [issue1, issue2, issue3, issue4]
    }
    
    struct MockSuccessNetworkService: NetworkServiceProviding {
        var userToken: String?
        
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
        let useCase = IssueListUseCase(networkService: MockSuccessNetworkService())
        useCase.loadList(completion: { result in
            switch result {
            case let .success(issues):
                XCTAssertEqual(issues, IssueListUseCaseTests.issues)
            case let .failure(error):
                XCTFail(error.localizedDescription)
            }
        })
    }

    func testLoadListFailure() {
    
        let useCase = IssueListUseCase(networkService: MockFailureNetworkService())
        useCase.loadList(completion: { result in
            switch result {
            case let .success(issues):
                XCTFail("서버에서 잘못된 데이터가 왔음에도 성공")
            case let .failure(error):
                XCTAssertEqual(error, .networkError(message: ""))
            }
        })
    }

    func testCloseIssueSuccess() {
        let useCase = IssueListUseCase(networkService: MockSuccessNetworkService())
        useCase.closeIssue(with: 4) { error in
            XCTAssertNil(error)
        }
    }

    func testCloseIssueFailure() {
        let useCase = IssueListUseCase(networkService: MockFailureNetworkService())
        useCase.closeIssue(with: 4) { error in
            XCTAssertNotNil(error)
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
