//
//  DetailView.swift
//  Billy
//
//  Created by alessandro.cifani on 28/09/21.
//

import SwiftUI

struct DetailView: View {
    @Binding var subscription: Subscription
    @State private var editedSubscription: Subscription.Data = Subscription.Data()
    @State private var isPresented = false
    
    private var amount: String {
        CurrencyFormatter().format(subscription.amount)
    }
    
    private var frequencySuffix: String {
        subscription.frequencyAmount != 1 ? "s" : ""
    }
    
    var body: some View {
        List {
            HStack {
                Text("Name")
                Spacer()
                Text(subscription.name)
            }
            
            if subscription.descr != "" {
                HStack {
                    Text("Description")
                    Spacer()
                    Text(subscription.descr)
                }
            }
            
            HStack {
                Text("Amount")
                Spacer()
                Text(amount)
            }
            
            HStack {
                Text("Frequency")
                Spacer()
                Text("Every \(subscription.frequencyAmount) \(subscription.frequencyUnit.rawValue)\(frequencySuffix)")
            }
        }
        .toolbar {
            ToolbarItem(placement: .navigationBarTrailing) {
                Button("Edit") {
                    isPresented = true
                    editedSubscription = subscription.data
                }
            }
        }
        .sheet(isPresented: $isPresented) {
            NavigationView {
                EditView(subscription: $editedSubscription)
                    .toolbar {
                        ToolbarItem(placement: .navigationBarLeading) {
                            Button("Cancel") {
                                isPresented = false
                            }
                        }
                        ToolbarItem(placement: .navigationBarTrailing) {
                            Button("Update") {
                                isPresented = false
                                subscription.update(from: editedSubscription)
                            }
                        }
                    }
                    .navigationTitle("Edit")
                    .navigationBarTitleDisplayMode(.inline)
            }
        }
        .navigationTitle(subscription.name)
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct DetailView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationView {
            DetailView(subscription: .constant(Subscription.sampleData[0]))
        }
    }
}
