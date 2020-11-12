//
//  MileStoneUseCaseType.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/12.
//

import Foundation

protocol MileStoneUseCaseType {
    func save(mileStone: MileStone, completion: @escaping (UseCaseError?) -> Void)
}

struct MileStoneEditUseCase: MileStoneUseCaseType {
    
    private let networkService: NetworkServiceProviding
    
    init(networkService: NetworkServiceProviding) {
        self.networkService = networkService
    }
    
    func save(mileStone: MileStone, completion: @escaping (UseCaseError?) -> Void) {
        let info: [String: String?] = [
            "title": mileStone.title,
            "duedate": mileStone.duedate?.inverseCustomDateFormat(format: "yyyy-MM-dd"),
            "description": mileStone.description
        ]
        guard let data = try? JSONEncoder().encode(info) else {
            completion(.encodingError)
            return
        }
        let request = MileStoneEndPoint(path: .milestone(id: mileStone.id), method: .put, body: data)
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

struct MileStoneCreateUseCase: MileStoneUseCaseType {
    
    private let networkService: NetworkServiceProviding
    
    init(networkService: NetworkServiceProviding) {
        self.networkService = networkService
    }
    
    func save(mileStone: MileStone, completion: @escaping (UseCaseError?) -> Void) {
        let info = [
            "title": mileStone.title,
            "duedate": mileStone.duedate?.inverseCustomDateFormat(format: "yyyy-MM-dd"),
            "description": mileStone.description
        ]
        guard let data = try? JSONEncoder().encode(info) else {
            completion(.encodingError)
            return
        }
        let request = MileStoneEndPoint(path: .milestones, method: .post, body: data)
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
