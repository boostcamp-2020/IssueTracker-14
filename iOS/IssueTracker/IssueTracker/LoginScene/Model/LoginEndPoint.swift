//
//  LoginEndPoint.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/02.
//

import Foundation

struct LoginEndPoint: RequestType {
    
    let url: URL? = URL(string: "http://115.85.183.106:3000/api/user/login")
    let method: RequestMethod = .post
    let body: Data?
}
