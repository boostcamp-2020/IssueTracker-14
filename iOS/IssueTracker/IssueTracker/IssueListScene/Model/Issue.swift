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

struct Comment: Decodable, Hashable {
    let writer: String
    let createdAt: String
    let content: String
}

struct MileStone: Decodable, Hashable {
    let id: Int
    let title: String
}

// 임시 데이터
struct IssueDetail: Decodable, Hashable {
    let id: Int
    let title: String
    let status: String
    let mileStone: MileStone?
    let comments: [Comment]
    let description: String?
    
    enum CodingKeys: String, CodingKey {
        case id
        case title
        case status
        case comments
        case mileStone = "milestone"
        case description
    }
}
