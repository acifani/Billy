//
//  CurrencyFormatter.swift
//  Billy
//
//  Created by alessandro.cifani on 30/09/21.
//

import Foundation

class CurrencyFormatter {
    private var formatter: NumberFormatter
    
    init() {
        self.formatter = NumberFormatter()
        self.formatter.numberStyle = .currency
    }
    
    func format(_ amount: Decimal) -> String {
        formatter.string(for: amount) ?? ""
    }
}
