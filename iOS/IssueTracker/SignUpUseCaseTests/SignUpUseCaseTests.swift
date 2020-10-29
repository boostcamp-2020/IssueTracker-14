//
//  SignUpUseCaseTests.swift
//  SignUpUseCaseTests
//
//  Created by 최동규 on 2020/10/29.
//

import XCTest
@testable import IssueTracker

final class SignUpUseCaseTests: XCTestCase {

    struct MockSuccessNetworkService: NetworkServiceProviding {
        func request(requestType: RequestType, completionHandler: @escaping (Result<Data, NetworkError>) -> Void) {
            completionHandler(.success(Data()))
        }
    }
    
    struct MockFailureNetworkService: NetworkServiceProviding {
        func request(requestType: RequestType, completionHandler: @escaping (Result<Data, NetworkError>) -> Void) {
            completionHandler(.failure(.invalidData))
        }
        
    }
    
    let signUpInfo = SignUpInfo(email: "test@naver.com",
                                password1: "123456",
                                password2: "123456",
                                nickname: "dochoi")
    
    func testSingUpSuccess() {
        let useCase = SignUpUseCase(networkService: MockSuccessNetworkService())
        useCase.signUp(with: signUpInfo) { error in
            XCTAssertNil(error)
        }
    }
    
    func testSingUpFailure() {
        let useCase = SignUpUseCase(networkService: MockFailureNetworkService())
        useCase.signUp(with: signUpInfo) { error in
            XCTAssertNotNil(error)
        }
    }
}
