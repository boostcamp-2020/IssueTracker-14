//
//  LoginUseCaseError+Equatable.swift
//  IssueTrackerUnitTests
//
//  Created by 최동규 on 2020/11/05.
//

import Foundation
@testable import IssueTracker

extension UseCaseError: Equatable {
    public static func == (lhs: Self, rhs: Self) -> Bool {
        switch (lhs, rhs) {
        case (.decodingError, .decodingError):
            return true
        case (.networkError, .networkError):
            return true
        case (.encodingError, .encodingError):
            return true
        default:
            return false
        }
    }
}
