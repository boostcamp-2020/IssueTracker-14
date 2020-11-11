//
//  MileStone.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/11.
//

import Foundation

struct MileStone: Decodable, Hashable {
    let id: Int
    let title: String
    let status: String?
    let description: String?
    let createAt: String?
    let duedate: String?
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
}
