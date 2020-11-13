//
//  LoginInfo.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/01.
//

import Foundation

struct LocalLoginInfo: Encodable {
    
    let email: String
    let password: String
}

struct AppleLoginInfo: Encodable {
    
    let email: String
    let name: String
    let hashcode: String
}
