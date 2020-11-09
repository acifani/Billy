import 'react-native-get-random-values';

import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react';
import { Button, StyleSheet, View as NativeView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { v4 as uuid } from 'uuid';
import { useSubscriptions } from '../hooks/useSubscriptions';
import { FrequencyUnit, Subscription } from '../types';
import { Text, TextInput, View } from './Themed';

interface DetailsRoute {
  key: 'details';
  name: 'Details';
  params: {
    item: Subscription;
    type: 'create' | 'edit';
  };
}

export default function SubscriptionDetails() {
  const { params } = useRoute<DetailsRoute>();
  const theme = useTheme();
  const navigation = useNavigation();
  const { updateSubscription, addSubscription } = useSubscriptions();

  const {
    id,
    name,
    description,
    amount,
    startDate,
    frequencyAmount,
    frequencyUnit,
  } = params.item || {};

  const [nameValue, setName] = useState(name);
  const [descriptionValue, setDescription] = useState(description);
  const [amountValue, setAmount] = useState(amount);
  const [startDateValue, setStartDate] = useState(startDate);
  const [frequencyAmountValue, setFrequencyAmount] = useState(frequencyAmount);
  const [frequencyUnitValue, setFrequencyUnit] = useState(frequencyUnit);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <SaveButton
          onPress={() => {
            const fn =
              params.type === 'create' ? addSubscription : updateSubscription;
            fn({
              id: id || uuid(),
              name: nameValue,
              description: descriptionValue,
              amount: amountValue,
              frequencyAmount: frequencyAmountValue,
              frequencyUnit: frequencyUnitValue,
              startDate: startDateValue,
            });
          }}
        />
      ),
    });
  }, [
    params.type,
    addSubscription,
    updateSubscription,
    id,
    nameValue,
    descriptionValue,
    amountValue,
    frequencyAmountValue,
    frequencyUnitValue,
    startDateValue,
  ]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <FormField
        label="Name"
        value={name}
        inputProps={{ onChangeText: (t) => setName(t) }}
      />
      <FormField
        label="Description"
        value={description}
        inputProps={{ onChangeText: (t) => setDescription(t) }}
      />
      <FormField
        label="Amount"
        value={amount}
        inputProps={{
          keyboardType: 'numeric',
          onChangeText: (t) => setAmount(Number(t)),
        }}
      />
      <FormField
        label="Frequency"
        value={
          frequencyAmountValue && frequencyUnitValue
            ? `Every ${frequencyAmountValue} ${frequencyUnitValue}`
            : undefined
        }
        inputProps={{ editable: false }}
      />
      <View
        style={{
          flex: 0,
          flexDirection: 'row',
          borderColor: theme.colors.border,
          borderBottomWidth: 1,
        }}
      >
        <Picker style={{ width: '33%' }}>
          <Picker.Item color={theme.colors.text} label="Every" value="Every" />
        </Picker>
        <Picker
          selectedValue={frequencyAmountValue}
          onValueChange={(amt) => setFrequencyAmount(Number(amt))}
          style={{ width: '33%' }}
        >
          <Picker.Item color={theme.colors.text} label="Amount" value={0} />
          {Array.from({ length: 30 }, (v, k) => k + 1).map((n) => (
            <Picker.Item
              key={n}
              color={theme.colors.text}
              label={n.toString()}
              value={n}
            />
          ))}
        </Picker>
        <Picker
          selectedValue={frequencyUnitValue}
          onValueChange={(unit) => setFrequencyUnit(unit as FrequencyUnit)}
          style={{ width: '33%' }}
        >
          <Picker.Item color={theme.colors.text} label="Unit" value={''} />
          <Picker.Item color={theme.colors.text} label="Day(s)" value="days" />
          <Picker.Item
            color={theme.colors.text}
            label="Week(s)"
            value="weeks"
          />
          <Picker.Item
            color={theme.colors.text}
            label="Month(s)"
            value="months"
          />
          <Picker.Item
            color={theme.colors.text}
            label="Year(s)"
            value="years"
          />
        </Picker>
      </View>

      <FormField
        label="Starting date"
        value={
          startDateValue
            ? new Date(startDateValue).toLocaleDateString()
            : undefined
        }
        inputProps={{ editable: false }}
      />
      <DateTimePicker
        value={new Date(startDateValue || Date.now())}
        mode="date"
        onChange={(event, selectedDate) => {
          setStartDate(selectedDate?.getTime() || startDateValue);
        }}
        neutralButtonLabel="clear"
      />
    </ScrollView>
  );
}

interface FormFieldProps {
  label: string;
  value?: string | number;
  labelProps?: React.ComponentPropsWithoutRef<typeof Text>;
  inputProps?: React.ComponentPropsWithoutRef<typeof TextInput>;
}

function FormField({ label, value, labelProps, inputProps }: FormFieldProps) {
  const theme = useTheme();
  return (
    <View style={{ ...styles.field, borderColor: theme.colors.border }}>
      <Text style={styles.label} {...labelProps}>
        {label}
      </Text>
      <TextInput
        style={styles.value}
        placeholder={`Insert ${label}`}
        clearButtonMode="while-editing"
        maxLength={26}
        {...inputProps}
      >
        {value}
      </TextInput>
    </View>
  );
}

function SaveButton({ onPress }: { onPress: () => void }) {
  const navigation = useNavigation();
  return (
    <NativeView style={styles.save}>
      <Button
        title="Save"
        onPress={() => {
          onPress();
          navigation.navigate('Subscriptions');
        }}
      />
    </NativeView>
  );
}

const styles = StyleSheet.create({
  field: {
    flexDirection: 'row',
    paddingVertical: 18,
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
  },
  value: {
    fontSize: 18,
    flexGrow: 1,
    textAlign: 'right',
  },
  save: {
    marginRight: 8,
  },
});
