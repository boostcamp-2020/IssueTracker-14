//
//  SignUpEndPoint.swift
//  IssueTracker
//
//  Created by TTOzzi on 2020/10/29.
//

import Foundation

struct SignUpEndPoint: RequestType {
    
    let url: URL? = URL(string: "api/user/signup")
    let method: RequestMethod = .post
    let body: Data?
}
