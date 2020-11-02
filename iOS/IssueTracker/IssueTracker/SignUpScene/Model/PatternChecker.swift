//
//  PatternChecker.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/10/29.
//

import Foundation

final class PatternChecker {

    var password: String = ""
    
    public func isValid(email: String) -> Bool {
        return email.isEmailPattern()
    }
    
    public func isValid(passWord: String) -> Bool {
        return passWord.isPasswordPattern()
    }
    
    public func isValid(passWordCheck: String) -> Bool {
        return passWordCheck == password
    }
    
    public func isValid(nickName: String) -> Bool {
        return nickName.isNickNamePattern()
    }
}
