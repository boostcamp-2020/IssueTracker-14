//
//  MileStoneEndPoint.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/12.
//

import Foundation

struct MileStoneEndPoint: RequestType {
    
    enum Path: CustomStringConvertible {
        case milestones
        case milestone(id: Int)
        
        var description: String {
            switch self {
            case .milestones:
                return "/milestone"
            case let .milestone(id):
                return "/milestone/\(id)"
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
