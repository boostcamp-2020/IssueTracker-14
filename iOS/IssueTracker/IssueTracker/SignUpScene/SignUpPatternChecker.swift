//
//  PatternChecker.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/10/29.
//

import Foundation

final class SignUpPatternChecker {
    
    private(set) var info: SignUpInfo = SignUpInfo()
    var isComplete: Bool {
        return isValid(email: info.email) &&
            isValid(passWord: info.password) &&
            isValid(passwordCheck: info.passwordConfirm) &&
            isValid(nickName: info.nickname)
    }
    
    func isValid(email: String?) -> Bool {
        info.email = email
        return email?.isEmailPattern() ?? false
    }
    
    func isValid(passWord: String?) -> Bool {
        info.password = passWord
        return passWord?.isPasswordPattern() ?? false
    }
    
    func isValid(passwordCheck: String?) -> Bool {
        if let passwordCheck = passwordCheck {
            info.passwordConfirm = passwordCheck
        }
        return info.passwordConfirm == info.password
    }
    
    func isValid(nickName: String?) -> Bool {
        info.nickname = nickName
        return nickName?.isNickNamePattern() ?? false
    }
}
