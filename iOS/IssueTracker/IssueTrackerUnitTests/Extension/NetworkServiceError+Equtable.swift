//
//  NetworkServiceError+Equtable.swift
//  IssueTrackerUnitTests
//
//  Created by 최동규 on 2020/11/05.
//

import Foundation
@testable import IssueTracker

extension NetworkError: Equatable {
    public static func == (lhs: Self, rhs: Self) -> Bool {
        switch (lhs, rhs) {
        case (.invalidURL, .invalidURL):
            return true
        case (.requestFailed, .requestFailed):
            return true
        case (.invalidResponse, .invalidResponse):
            return true
        case (.invalidData, .invalidData):
            return true
        default:
            return false
        }
    }
}
