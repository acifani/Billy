//
//  AmountNormalizer.swift
//  Billy
//
//  Created by alessandro.cifani on 28/09/21.
//

import Foundation

class Utils {
    static func normalizeAmount(fromAmount: Decimal, fromFrequency: Int, fromUnit: FrequencyUnit, to: FrequencyUnit) -> Decimal {
        let amountInDays = Self.toDays(amount: fromAmount, unit: fromUnit) / Decimal(fromFrequency)
        
        switch to {
        case .day:
            return amountInDays
        case .week:
            return amountInDays * 7
        case .month:
            return amountInDays * 30
        case .year:
            return amountInDays * 360
        }
    }
    
    static private func toDays(amount: Decimal, unit: FrequencyUnit) -> Decimal {
        switch unit {
        case .day:
            return amount;
        case .week:
            return amount / 7;
        case .month:
            return amount / 30;
        case .year:
            return amount / 360;
        }
    }
}
