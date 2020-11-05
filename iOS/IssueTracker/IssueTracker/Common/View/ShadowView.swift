//
//  ShadowView.swift
//  IssueTracker
//
//  Created by 최동규 on 2020/11/06.
//

import UIKit

@IBDesignable
class ShadowView: UIView {
    
    @IBInspectable private var cornerRadius: CGFloat {
        get { layer.cornerRadius }
        set { layer.cornerRadius = newValue }
    }
    @IBInspectable private var shadowColor: UIColor {
        get { UIColor(cgColor: layer.shadowColor ?? UIColor.clear.cgColor)  }
        set { layer.shadowColor = newValue.cgColor }
    }
    @IBInspectable private var shadowOffset: CGSize {
        get { layer.shadowOffset }
        set { layer.shadowOffset = newValue }
    }
    @IBInspectable private var shadowRadius: CGFloat {
        get { layer.shadowRadius }
        set { layer.shadowRadius = newValue }
    }
    @IBInspectable private var shadowOpacity: Float {
        get { layer.shadowOpacity }
        set { layer.shadowOpacity = newValue }
    }
}
