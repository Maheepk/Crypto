import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {addCurrency} from './actions/actions';
import {getElementData} from './api/api';
import colors, { color } from "./config/colors";
export default function AddScreen(props) {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.data);
  const [value, onChangeText] = React.useState('');
  const [isLoading, setisLoading] = React.useState(false);
  const _addCurrency = async (currencyName) => {
    if (!isLoading) {
      setisLoading(true);

      let result = await getElementData(currencyName);
      setisLoading(false);
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
        <Text style={{fontSize: 16, color: colors.primary}}> {' < '} Back To List</Text>
      </TouchableOpacity>
      <View style={styles.contentStyle}>
        { isLoading ? <ActivityIndicator size="large" style = {{color: colors.primary}} /> : null}
        <Text style={{fontSize: 18, color: colors.primary, fontWeight : "bold"}}>Add New Cryptocurrency</Text>
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
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  addButtonStyle: {
    backgroundColor: colors.secondary,
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
});
