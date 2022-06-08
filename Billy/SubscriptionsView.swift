//
//  ContentView.swift
//  Billy
//
//  Created by alessandro.cifani on 27/09/21.
//

import SwiftUI

struct SubscriptionsView: View {
    @Binding var subscriptions: [Subscription]
    let saveAction: () -> Void
    
    @Environment(\.scenePhase) private var scenePhase
    
    @State private var isPresented = false
    @State private var newSubscription = Subscription.Data()
    @State private var selectedUnit: FrequencyUnit = .month
    
    private var totalAmount: Decimal {
        subscriptions.reduce(0.0, { partialResult, subscription -> Decimal in
            let normalizedAmount = Utils.normalizeAmount(fromAmount: subscription.amount, fromFrequency: subscription.frequencyAmount, fromUnit: subscription.frequencyUnit, to: selectedUnit)
            return partialResult + normalizedAmount
        })
    }
    
    private func selectNextUnit() {
        let nextUnitMap: [FrequencyUnit : FrequencyUnit] = [.day: .week,
                                                            .week: .month,
                                                            .month: .year,
                                                            .year: .day]
        selectedUnit = nextUnitMap[selectedUnit, default: .month]
    }
    
    var body: some View {
        VStack {
            List {
                if subscriptions.count == 0 {
                    Button(action: {
                        isPresented = true
                    }) {
                        Label("Add subscription", systemImage: "plus.circle")
                    }
                    .font(.headline)
                    .padding()
                }
                
                ForEach(subscriptions) { subscription in
                    NavigationLink(destination: DetailView(subscription: binding(for: subscription))) {
                        CardView(subscription: subscription, unit: selectedUnit)
                    }
                }
                .onDelete { indices in
                    subscriptions.remove(atOffsets: indices)
                }
            }
            .navigationTitle("Subscriptions")
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button(action: {
                        isPresented = true
                    }) {
                        Label("Create subscription", systemImage: "plus")
                    }
                }
            }
            .sheet(isPresented: $isPresented) {
                NavigationView {
                    EditView(subscription: $newSubscription)
                        .toolbar {
                            ToolbarItem(placement: .navigationBarLeading) {
                                Button("Cancel") {
                                    isPresented = false
                                }
                            }
                            ToolbarItem(placement: .navigationBarTrailing) {
                                Button("Add") {
                                    let newSub = Subscription(from: newSubscription)
                                    subscriptions.append(newSub)
                                    newSubscription = Subscription.Data()
                                    isPresented = false
                                }
                            }
                        }
                        .navigationTitle("Create")
                        .navigationBarTitleDisplayMode(.inline)
                }
            }
            
            HStack {
                Button(action: selectNextUnit) {
                    HStack {
                        Image(systemName: "clock.arrow.2.circlepath")
                            .font(.headline)
                        VStack(alignment: .leading) {
                            Text("Total")
                                .font(.headline)
                                .textCase(.uppercase)
                            Text("per \(selectedUnit.rawValue)")
                                .underline()
                                .font(.caption)
                                .textCase(.uppercase)
                        }
                    }}
                Spacer()
                Text("\(CurrencyFormatter().format(totalAmount))")
                    .font(.title)
            }
            .frame(alignment: .bottom)
            .padding()
        }
        .onChange(of: scenePhase) { phase in
            if phase == .inactive { saveAction() }
        }
    }
    
    private func binding(for sub: Subscription) -> Binding<Subscription> {
        guard let index = subscriptions.firstIndex(where: { $0.id == sub.id }) else {
            fatalError("Can't find subscription in array")
        }
        return $subscriptions[index]
    }
}

private let itemFormatter: DateFormatter = {
    let formatter = DateFormatter()
    formatter.dateStyle = .short
    formatter.timeStyle = .medium
    return formatter
}()

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationView {
            SubscriptionsView(subscriptions: .constant(Subscription.sampleData), saveAction: {})
        }
    }
}
