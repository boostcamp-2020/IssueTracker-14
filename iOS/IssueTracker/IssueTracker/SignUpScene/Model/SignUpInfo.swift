//
//  SignUpInfo.swift
//  IssueTracker
//
//  Created by TTOzzi on 2020/10/29.
//

import Foundation

struct SignUpInfo: Encodable {
    
    var email: String?
    var password: String?
    var passwordConfirm: String?
    var nickname: String?
}
