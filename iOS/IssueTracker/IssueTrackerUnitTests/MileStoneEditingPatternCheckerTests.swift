//
//  MileStoneEditPatternCheckerTests.swift
//  IssueTrackerUnitTests
//
//  Created by 최동규 on 2020/11/13.
//

import XCTest
@testable import IssueTracker

final class MileStoneEditingPatternCheckerTests: XCTestCase {

    let patternChecker: MileStoneEditingPatternChecker = MileStoneEditingPatternChecker()
    
    func testVaildDate() {
        let result = patternChecker.isValid(duedate: "2030-10-10")
        switch result {
        case let .failure(error):
            XCTFail("올바른 데이터임에도 실패\(error)")
        default:
            break
        }
    }
    
    func testInValidDateOfPast() {
        let result = patternChecker.isValid(duedate: "2010-10-10")
        switch result {
        case .success:
            XCTFail("과거날짜임에도 성공")
        default:
            break
        }
    }
    
    func testInValidDateOfMonth() {
        let result = patternChecker.isValid(duedate: "2022-13-10")
        switch result {
        case .success:
            XCTFail("이상한 날짜임에도 성공")
        default:
            break
        }
    }
    
    func testInValidDateOfDay() {
        let result = patternChecker.isValid(duedate: "2022-12-40")
        switch result {
        case .success:
            XCTFail("이상한 날짜임에도 성공")
        default:
            break
        }
    }
    
    func testCompleteSuccess() {
        let mileStone = MileStone(id: 1, title: "haha", duedate: "2024-11-23")
        let result = patternChecker.isComplete(mileStone: mileStone)
        XCTAssertTrue(result)
    }

    func testCompleteFailureOfInValidDuedate1() {
        let mileStone = MileStone(id: 1, title: "haha", duedate: "2019-11-23")
        let result = patternChecker.isComplete(mileStone: mileStone)
        XCTAssertFalse(result)
    }
    
    func testCompleteFailureOfInValidDuedate2() {
        let mileStone = MileStone(id: 1, title: "haha", duedate: "2022-11-2")
        let result = patternChecker.isComplete(mileStone: mileStone)
        XCTAssertFalse(result)
    }
    
    func testCompleteFailureOfInValidDuedate3() {
        let mileStone = MileStone(id: 1, title: "haha", duedate: "1999-11-12")
        let result = patternChecker.isComplete(mileStone: mileStone)
        XCTAssertFalse(result)
    }
    
    func testCompleteFailureOfEmptyTitle() {
        let mileStone = MileStone(id: 1, title: "", duedate: "2024-11-23")
        let result = patternChecker.isComplete(mileStone: mileStone)
        XCTAssertFalse(result)
    }
}
