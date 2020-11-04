//
//  IssueListUseCase.swift
//  IssueTracker
//
//  Created by TTOzzi on 2020/11/04.
//

import Foundation

enum IssueListUseCaseError: Error {
    case decodingError
}

protocol IssueListUseCaseType {
    func loadList(completion: @escaping (Result<[Issue], IssueListUseCaseError>) -> Void)
}

struct IssueListUseCase: IssueListUseCaseType {
    
    private let networkService: NetworkServiceProviding
    
    init(networkService: NetworkServiceProviding) {
        self.networkService = networkService
    }
    
    func loadList(completion: @escaping (Result<[Issue], IssueListUseCaseError>) -> Void) {
        let request = IssueListEndPoint(path: .issues, method: .get)
        networkService.request(requestType: request) { result in
            switch result {
            case let .success(data):
                guard let response = try? JSONDecoder().decode(IssueResponse.self, from: data) else {
                    completion(.failure(.decodingError))
                    return
                }
                completion(.success(response.issues))
            case let .failure(error):
                break
            }
        }
    }
}
