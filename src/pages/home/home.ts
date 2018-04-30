import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular/platform/platform';

import { HTTP } from '@ionic-native/http';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public longitude: any;
  public latitude: any;

  // weather vars

  public weatherDetails: any;

public id: any;

  constructor(public navCtrl: NavController, public geo: Geolocation, private platform: Platform, public http: HTTP) {
    this.platform.ready().then(() => {
      // getting coords
      this.geo.getCurrentPosition().then(resp => {
        this.longitude= resp.coords.longitude;
        this.latitude= resp.coords.latitude;

        this.http.get('http://api.openweathermap.org/data/2.5/weather?lat='+this.latitude+'&lon='+this.longitude+'&appid=39f95cd25a4479fd3037ff9fa3abc831', {}, {})
        .then(data =>{ 
          
          var weatherData = JSON.parse(data.data);
      
          console.log(weatherData.main.temp);
          console.log(data.status);
          console.log(data.data); // data received by server
          console.log(data.headers);
          
          this.id=weatherData;
          
       
      
        })
        .catch(error => {
      
          console.log(error.status);
          console.log(error.error); // error message as string
          console.log(error.headers);
      
        });
        
      }).catch(() => {
        console.log("Error in getting location");
      });
      
      // http request

      
      

     


    });
  }

}
