//
//  SignUpUseCase.swift
//  IssueTracker
//
//  Created by TTOzzi on 2020/10/29.
//

import Foundation

protocol SignUpUseCaseType {
    func signUp(with info: SignUpInfo, completion: @escaping (UseCaseError?) -> Void)
}

final class SignUpUseCase: SignUpUseCaseType {
    
    private let networkService: NetworkServiceProviding
    
    init(networkService: NetworkServiceProviding) {
        self.networkService = networkService
    }
    
    func signUp(with info: SignUpInfo, completion: @escaping (UseCaseError?) -> Void) {
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
