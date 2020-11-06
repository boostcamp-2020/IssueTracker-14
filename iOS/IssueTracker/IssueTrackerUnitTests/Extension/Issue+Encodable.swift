//
//  Issue+Encodable.swift
//  IssueTrackerUnitTests
//
//  Created by 최동규 on 2020/11/05.
//

import Foundation
@testable import IssueTracker

extension Issue: Encodable {
    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(description, forKey: .description)
        try container.encode(id, forKey: .id)
        try container.encode(mileStone, forKey: .mileStone)
        try container.encode(status, forKey: .status)
        try container.encode(title, forKey: .title)
    }
}
