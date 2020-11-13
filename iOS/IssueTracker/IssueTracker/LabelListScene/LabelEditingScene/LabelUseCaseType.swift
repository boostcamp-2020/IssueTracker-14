//
//  LabelUseCaseType.swift
//  IssueTracker
//
//  Created by TTOzzi on 2020/11/12.
//

import Foundation

protocol LabelUseCaseType {
    func save(label: Label, completion: @escaping (UseCaseError?) -> Void)
}

struct LabelEditUseCase: LabelUseCaseType {
    
    private let networkService: NetworkServiceProviding
    
    init(networkService: NetworkServiceProviding) {
        self.networkService = networkService
    }
    
    func save(label: Label, completion: @escaping (UseCaseError?) -> Void) {
        let info = [
            "title": label.title,
            "color": label.color,
            "description": label.description
        ]
        guard let data = try? JSONEncoder().encode(info) else {
            completion(.encodingError)
            return
        }
        let request = LabelEndPoint(path: .label(id: label.id), method: .put, body: data)
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

struct LabelCreateUseCase: LabelUseCaseType {
    
    private let networkService: NetworkServiceProviding
    
    init(networkService: NetworkServiceProviding) {
        self.networkService = networkService
    }
    
    func save(label: Label, completion: @escaping (UseCaseError?) -> Void) {
        let info = [
            "title": label.title,
            "color": label.color,
            "description": label.description
        ]
        guard let data = try? JSONEncoder().encode(info) else {
            completion(.encodingError)
            return
        }
        let request = LabelEndPoint(path: .labels, method: .post, body: data)
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
