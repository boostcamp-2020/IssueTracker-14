//
//  IssueListEndPoint.swift
//  IssueTracker
//
//  Created by TTOzzi on 2020/11/04.
//

import Foundation

struct IssueListEndPoint: RequestType {
    
    enum Path: CustomStringConvertible {
        case issues
        case closed(id: Int)
        
        var description: String {
            switch self {
            case .issues:
                return "/issues"
            case let .closed(id):
                return "/issues/\(id)"
            }
        }
    }
    
    let baseURL: String = "http://115.85.183.106:3000/api"
    let path: Path
    var url: URL? {
        return URL(string: "\(baseURL)\(path)")
    }
    let method: RequestMethod
    let body: Data?
    
    init(path: Path, method: RequestMethod, body: Data? = nil) {
        self.path = path
        self.method = method
        self.body = body
    }
}
