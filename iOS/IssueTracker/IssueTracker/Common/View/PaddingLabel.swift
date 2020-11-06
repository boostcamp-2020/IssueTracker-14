//
//  PaddingLabel.swift
//  IssueTracker
//
//  Created by TTOzzi on 2020/11/04.
//

import UIKit

@IBDesignable
final class PaddingLabel: UILabel {
    
    @IBInspectable private var borderWidth: CGFloat {
        get { layer.borderWidth }
        set { layer.borderWidth = newValue }
    }
    @IBInspectable private var borderColor: UIColor {
        get { UIColor(cgColor: layer.borderColor ?? UIColor.clear.cgColor) }
        set { layer.borderColor = newValue.cgColor }
    }
    @IBInspectable private var cornerRadius: CGFloat {
        get { layer.cornerRadius }
        set { layer.cornerRadius = newValue }
    }
    @IBInspectable private var paddingWidth: CGFloat {
        get { padding.width }
        set { padding.width = newValue }
    }
    @IBInspectable private var paddingHeight: CGFloat {
        get { padding.height }
        set { padding.height = newValue }
    }
    private var padding: CGSize = .init(width: 0, height: 0)
    
    override var intrinsicContentSize: CGSize {
        let superContentSize = super.intrinsicContentSize
        let width = superContentSize.width + padding.width
        let heigth = superContentSize.height + padding.height
        return CGSize(width: width, height: heigth)
    }
}
