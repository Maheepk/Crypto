import React, {useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {RectButton} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getElementData} from './api/api';
import colors, { color } from "./config/colors";
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import CryptoIcon from 'react-native-crypto-icons';
import { clearCurrency } from "./actions/actions";

function mainScreen(props) {
  const dispatch = useDispatch();
  const removeitemredux = (index) =>
    dispatch({type: 'REMOVE_ITEM', payload: index});
  const data = useSelector((state) => state);

  useEffect(() => {
    AsyncStorage.getItem('data').then((currencyData) => {
      let parsedData = JSON.parse(currencyData);
      dispatch({type: 'RESTORE_DATA', payload: JSON.parse(currencyData)});

      const endDate = new Date(parsedData.endDate);
      const currentDate = new Date();      
      const difference =  currentDate - endDate;

      if (difference > 0) {
        // Clear Previous Records..
        dispatch(clearCurrency());
        for (let currency of parsedData.availableCurrency) {
          getElementData(currency).then((result) => {
            if (result.status) {
              dispatch({type: 'ADD_CURRENCY', payload: {currency:currency,currencyData:result.data}});
            }
          });
        }
      }
    });
  }, []);

  const renderRightActions = (index) => {
    return (
      <RectButton
        style={style.removeButtonStyle}
        onPress={() => removeitemredux(index)}>
        <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
          Remove
        </Text>
      </RectButton>
    );
  };
  const renderItem = ({item, index}) => {
    let numberColor = item.Direction ? 'green' : 'red';
    return (
      <Swipeable renderRightActions={() => renderRightActions(index)}>
        <View style={style.itemContainer}>
          <View style={style.iconContainer}>
          <CryptoIcon name= {item.ShortName.toLowerCase()} style={{ fontSize: 50, color: 'black' }} />
          </View>
          <View style={style.dataContainer}>
            <View>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>
                {item.Name}
              </Text>
              <Text style={{fontSize: 18, color: 'grey'}}>
                {item.ShortName}
              </Text>
            </View>
            <View style={{paddingRight: '5%', alignItems: 'flex-end'}}>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>
                ${item.Price}
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {item.Direction ? (
                  <IconMaterial name="arrow-top-right" size={18} color="green" />
                ) : (
                  <IconMaterial name="arrow-bottom-left" size={18} color="red" />
                )}
                <Text style={{fontSize: 18, color: numberColor}}>
                  {item.PercentageChange}%
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Swipeable>
    );
  };
  const bottomComponent = () => {
    return (
      <TouchableOpacity
        style={{
          height: 100,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}
        onPress={() => {
          props.navigation.navigate('Add');
        }}>
        <Text style={style.addButtonStyle}>+ Add New Cryptocurrency</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={style.containerStyle}>
      <SafeAreaView style={{flex: 0, backgroundColor: colors.primary}} />

      <View style={style.headerStyle}>
        <View style={style.subheaderStyle}>
          <Text style={style.headerTextStyle}>CryptoTracker Pro</Text>
          <Image
            source={require('./assets/avatar.jpg')}
            style={style.headerImageStyle}
          />
        </View>
      </View>
      <View style={{flex: 6, alignItems: 'center', width: '100%'}}>
        <FlatList
          data={data.data.currencyData}
          renderItem={renderItem}
          keyExtractor={(item) => item.ShortName}
          extraData={data.data.currencyData}
          containerStyle={{flex: 1}}
          ListFooterComponent={bottomComponent}
        />
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  containerStyle: {flex: 1, backgroundColor: 'white'},

  addButtonStyle: {
    color: colors.primary,
  },
  headerStyle: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  subheaderStyle: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTextStyle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerImageStyle: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  itemContainer: {
    height: 100,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomColor: '#f1f1f1',
    borderBottomWidth: 1,
  },
  iconContainer: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataContainer: {
    width: '75%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  removeButtonStyle: {
    backgroundColor: 'red',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default mainScreen;
