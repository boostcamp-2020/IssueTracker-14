//
//  Label.swift
//  IssueTracker
//
//  Created by TTOzzi on 2020/11/10.
//

import Foundation

struct Label: Hashable, Decodable {
    let id: Int
    var title: String
    var color: String
    var description: String?
    
    mutating func reset() {
        title = ""
        color = "#FFFFFF"
        description = nil
    }
}
