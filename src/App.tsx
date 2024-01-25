import React, {useState} from 'react';
import {
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {currencyByRupee} from './constants';
import CurrencyButton from './components/currency.button';
import Snackbar from 'react-native-snackbar';

function App(): React.JSX.Element {
  const [inputVal, setInputVal] = useState('');
  const [resultVal, setResultVal] = useState('');
  const [targetCurr, setTragetCurr] = useState('');

  const buttonPressed = (targetValue: Currency) => {
    if (!inputVal) {
      return Snackbar.show({
        text: 'Enter a value to convert',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#ea7773',
        textColor: '#000000',
      });
    }

    const inputAmount = parseFloat(inputVal);

    if (!isNaN(inputAmount)) {
      const convertedValue = inputAmount * targetValue.value;
      const result = `${targetValue.symbol} ${convertedValue.toFixed(2)}`;

      setResultVal(result);
      setTragetCurr(targetValue.name);
    } else {
      return Snackbar.show({
        text: 'Not a valid value to convert',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#CB3837',
        textColor: '#000000',
      });
    }
  };
  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.rupeesContainer}>
            <Text style={styles.rupee}>₹</Text>
            <TextInput
              maxLength={14}
              value={inputVal}
              clearButtonMode="always"
              onChangeText={setInputVal}
              keyboardType="number-pad"
              placeholder="Enter amount in ruppes"
            />
          </View>
          {resultVal && <Text style={styles.resultTxt}>{resultVal}</Text>}
        </View>
        <View style={styles.bottomContainer}>
          <FlatList
            numColumns={2}
            data={currencyByRupee}
            keyExtractor={item => item.name}
            renderItem={({item}) => (
              <Pressable
                onPress={() => buttonPressed(item)}
                style={[
                  styles.button,
                  targetCurr === item.name && styles.selected,
                ]}>
                <CurrencyButton {...item} />
              </Pressable>
            )}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#515151',
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  resultTxt: {
    fontSize: 32,
    color: '#000000',
    fontWeight: '800',
  },
  rupee: {
    marginRight: 8,
    fontSize: 22,
    color: '#000000',
    fontWeight: '600',
  },
  rupeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputAmountField: {
    height: 40,
    width: 200,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  bottomContainer: {
    flex: 3,
  },
  button: {
    flex: 1,

    margin: 12,
    height: 60,

    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  selected: {
    backgroundColor: '#ffeaa7',
  },
});

export default App;
