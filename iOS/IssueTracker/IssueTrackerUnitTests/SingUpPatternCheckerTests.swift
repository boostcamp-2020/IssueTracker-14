//
//  PatternCheckerTests.swift
//  IssueListUseCaseTests
//
//  Created by 최동규 on 2020/11/05.
//

import XCTest
@testable import IssueTracker

final class SingUpPatternCheckerTests: XCTestCase {
    
    let patternChecker: SignUpPatternChecker = SignUpPatternChecker()
    
    func testVaildId() {
        XCTAssertTrue(patternChecker.isValid(email: "test@gmail.com"))
    }
    
    func testInvaildId() {
        XCTAssertFalse(patternChecker.isValid(email: "test"))
    }
    
    func testVaildPassword() {
        XCTAssertTrue(patternChecker.isValid(passWord: "testtest"))
    }
    
    func testInvaildPassword() {
        XCTAssertFalse(patternChecker.isValid(passWord: "test"))
    }
    
    func testSamePasswordword() {
        _ = patternChecker.isValid(passWord: "test")
        XCTAssertTrue(patternChecker.isValid(passwordCheck: "test"))
    }
    
    func testDifferentPasswordword() {
        _ = patternChecker.isValid(passWord: "test")
        XCTAssertFalse(patternChecker.isValid(passwordCheck: "testtest"))
    }
    
    func testVaildNickName() {
        XCTAssertTrue(patternChecker.isValid(nickName: "test"))
    }
    
    func testInvaildNickName() {
        XCTAssertFalse(patternChecker.isValid(nickName: "t"))
    }
}
