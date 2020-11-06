//
//  NetworkService.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/10/28.
//

import Foundation

protocol NetworkServiceProviding {
    var userToken: String? { get set }
    func request(requestType: RequestType, completionHandler: @escaping (Result<Data, NetworkError>) -> Void)
}

enum NetworkError: Error {
    case invalidURL
    case requestFailed(msg: String)
    case invalidResponse(msg: String)
    case invalidData
}

final class NetworkService: NetworkServiceProviding {
    
    private let session: URLSession
    var userToken: String?
    
    init(session: URLSession = .shared) {
        self.session = session
    }
    
    func request(requestType: RequestType, completionHandler: @escaping (Result<Data, NetworkError>) -> Void) {
        guard let url = requestType.url else {
            completionHandler(.failure(.invalidURL))
            return
        }
        var urlRequest = URLRequest(url: url)
        urlRequest.httpMethod = requestType.method.rawValue
        urlRequest.httpBody = requestType.body
        urlRequest.setValue("application/json", forHTTPHeaderField: "Content-Type")
        if let userToken = userToken {
            urlRequest.setValue("bearer \(userToken)", forHTTPHeaderField: "Authorization")
        }
        session.dataTask(with: urlRequest) { (data, response, error) in
            if let error = error {
                completionHandler(.failure(.requestFailed(msg: error.localizedDescription)))
                return
            }
            if let response = response as? HTTPURLResponse,
                  !(200...299).contains(response.statusCode) {
                completionHandler(.failure(.invalidResponse(msg: String(response.statusCode))))
                return
            }
            guard let data = data else {
                completionHandler(.failure(.invalidData))
                return
            }
            completionHandler(.success(data))
        }.resume()
    }
}
