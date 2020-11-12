//
//  MileStoneListUsecase.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/12.
//

import Foundation

protocol MileStoneListUseCaseType {
    func loadList(completion: @escaping (Result<[MileStone], UseCaseError>) -> Void)
    func loadMileStone(for id: Int, completion: @escaping (Result<MileStone, UseCaseError>) -> Void)
    func removeMileStone(for id: Int, completion: @escaping (UseCaseError?) -> Void)
}

struct MileStoneListUseCase: MileStoneListUseCaseType {
    
    private let networkService: NetworkServiceProviding
    
    init(networkService: NetworkServiceProviding) {
        self.networkService = networkService
    }
    
    func loadList(completion: @escaping (Result<[MileStone], UseCaseError>) -> Void) {
        let request = MileStoneEndPoint(path: .milestones, method: .get)
        networkService.request(requestType: request) { result in
            switch result {
            case let .success(data):
                guard let response = try? JSONDecoder().decode(MileStoneListResponse.self, from: data) else {
                    completion(.failure(.decodingError))
                    return
                }
                completion(.success(response.mileStones))
            case let .failure(error):
                completion(.failure(.networkError(message: error.localizedDescription)))
            }
        }
    }
    
    func loadMileStone(for id: Int, completion: @escaping (Result<MileStone, UseCaseError>) -> Void) {
        let request = MileStoneEndPoint(path: .milestone(id: id), method: .get)
        networkService.request(requestType: request) { result in
            switch result {
            case let .success(data):
                guard let response = try? JSONDecoder().decode(MileStoneResponse.self, from: data) else {
                    completion(.failure(.decodingError))
                    return
                }
                completion(.success(response.mileStone))
            case let .failure(error):
                completion(.failure(.networkError(message: error.localizedDescription)))
            }
        }
    }
    
    func removeMileStone(for id: Int, completion: @escaping (UseCaseError?) -> Void) {
        let request = MileStoneEndPoint(path: .milestone(id: id), method: .delete)
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
