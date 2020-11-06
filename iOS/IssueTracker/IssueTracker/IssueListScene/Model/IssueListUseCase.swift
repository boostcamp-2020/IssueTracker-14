//
//  IssueListUseCase.swift
//  IssueTracker
//
//  Created by TTOzzi on 2020/11/04.
//

import Foundation

enum IssueListUseCaseError: Error {
    case decodingError
    case networkError(message: String)
    case encodingError
}

protocol IssueListUseCaseType {
    func loadList(completion: @escaping (Result<[Issue], IssueListUseCaseError>) -> Void)
    func closeIssue(with id: Int, completion: @escaping (IssueListUseCaseError?) -> Void)
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
                completion(.failure(.networkError(message: error.localizedDescription)))
            }
        }
    }
    
    func closeIssue(with id: Int, completion: @escaping (IssueListUseCaseError?) -> Void) {
        let requestBody = ["status": "closed"]
        guard let data = try? JSONEncoder().encode(requestBody) else {
            completion(.encodingError)
            return
        }
        let request = IssueListEndPoint(path: .closed(id: id), method: .put, body: data)
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
