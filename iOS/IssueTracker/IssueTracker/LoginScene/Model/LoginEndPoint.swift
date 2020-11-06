//
//  LoginEndPoint.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/02.
//

import Foundation

struct LoginEndPoint: RequestType {
    
    enum Path: String {
        case local = "/login"
        case apple = "/oAuth/apple"
    }
    
    let baseURL: String = "http://115.85.183.106:3000/api/user"
    let path: Path
    var url: URL? {
        return URL(string: "\(baseURL)\(path.rawValue)")
    }
    let method: RequestMethod = .post
    let body: Data?
}
