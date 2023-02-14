import { useEffect, useRef, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function App() {
  const [amount, setAmount] = useState('');
  const [currencies, setCurrencies] = useState([]);
  const [currency, setCurrency] = useState('USD');
  const [open, setOpen] = useState(false);
  const [convertedAmount, setConvertedAmount] = useState('');

  const fetchSymbols = () => {
    let currenciesVar = [];
    fetch('https://api.apilayer.com/exchangerates_data/symbols',
      {
        method: 'GET',
        headers: { 'apikey': 'seWxD50j144lstzwyeW7Cjt7mNqNxzb8' }
      })
      .then(response => response.json())
      .then(data => {
        Object.keys(data.symbols).forEach((key, index) => {
          currenciesVar.push({ value: key, label: key });
        });
        setCurrencies(currenciesVar);
      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    fetchSymbols();
  }, []);

  const convert = () => {
    fetch(`https://api.apilayer.com/exchangerates_data/convert?to=EUR&from=${currency}&amount=${amount}`,
      {
        method: 'GET',
        headers: { 'apikey': 'seWxD50j144lstzwyeW7Cjt7mNqNxzb8' }
      })
      .then(response => response.json())
      .then(data => {
        setConvertedAmount(data.result);
      })
      .catch(err => console.error(err));
  }

  const convertValue = () => {
    if (isNaN(amount)) {
      alert('Please type in the amount');
    } else {
      convert();
    }
  }

  return (
    <View style={styles.container}>
      {convertedAmount !== '' && <Text>{convertedAmount} EUR</Text>}
      <View style={{ flexDirection: 'row', gap: 30, justifyContent: 'center', marginLeft: '50%' }}>
        <TextInput
          style={styles.textfield}
          onChangeText={currValue => setAmount(parseInt(currValue))}
          value={amount}
          keyboardType='numeric'
        />
        <DropDownPicker
          style={{ width: 100, height: 30 }}
          open={open}
          value={currency}
          items={currencies}
          setOpen={setOpen}
          setValue={setCurrency}
          setItems={setCurrencies}
        />
      </View>
      <Button
        title="Convert"
        onPress={convertValue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20
  },
  textfield:
  {
    height: 50,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1
  }
});
