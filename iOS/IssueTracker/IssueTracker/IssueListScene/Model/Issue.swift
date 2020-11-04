//
//  Issue.swift
//  IssueTracker
//
//  Created by TTOzzi on 2020/11/04.
//

import Foundation

struct IssueResponse: Decodable {
    let issues: [Issue]
}

struct Issue: Decodable, Hashable {
    let id: Int
    let title: String
    let status: String
    let mileStone: MileStone?
    let description: String?
    
    enum CodingKeys: String, CodingKey {
        case id
        case title
        case status
        case mileStone = "milestone"
        case description
    }
}

struct MileStone: Decodable, Hashable {
    let id: Int
    let title: String
}
