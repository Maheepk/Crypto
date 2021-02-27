import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {addCurrency} from './actions/actions';
import {getElementData} from './api/api';

export default function AddScreen(props) {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.data);
  const [value, onChangeText] = React.useState('');
  const [isLoading, setisLoading] = React.useState(false);
  const _addCurrency = async (currencyName) => {
    if (!isLoading) {
      setisLoading(true);

      let result = await getElementData(currencyName);
      if (result.status) {
        if (data.availableCurrency.indexOf(result.data.ShortName) > -1) {
          Alert.alert('Warning', `${currencyName} already added to your list`);
        } else {
          onChangeText('');

          dispatch({
            type: 'ADD_CURRENCY',
            payload: {currency: currencyName, currencyData: result.data},
          });

          Alert.alert(
            'Currency Added',
            `${currencyName} has been added to your list`,
            [
              {
                text: 'Ok',
                onPress: () => props.navigation.goBack(),
                style: 'cancel',
              },
            ],
          );
        }
      } else {
        Alert.alert('Error', `Currency ${currencyName} Not Found`);
      }
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <TouchableOpacity
        style={{height: '5%', justifyContent: 'center'}}
        onPress={() => {
          props.navigation.goBack();
        }}>
        <Text style={{fontSize: 16}}> {' < '} Back To List</Text>
      </TouchableOpacity>
      <View style={styles.contentStyle}>
        <Text style={{fontSize: 18}}>Add New Cryptocurrency</Text>
        <View style={{height: '2%'}} />
        <TextInput
          style={styles.textinputStyle}
          placeholder="Use a name or ticket symbol"
          onChangeText={(text) => onChangeText(text)}
        />
        <View style={{height: '2%'}} />
        <TouchableOpacity
          style={styles.addButtonStyle}
          onPress={() => _addCurrency(value)}>
          <Text style={{color: '#e0bb4c', fontSize: 18}}>Add</Text>
        </TouchableOpacity>
      </View>
      <View style={{height: '5%'}} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  contentStyle: {
    height: '90%',
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textinputStyle: {
    width: '100%',
    height: 50,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  addButtonStyle: {
    backgroundColor: '#fad24e',
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
});
