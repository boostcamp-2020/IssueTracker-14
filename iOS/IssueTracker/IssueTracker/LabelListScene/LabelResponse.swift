//
//  LabelResponse.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/11.
//

import Foundation

struct LabelResponse: Decodable {
    let labels: [Label]
}
