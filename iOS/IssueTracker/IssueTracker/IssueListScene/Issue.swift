//
//  Issue.swift
//  IssueTracker
//
//  Created by TTOzzi on 2020/11/04.
//

import Foundation

struct Issue {
    let id: Int
    let title: String
    let description: String
}

extension Issue: Hashable { }
