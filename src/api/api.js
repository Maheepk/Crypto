import {create} from 'apisauce';

export async function getElementData(element) {
  const api = create({
    baseURL: 'https://data.messari.io/',
  });
  let response = await api.get(`/api/v1/assets/${element}/metrics`);

  if (response.data.status.hasOwnProperty('error_code')) {
    return {
      status: 0,
      data: 'Not found',
    };
  } else {
    let res = parseCurrencyData(response.data.data);
    return {
      status: 1,
      data: res,
    };
  }
}
export function parseCurrencyData(currencyData) {
  let color;
  let price = currencyData.market_data.price_usd?.toString().substring(0, 8);
  let change = currencyData.market_data.percent_change_usd_last_24_hours;
  let Direction = change > 0;
  let changeString = change?.toString().substring(1, 6);
  let currencyObject = {
    Name: currencyData.name,
    ShortName: currencyData.symbol,
    Price: price,
    PercentageChange: changeString,
    Direction: Direction,
    IconColor: color,
  };
  return currencyObject;
}
