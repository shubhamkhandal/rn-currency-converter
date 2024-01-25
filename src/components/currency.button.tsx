import React, {PropsWithChildren} from 'react';
import {View, Text, StyleSheet} from 'react-native';

type currencyButtonProps = PropsWithChildren<{
  name: String;
  flag: String;
}>;

const CurrencyButton = (props: currencyButtonProps): JSX.Element => {
  return (
    <View style={styles.btnContainer}>
      <Text style={styles.flag}>{props.flag}</Text>
      <Text style={styles.country}>{props.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    alignItems: 'center',
  },
  flag: {
    fontSize: 20,
  },
  country: {
    fontSize: 14,
    color: '#000000',
  },
});

export default CurrencyButton;
