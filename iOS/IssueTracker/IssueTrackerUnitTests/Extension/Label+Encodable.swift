//
//  Label+Encodable.swift
//  IssueTrackerUnitTests
//
//  Created by TTOzzi on 2020/11/12.
//

import Foundation
@testable import IssueTracker

extension LabelListResponse: Encodable {
    enum CodingKeys: String, CodingKey {
        case labels
    }
    
    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(labels, forKey: .labels)
    }
}

extension LabelResponse: Encodable {
    enum CodingKeys: String, CodingKey {
        case label
    }
    
    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(label, forKey: .label)
    }
}

extension Label: Encodable {
    enum CodingKeys: String, CodingKey {
        case id
        case title
        case color
        case description
    }
    
    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encode(title, forKey: .title)
        try container.encode(color, forKey: .color)
        try container.encode(description, forKey: .description)
    }
}
