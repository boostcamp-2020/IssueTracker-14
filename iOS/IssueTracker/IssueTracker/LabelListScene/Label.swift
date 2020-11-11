//
//  Label.swift
//  IssueTracker
//
//  Created by TTOzzi on 2020/11/10.
//

import Foundation

struct Label: Hashable, Decodable {
    let id: Int
    let title: String
    let color: String
    let description: String?
}
