//
//  UseCaseError.swift
//  IssueTracker
//
//  Created by TTOzzi on 2020/11/09.
//

import Foundation

enum UseCaseError: Error {
    case encodingError
    case decodingError
    case networkError(message: String)
    
    var localizedDescription: String {
        switch self {
        case .encodingError:
            return "인코딩 에러"
        case .decodingError:
            return "디코딩 에러"
        case let .networkError(message):
            return "네트워크 에러\n\(message)"
        }
    }
}
