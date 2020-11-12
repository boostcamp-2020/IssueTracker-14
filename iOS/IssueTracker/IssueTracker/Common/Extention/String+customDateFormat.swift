//
//  String+customDateFormat.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/11.
//

import Foundation

extension String {
    func customDateFormat(format: String) -> String? {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
        guard let date = dateFormatter.date(from: self) else { return nil }
        dateFormatter.dateFormat = format
        return dateFormatter.string(from: date)
    }
    
    func inverseCustomDateFormat(format: String) -> String? {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = format
        guard let date = dateFormatter.date(from: self) else { return nil }
        dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
        return dateFormatter.string(from: date)
    }
}
