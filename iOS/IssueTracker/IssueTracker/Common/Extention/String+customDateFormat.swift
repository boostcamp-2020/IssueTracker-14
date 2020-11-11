//
//  String+customDateFormat.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/11.
//

import Foundation

extension String {
    func customDateFormat() -> String? {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
        guard let date = dateFormatter.date(from: self) else { return nil }
        dateFormatter.dateFormat = "yyyy년 M월 d일까지"
        return dateFormatter.string(from: date)
    }
}
