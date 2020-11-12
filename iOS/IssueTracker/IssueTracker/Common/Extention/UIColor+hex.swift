//
//  UIColor+hex.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/11.
//

import UIKit

extension UIColor {
    var isDarkness: Bool {
        return cgColor.components?[0...2].reduce(0, +) ?? 0 < 0.8
    }
    
    convenience init?(from hex: String) {
        guard hex.count == 7 else { return nil }
        var hexDigit = hex.uppercased()
        hexDigit.removeFirst()
        guard !hexDigit.isEmpty,
              hexDigit.allSatisfy({ $0.isHexDigit }),
              let result = Int(hexDigit, radix: 16) else { return nil }
        var red, blue, green: CGFloat
        red = CGFloat(result / 256 / 256) / 255
        blue = CGFloat(result / 256 % 256) / 255
        green = CGFloat(result % 256) / 255
        self.init(red: red, green: blue, blue: green, alpha: 1)
    }
}
