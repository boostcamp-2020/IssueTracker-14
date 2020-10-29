//
//  String+isPasswordPattern.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/10/29.
//

extension String {
    func isPasswordPattern() -> Bool {
        let validCount = 5
        return count >= validCount
    }
}
