//
//  MileStone.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/11.
//

import Foundation

struct MileStone: Codable, Hashable {
    let id: Int
    let title: String
    let status: String?
    let description: String?
    let createAt: String?
    let duedate: String?
    let updatedAt: String?
}
