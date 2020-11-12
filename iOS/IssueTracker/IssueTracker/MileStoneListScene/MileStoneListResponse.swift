//
//  MileStoneListResponse.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/12.
//

import Foundation

struct MileStoneListResponse: Decodable {
    let mileStones: [MileStone]
    enum CodingKeys: String, CodingKey {
        case mileStones = "milestones"
    }
}

struct MileStoneResponse: Decodable {
    let mileStone: MileStone
    enum CodingKeys: String, CodingKey {
        case mileStone = "milestone"
    }
}
