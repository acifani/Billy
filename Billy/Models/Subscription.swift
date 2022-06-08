//
//  Subscription.swift
//  Billy
//
//  Created by alessandro.cifani on 28/09/21.
//

import Foundation

struct Subscription: Identifiable, Codable {
    let id: UUID
    var name: String
    var descr: String
    var amount: Decimal
    var frequencyAmount: Int
    var frequencyUnit: FrequencyUnit
    
    init(id: UUID = UUID(), name: String, descr: String = "", amount: Decimal, frequencyAmount: Int, frequencyUnit: FrequencyUnit) {
        self.id = id
        self.name = name
        self.descr = descr
        self.amount = amount
        self.frequencyAmount = frequencyAmount
        self.frequencyUnit = frequencyUnit
    }
}

extension Subscription {
    static var sampleData: [Subscription] {
        [
            Subscription(name: "Spotify", amount: 9.99, frequencyAmount: 1, frequencyUnit: .month),
            Subscription(name: "Netflix", descr: "UHD plan", amount: 15.99, frequencyAmount: 1, frequencyUnit: .month),
            Subscription(name: "Google Drive", descr: "100GB plan", amount: 19.99, frequencyAmount: 1, frequencyUnit: .year)
        ]
    }
}

extension Subscription {
    struct Data {
        var name: String = ""
        var descr: String = ""
        var amount: String = ""
        var frequencyAmount: Int = 1
        var frequencyUnit: FrequencyUnit = .month
    }
    
    var data: Data {
        let formatter = NumberFormatter()
        formatter.maximumFractionDigits = 2
        formatter.minimumFractionDigits = 2
        return Data(name: name, descr: descr, amount: formatter.string(for: amount) ?? "", frequencyAmount: frequencyAmount, frequencyUnit: frequencyUnit)
    }
    
    init(from data: Data) {
        self.id = UUID()
        self.name = data.name
        self.descr = data.descr
        self.amount = Decimal(string: data.amount) ?? 0.0
        self.frequencyAmount = data.frequencyAmount
        self.frequencyUnit = data.frequencyUnit
    }
    
    mutating func update(from data: Data) {
        self.name = data.name
        self.descr = data.descr
        self.amount = Decimal(string: data.amount) ?? 0.0
        self.frequencyAmount = data.frequencyAmount
        self.frequencyUnit = data.frequencyUnit
    }
}
