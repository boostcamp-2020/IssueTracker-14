//
//  IssueListUseCase.swift
//  IssueTracker
//
//  Created by TTOzzi on 2020/11/04.
//

import Foundation

protocol IssueListUseCaseType {
    func loadList(completion: @escaping (Result<[Issue], UseCaseError>) -> Void)
    func closeIssue(with id: Int, completion: @escaping (UseCaseError?) -> Void)
    func loadDetail(with id: Int, completion: @escaping (Result<IssueDetail, UseCaseError>) -> Void)
}

struct IssueListUseCase: IssueListUseCaseType {
    
    private let networkService: NetworkServiceProviding
    
    init(networkService: NetworkServiceProviding) {
        self.networkService = networkService
    }
    
    func loadList(completion: @escaping (Result<[Issue], UseCaseError>) -> Void) {
        let request = IssueEndPoint(path: .issues, method: .get)
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
    
    func closeIssue(with id: Int, completion: @escaping (UseCaseError?) -> Void) {
        let requestBody = ["status": "closed"]
        guard let data = try? JSONEncoder().encode(requestBody) else {
            completion(.encodingError)
            return
        }
        let request = IssueEndPoint(path: .closed(id: id), method: .put, body: data)
        networkService.request(requestType: request) { result in
            switch result {
            case .success:
                completion(nil)
            case let .failure(error):
                completion(.networkError(message: error.localizedDescription))
            }
        }
    }
    
    func loadDetail(with id: Int, completion: @escaping (Result<Issue, UseCaseError>) -> Void) {
        let request = IssueEndPoint(path: .detail(id: id), method: .get)
        networkService.request(requestType: request) { result in
            switch result {
            case let .success(data):
                guard let issue = try? JSONDecoder().decode(Issue.self, from: data) else {
                    completion(.failure(.decodingError))
                    return
                }
                completion(.success(issue))
            case let .failure(error):
                completion(.failure(.networkError(message: error.localizedDescription)))
            }
        }
    }
    
    func loadDetail(with id: Int, completion: @escaping (Result<IssueDetail, UseCaseError>) -> Void) {
        let issue = IssueDetail(id: 11,
                          title: "이슈 생성 기능",
                          status: "Open",
                          mileStone: nil,
                          comments: [
                            Comment(writer: "godrm", createdAt: "16 minutes ago", content: "레이블 전체 목록을 볼 수 있는게 어떨까요\n전체 설명이 보여야 선택할 수 있으니까\n\n마크다운 문법을 지원하고\nHTML형태로 보여줘야 할까요"),
                            Comment(writer: "crong", createdAt: "16 minutes ago", content: "긍정적인 기능이네요\n댓글은 두줄"),
                            Comment(writer: "honux", createdAt: "16 minutes ago", content: "굿")
                          ],
                          description: nil)
        completion(.success(issue))
    }
}
