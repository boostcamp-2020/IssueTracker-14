//
//  PaddingLabel.swift
//  IssueTracker
//
//  Created by TTOzzi on 2020/11/04.
//

import UIKit

@IBDesignable
final class PaddingLabel: UILabel {
    
    @IBInspectable var borderWidth: CGFloat {
        get { layer.borderWidth }
        set { layer.borderWidth = newValue }
    }
    @IBInspectable var borderColor: UIColor {
        get { UIColor(cgColor: layer.borderColor ?? UIColor.clear.cgColor) }
        set { layer.borderColor = newValue.cgColor }
    }
    @IBInspectable var cornerRadius: CGFloat {
        get { layer.cornerRadius }
        set { layer.cornerRadius = newValue }
    }
    @IBInspectable var paddingWidth: CGFloat {
        get { padding.width }
        set { padding.width = newValue }
    }
    @IBInspectable var paddingHeight: CGFloat {
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
