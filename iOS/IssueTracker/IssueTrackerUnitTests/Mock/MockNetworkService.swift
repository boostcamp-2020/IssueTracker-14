//
//  MockNetworkService.swift
//  IssueTrackerUnitTests
//
//  Created by 최동규 on 2020/11/05.
//

import Foundation
@testable import IssueTracker

struct MockFailureNetworkService: NetworkServiceProviding {
    var userToken: String?
    
    func request(requestType: RequestType, completionHandler: @escaping (Result<Data, NetworkError>) -> Void) {
        completionHandler(.failure(.invalidData))
    }
    
}
