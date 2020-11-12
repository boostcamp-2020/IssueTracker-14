//
//  LabelResponse.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/11.
//

import Foundation

struct LabelListResponse: Decodable {
    let labels: [Label]
}

struct LabelResponse: Decodable {
    let label: Label
}
