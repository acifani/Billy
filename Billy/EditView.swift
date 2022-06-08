//
//  EditView.swift
//  Billy
//
//  Created by alessandro.cifani on 28/09/21.
//

import SwiftUI

struct EditView: View {
    @Binding var subscription: Subscription.Data
    
    var body: some View {
        Form {
            HStack {
                Text("Name")
                TextField("Name", text: $subscription.name)
            }
            
            HStack {
                Text("Description")
                TextField("Description", text: $subscription.descr)
            }
            
            HStack {
                Text("Amount")
                TextField("Amount", text: $subscription.amount)
                    .keyboardType(.decimalPad)
            }
            
            Section(header: Text("Frequency")) {
                Picker("Every", selection: $subscription.frequencyAmount) {
                    ForEach(1 ..< 31, id: \.self) { number in
                        Text("\(number)")
                    }
                }
                
                Picker("Every", selection: $subscription.frequencyUnit) {
                    Text("Days").tag(FrequencyUnit.day)
                    Text("Weeks").tag(FrequencyUnit.week)
                    Text("Months").tag(FrequencyUnit.month)
                    Text("Years").tag(FrequencyUnit.year)
                }
                .pickerStyle(.segmented)
            }
        }
    }
}

struct EditView_Previews: PreviewProvider {
    static var previews: some View {
        EditView(subscription: .constant(Subscription.sampleData[0].data))
    }
}
