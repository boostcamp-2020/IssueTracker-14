//
//  LoginUseCase.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/02.
//

import Foundation

protocol LoginUseCaseType {
    func login(with info: LocalLoginInfo, completion: @escaping (Result<LoginResponse, UseCaseError>) -> Void)
    func login(with appleInfo: AppleLoginInfo, completion: @escaping (Result<LoginResponse, UseCaseError>) -> Void)
}

final class LoginUseCase: LoginUseCaseType {
    
    private let networkService: NetworkServiceProviding
    
    init(networkService: NetworkServiceProviding) {
        self.networkService = networkService
    }

    func login(with localInfo: LocalLoginInfo,
               completion: @escaping (Result<LoginResponse, UseCaseError>) -> Void) {
        guard let data = try? JSONEncoder().encode(localInfo) else {
            completion(.failure(.encodingError))
            return
        }
        let request = LoginEndPoint(path: .local, body: data)
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
    
    func login(with appleInfo: AppleLoginInfo,
               completion: @escaping (Result<LoginResponse, UseCaseError>) -> Void) {
        guard let data = try? JSONEncoder().encode(appleInfo) else {
            completion(.failure(.encodingError))
            return
        }
        let request = LoginEndPoint(path: .apple, body: data)
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
