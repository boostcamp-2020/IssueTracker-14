//
//  SignUpInfo.swift
//  IssueTracker
//
//  Created by TTOzzi on 2020/10/29.
//

import Foundation

struct SignUpInfo: Encodable {
    
    let email: String
    let password1: String
    let password2: String
    let nickname: String
}
