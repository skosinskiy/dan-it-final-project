import React, {Component} from 'react'
import {ReactComponent as WeatherCloud} from '../../../img/icons/cloud.svg'
import './CurWeather.scss'
import axios from "axios";

export default class CurWeather extends Component {
  state = {
    temperature : null
  }

/*
  componentDidMount() {
    this.onTemperatureSet()
  }

  onTemperatureSet() {
    weatherApi.then(
        (response)=>{console.log(response)}
    );
  }
*/

  render () {
    const KEY = 'a703fcfbb171e3e5416b8eb644e88afb'

/*    axios.get(`https://api.darksky.net/forecast/${KEY}/${50.4547},${30.5238}`, {headers: {
      'Access-Control-Allow-Origin': '*',}
    }).then(res =>{
      console.log(res)
    })*/

/*   axios({
          url: `https://api.darksky.net/forecast/${KEY}/${50.4547},${30.5238}`, // add api key to the path
          json: true,
          method: 'GET',
          mode: 'cors'
        }
    ).then((res) =>{
     res.setHeader('Access-Control-Allow-Origin', '*');
      console.log(res)
    })*/

    let fetch = require('node-fetch');

    let darksky = 'https://api.darksky.net/forecast/';
    let key = 'a703fcfbb171e3e5416b8eb644e88afb';
    let lat = 50.4547;
    let lng = 30.5238;
    let uri = darksky + key + '/' + lat +','+ lng;
    console.log(uri);
    uri = uri.concat('?units=ca&exclude=minutely,hourly&lang=ru');

    let options = {
      method: 'GET',
      mode: 'cors',
      headers:{'Access-Control-Allow-Origin': '*'}
    }
    let req = new fetch.Request(uri, options);

    fetch(req)
        .then((response)=>{
          if(response.ok){
           // response.setHeader('Access-Control-Allow-Origin', '*')
            return response.json();
          }else{
            throw new Error('Bad HTTP!')
          }
        })
        .then( (j) =>{
          console.log(j.currently.temperature, j.currently.summary);

          console.log( j.daily.data[1] );
          //console.log('JSON data provided');
        })
        .catch( (err) =>{
          console.log('ERROR:', err.message);
        });



    return (
      <div className='current-weather'>
        <div className='current-weather__icon'>
          <WeatherCloud />
        </div>
        <div className='current-weather__info'>
          <div className='current-weather__info-item'>Cloudy</div>
          <div className='current-weather__info-item'>+7 C</div>
        </div>
      </div>
    )
  }
}