//
//  AppData.swift
//  Billy
//
//  Created by alessandro.cifani on 01/10/21.
//

import Foundation

class SubscriptionsData: ObservableObject {
    private static var documentsFolder: URL {
        do {
            return try FileManager.default.url(for: .documentDirectory,
                                                  in: .userDomainMask,
                                                  appropriateFor: nil,
                                                  create: false)
        } catch {
            fatalError("Can't find documents directory.")
        }
    }
    
    private static var fileURL: URL {
        return documentsFolder.appendingPathComponent("subscriptions.data")
    }
    
    @Published var subscriptions: [Subscription] = []
    
    func load() {
        DispatchQueue.global(qos: .background).async { [weak self] in
            guard let data = try? Data(contentsOf: Self.fileURL) else {
#if DEBUG
                DispatchQueue.main.async {
                    self?.subscriptions = Subscription.sampleData
                }
#endif
                return
            }
            guard let subs = try? JSONDecoder().decode([Subscription].self, from: data) else {
                fatalError("Can't decode saved subscriptions data")
            }
            DispatchQueue.main.async {
                self?.subscriptions = subs
            }
        }
    }
    func save() {
        DispatchQueue.global(qos: .background).async { [weak self] in
            guard let subs = self?.subscriptions else { fatalError("Self out of scope") }
            guard let data = try? JSONEncoder().encode(subs) else { fatalError("Error encoding data") }
            do {
                let outfile = Self.fileURL
                try data.write(to: outfile)
            } catch {
                fatalError("Can't write to file")
            }
        }
    }
}
