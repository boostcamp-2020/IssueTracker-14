//
//  SignUpUseCase.swift
//  IssueTracker
//
//  Created by TTOzzi on 2020/10/29.
//

import Foundation

enum SignUpUseCaseError: Error {
    case encodingError
    case networkError(message: String)
    
    var localizedDescription: String {
        switch self {
        case .encodingError:
            return "인코딩 에러"
        case let .networkError(message):
            return "회원가입 실패\(message)"
        }
    }
}

protocol SignUpUseCaseType {
    func signUp(with info: SignUpInfo, completion: @escaping (SignUpUseCaseError?) -> Void)
}

final class SignUpUseCase: SignUpUseCaseType {
    
    private let networkService: NetworkServiceProviding
    
    init(networkService: NetworkServiceProviding) {
        self.networkService = networkService
    }
    
    func signUp(with info: SignUpInfo, completion: @escaping (SignUpUseCaseError?) -> Void) {
        guard let data = try? JSONEncoder().encode(info) else {
            completion(.encodingError)
            return
        }
        let request = SignUpEndPoint(body: data)
        networkService.request(requestType: request) { result in
            switch result {
            case .success:
                completion(nil)
            case let .failure(error):
                completion(.networkError(message: error.localizedDescription))
            }
        }
    }
}
