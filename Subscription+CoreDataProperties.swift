//
//  Subscription+CoreDataProperties.swift
//  Billy
//
//  Created by alessandro.cifani on 28/09/21.
//
//

import Foundation
import CoreData


extension Subscription {
    
    @nonobjc public class func fetchRequest() -> NSFetchRequest<Subscription> {
        return NSFetchRequest<Subscription>(entityName: "Subscription")
    }
    
    @NSManaged public var name: String
    @NSManaged public var descr: String
    @NSManaged public var amount: NSDecimalNumber
    @NSManaged public var startDate: Date?
    @NSManaged public var frequencyAmount: Int32
    @NSManaged public var frequencyUnit: String
    
    var unit: FrequencyUnit {
        get {
            FrequencyUnit(rawValue: frequencyUnit) ?? .month
        }
        set {
            frequencyUnit = newValue.rawValue
        }
    }
    
}

extension Subscription : Identifiable {
    
}

enum FrequencyUnit: String {
    case day = "day"
    case week = "week"
    case month = "month"
    case year = "year"
}
