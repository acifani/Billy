//
//  BillyApp.swift
//  Billy
//
//  Created by alessandro.cifani on 27/09/21.
//

import SwiftUI

@main
struct BillyApp: App {
    @ObservedObject private var data = SubscriptionsData()
    
    var body: some Scene {
        WindowGroup {
            NavigationView {
                SubscriptionsView(subscriptions: $data.subscriptions) {
                    data.save()
                }
            }
            .onAppear {
                data.load()
            }
        }
    }
}
