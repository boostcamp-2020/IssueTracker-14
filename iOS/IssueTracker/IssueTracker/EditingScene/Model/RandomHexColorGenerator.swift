//
//  RandomHexColorGenerator.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/11.
//

import Foundation

final class RandomHexColorGenerator {
    
    static func generate() -> String {
        let hexDigit = "0123456789ABCDEF"
        let newValue = String((0..<6).compactMap({_ in hexDigit.randomElement()}))
        return "#\(newValue)"
    }
    
    static func generateExcept(for current: String) -> String? {
        guard !current.isEmpty,
              current.first == "#",
              current.count == 7,
              current.enumerated().allSatisfy({ $0 == 0 || $1.isHexDigit }) else { return nil }
        let uppercasedCurrent = current.uppercased()
        let result = generate()
        return result == uppercasedCurrent ? generateExcept(for: uppercasedCurrent) : result
    }
}
