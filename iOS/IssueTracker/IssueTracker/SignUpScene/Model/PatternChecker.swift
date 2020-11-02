//
//  PatternChecker.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/10/29.
//

import Foundation

final class PatternChecker {
    
    private(set) var info: SignUpInfo? = SignUpInfo()
    var isComplete: Bool {
        return isValid(email: info?.email) &&
            isValid(passWord: info?.password1) &&
            isValid(passwordCheck: info?.password2) &&
            isValid(nickName: info?.nickname)
    }
    
    func isValid(email: String?) -> Bool {
        info?.email = email
        return email?.isEmailPattern() ?? false
    }
    
    func isValid(passWord: String?) -> Bool {
        info?.password1 = passWord
        return passWord?.isPasswordPattern() ?? false
    }
    
    func isValid(passwordCheck: String?) -> Bool {
        if let passwordCheck = passwordCheck {
            info?.password2 = passwordCheck
        }
        return info?.password2 == info?.password1
    }
    
    func isValid(nickName: String?) -> Bool {
        info?.nickname = nickName
        return nickName?.isNickNamePattern() ?? false
    }
}
