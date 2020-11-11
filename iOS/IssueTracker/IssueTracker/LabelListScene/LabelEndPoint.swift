//
//  LabelEndPoint.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/11.
//

import Foundation

struct LabelEndPoint: RequestType {
    
    enum Path: CustomStringConvertible {
        case labels
        
        var description: String {
            switch self {
            case .labels:
                return "/label"
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
