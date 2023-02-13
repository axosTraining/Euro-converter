import { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View, Image } from 'react-native';

export default function App() {
  const [ingridient, setIngridient] = useState('');
  const [meals, setMeals] = useState([]);

  const getMeals = () => {
    if (ingridient !== '') {
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingridient}`)
        .then(response => response.json())
        .then(data => setMeals(data.meals))
        .catch(error => {
          Alert.alert('Error', error);
        });
    } else {
      alert('Please fill in the ingridient');
    }
  }


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textfield}
        placeholder='ingridient'
        onChangeText={text => setIngridient(text)}
        value={ingridient}
      />
      <Button title="Find" onPress={getMeals} />
      {meals !== null && <FlatList
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) =>
          <View>
            <Text
              style={{ fontSize: 18, fontWeight: "bold" }}>{item.strMeal}
            </Text>
            <Image
              style={{ width: 250, height: 250 }}
              source={{ uri: item.strMealThumb }}
            />
          </View>}
        data={meals}
      />}
      {meals === null && <Text>There are no meals with {ingridient} ingridient</Text>}
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
  },
  textfield:
  {
    height: 30,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1
  }
});
