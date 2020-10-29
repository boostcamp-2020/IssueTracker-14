//
//  PatternChecker.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/10/29.
//

import Foundation

final class PatternChecker {

    var password: String = ""
    
    enum Form {
        case identifierName,
             password,
             passwordCheck,
             nickName
        }
    
    func isValid(str: String, form: PatternChecker.Form) -> Bool {
        switch form {
        case .identifierName:
            return isValidID(str)
        case .password:
            return isValidPassWord(str)
        case .passwordCheck:
            return isValidPassWordCheck(str)
        case .nickName:
            return isValidNickName(str)
        }
    }

    private func isValidID(_ str: String) -> Bool {
        return str.isEmailPattern()
    }

    private func isValidPassWord(_ str: String) -> Bool {
        return str.isPasswordPattern()
    }

    private func isValidPassWordCheck(_ str: String) -> Bool {
        return str == password
    }

    private func isValidNickName(_ str: String) -> Bool {
        return str.isNickNamePattern()
    }
}
