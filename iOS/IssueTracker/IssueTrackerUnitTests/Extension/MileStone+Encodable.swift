//
//  MileStone+Encodable.swift
//  IssueTrackerUnitTests
//
//  Created by 최동규 on 2020/11/05.
//

import Foundation
@testable import IssueTracker

extension MileStone: Encodable {
    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encode(title, forKey: .title)
        try container.encode(status, forKey: .status)
        try container.encode(description, forKey: .description)
        try container.encode(createAt, forKey: .createAt)
        try container.encode(duedate, forKey: .duedate)
        try container.encode(updatedAt, forKey: .updatedAt)
    }
    
    enum CodingKeys: String, CodingKey {
        case id
        case title
        case status
        case description
        case createAt
        case duedate
        case updatedAt
    }
}
