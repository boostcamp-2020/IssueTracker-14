//
//  String+isEmailPattern.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/10/29.
//

import Foundation

extension String {
    func isEmailPattern() -> Bool {
        let emailPattern = "[a-zA-Z0-9\\+\\.\\_\\%\\-\\+]{1,256}" +
            "\\@" +
            "[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}" +
            "(" +
            "\\." +
            "[a-zA-Z0-9][a-zA-Z0-9\\-]{0,25}" +
        ")+"
        return NSPredicate(format: "SELF MATCHES %@", emailPattern)
            .evaluate(with: self)
    }
}
