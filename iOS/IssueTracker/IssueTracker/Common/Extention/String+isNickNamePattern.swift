//
//  String+isNickNamePattern.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/10/29.
//

extension String {
    func isNickNamePattern() -> Bool {
        let validCount = 2
        return self.count == validCount
    }
}
