//
//  CardView.swift
//  Billy
//
//  Created by alessandro.cifani on 28/09/21.
//

import SwiftUI

struct CardView: View {
    let subscription: Subscription
    let unit: FrequencyUnit
    private var amount: String {
        let normalizedAmount = Utils.normalizeAmount(fromAmount: subscription.amount,
                                                     fromFrequency: subscription.frequencyAmount,
                                                     fromUnit: subscription.frequencyUnit,
                                                     to: unit)
        
        return CurrencyFormatter().format(normalizedAmount)
    }
    
    var body: some View {
        HStack {
            VStack(alignment: .leading) {
                Text(subscription.name)
                    .font(.headline)
                
                if subscription.descr != "" {
                    Text(subscription.descr)
                        .font(.caption)
                }
            }
            Spacer()
            Text(amount)
        }
    }
}

struct CardView_Previews: PreviewProvider {
    static var previews: some View {
        CardView(subscription: Subscription.sampleData[1], unit: .month)
            .previewLayout(.fixed(width: 400, height: 60))
    }
}
