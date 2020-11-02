//
//  LoginUseCase.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/02.
//

import Foundation

enum LoginUseCaseError: Error {
    case encodingError
    case networkError(message: String)
    case decodingError
}

protocol LoginUseCaseType {
    func login(with info: LoginInfo, completion: @escaping (Result<LoginResponse, LoginUseCaseError>) -> Void)
}

final class LoginUseCase: LoginUseCaseType {
    
    private let networkService: NetworkServiceProviding
    
    init(networkService: NetworkServiceProviding) {
        self.networkService = networkService
    }

    func login(with info: LoginInfo, completion: @escaping (Result<LoginResponse, LoginUseCaseError>) -> Void) {
        guard let data = try? JSONEncoder().encode(info) else {
            completion(.failure(.encodingError))
            return
        }
        let request = LoginEndPoint(body: data)
        networkService.request(requestType: request) { result in
            switch result {
            case let .success(data):
                guard let loginResponse = try? JSONDecoder().decode(LoginResponse.self, from: data) else {
                    completion(.failure(.decodingError))
                    return
                }
                completion(.success(loginResponse))
            case let .failure(error):
                completion(.failure(.networkError(message: error.localizedDescription)))
            }
        }
    }
}
