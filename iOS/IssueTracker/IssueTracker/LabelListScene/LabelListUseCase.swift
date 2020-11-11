//
//  LabelListUseCase.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/11.
//

import Foundation


protocol LabelListUseCaseType {
    func loadList(completion: @escaping (Result<[Label], UseCaseError>) -> Void)
}

struct LabelListUseCase: LabelListUseCaseType {
    
    private let networkService: NetworkServiceProviding
    
    init(networkService: NetworkServiceProviding) {
        self.networkService = networkService
    }
    
    func loadList(completion: @escaping (Result<[Label], UseCaseError>) -> Void) {
        let request = LabelEndPoint(path: .labels, method: .get)
        networkService.request(requestType: request) { result in
            switch result {
            case let .success(data):
                guard let response = try? JSONDecoder().decode(LabelResponse.self, from: data) else {
                    completion(.failure(.decodingError))
                    return
                }
                completion(.success(response.labels))
            case let .failure(error):
                completion(.failure(.networkError(message: error.localizedDescription)))
            }
        }
    }
}
