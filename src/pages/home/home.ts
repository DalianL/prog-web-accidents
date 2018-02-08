import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  countries: string[];
  errorMessage: string;

  constructor(public navCtrl: NavController, public rest: RestProvider, public app: App) {

  }

  ionViewDidLoad() {
    this.getCountries();
  }

  getCountries() {
    this.rest.getCountries()
       .subscribe(
         countries => this.countries = countries,
         error =>  this.errorMessage = <any>error);
  }

  logout(){
    //Api Token Logout 
    const root = this.app.getRootNav();
    root.popToRoot();
  }

}