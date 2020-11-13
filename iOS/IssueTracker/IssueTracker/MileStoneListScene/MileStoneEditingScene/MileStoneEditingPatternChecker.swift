//
//  MileStoneEditingPatternChecker.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/13.
//

import Foundation

enum MileStoneEditingPatternError: Error {
    case invalidDate(msg: String)
}

final class MileStoneEditingPatternChecker {
    
    func isComplete(mileStone: MileStone) -> Bool {
        guard let duedate = mileStone.duedate else { return false }
        let result = isValid(duedate: duedate)
        switch result {
        case .failure:
            return false
        case .success:
            return !mileStone.title.isEmpty
        }
    }
    
    func isValid(duedate date: String) -> Result<Void, MileStoneEditingPatternError> {
        guard date.count == 10 else {
            return .failure(.invalidDate(msg: ""))
        }
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd"
        guard let later = dateFormatter.date(from: date) else {
            return .failure(.invalidDate(msg: "올바른 날짜가 아닙니다."))
        }
        guard later.timeIntervalSinceNow > 0 else {
            return .failure(.invalidDate(msg: "완료 날짜는 과거가 될 수 없습니다."))
         }
        return .success(())
    }

}
