//
//  NetworkRequest.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/10/29.
//

import Foundation

enum RequestMethod: String {
    case get = "GET"
    case post = "POST"
}

protocol RequestType {
    var url: URL? { get }
    var method: RequestMethod { get }
    var body: Data? { get }
}
