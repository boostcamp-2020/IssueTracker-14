//
//  MileStone.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/11.
//

import Foundation

struct MileStone: Decodable, Hashable {
    let id: Int
    var title: String
    let status: String?
    var description: String?
    let createAt: String?
    var duedate: String?
    let updatedAt: String?
    
    init(id: Int, title: String, status: String?=nil, description: String?=nil,
         createAt: String?=nil, duedate: String?=nil, updatedAt: String?=nil) {
        self.id = id
        self.title = title
        self.status = status
        self.description = description
        self.createAt = createAt
        self.duedate = duedate
        self.updatedAt = updatedAt
    }
    
    mutating func reset() {
        title = ""
        duedate = nil
        description = nil
    }
    
    func customDuedate(format: String) -> String? {
        guard let duedate = duedate else { return nil }
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
        guard let date = dateFormatter.date(from: duedate) else { return nil }
        dateFormatter.dateFormat = format
        return dateFormatter.string(from: date)
    }
    
    func inverseCustomDate(format: String) -> String? {
        guard let duedate = duedate else { return nil }
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = format
        guard let date = dateFormatter.date(from: duedate) else { return nil }
        dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
        return dateFormatter.string(from: date)
    }
}
