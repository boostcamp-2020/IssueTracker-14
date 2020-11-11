//
//  XibLoadable.swift
//  IssueTracker
//
//  Created by TTOzzi on 2020/11/11.
//

import UIKit

protocol XibLoadable: class {
    func loadNib() -> UIView?
}

extension XibLoadable {
    static var xibName: String {
        return String(describing: Self.self)
    }
    
    func loadNib() -> UIView? {
        let bundle = Bundle(for: Self.self)
        return bundle.loadNibNamed(Self.xibName,
                                   owner: self)?.first as? UIView
    }
}
