//
//  PatternCheckerTests.swift
//  PatternCheckerTests
//
//  Created by TTOzzi on 2020/10/29.
//

import XCTest
@testable import IssueTracker

final class PatternCheckerTests: XCTestCase {
    
    let patternChecker: PatternChecker = PatternChecker()
    
    func testVaildId() {
        XCTAssertTrue(patternChecker.isValid(id: "test@gmail.com"))
    }
    
    func testInvaildId() {
        XCTAssertFalse(patternChecker.isValid(id: "test"))
    }
    
    func testVaildPassword() {
        XCTAssertTrue(patternChecker.isValid(passWord: "testtest"))
    }
    
    func testInvaildPassword() {
        XCTAssertFalse(patternChecker.isValid(passWord: "test"))
    }
    
    func testSamePasswordword() {
        patternChecker.password = "test"
        XCTAssertTrue(patternChecker.isValid(passWordCheck: "test"))
    }
    
    func testDifferentPasswordword() {
        patternChecker.password = "test"
        XCTAssertFalse(patternChecker.isValid(passWordCheck: "testtest"))
    }
    
    func testVaildNickName() {
        XCTAssertTrue(patternChecker.isValid(nickName: "test"))
    }
    
    func testInvaildNickName() {
        XCTAssertFalse(patternChecker.isValid(nickName: "t"))
    }
}
