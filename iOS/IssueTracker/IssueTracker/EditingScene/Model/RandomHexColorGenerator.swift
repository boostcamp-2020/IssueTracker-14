//
//  RandomHexColorGenerator.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/11.
//

import Foundation

final class RandomHexColorGenerator {
    
    func generateExcept(for current: String) -> String? {
        let hexDigit = "0123456789ABCDEF"
        guard !current.isEmpty,
              current.first == "#",
              current.count == 7,
              current.enumerated().allSatisfy({ $0 == 0 || $1.isHexDigit }) else { return nil }
        let uppercasedCurrent = current.uppercased()
        var newValue = ""
        for _ in 0..<6 {
            newValue.append(hexDigit[hexDigit.index(hexDigit.startIndex, offsetBy: Int.random(in: 0..<16))])
        }
        let result = "#\(newValue)"
        if result == uppercasedCurrent {
            return generateExcept(for: uppercasedCurrent)
        }
        return result
    }
}
