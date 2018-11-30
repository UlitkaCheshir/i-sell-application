import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user/User';
import {Lot} from "../../models/lot/Lot";
import {MatTabChangeEvent} from "@angular/material";
import {AuthService} from "../../services/user/auth.service";
import {ProfileService} from "../../services/profile/profile.service";
import {ServerResponse} from "../../models/server/ServerResponse";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public user: User = new User();

  public subscribers: User[] = [];
  public Subscriptions: User[] = [];
  public lots: Lot[] = [];
  public statusSubscribe: boolean;
  constructor(
    private authService: AuthService,
    private profileService: ProfileService
  ) {
    const responseBuy = this.authService.getUser(null);
    console.log(responseBuy);
    this.statusSubscribe = false;
  }

  ngOnInit() {
    this.user.userName = 'Алексей';
    this.user.userLastname = 'Фамилия';
    this.user.userPhone = '+3809238130';
    this.user.userLogin = 'Alex';
    this.user.userEmail = 'alex@gmail.com';
  }


  onTabChanged(event: MatTabChangeEvent){

    if ( event.index === 1){
      this.getSubscribe();
    }
    if ( event.index === 2){
      this.getSubscriptions();
    }
  }//onTabChanged

  async getSubscribe() {

    const response = await this.profileService.getSubscriber(this.user);
    if ( response.status === 200){
      console.log(response);
      this.subscribers = response.data as User[];
    }
  }//getSubscribe

  async getSubscriptions() {

    const response = await this.profileService.getSubscriptions(this.user);
    if ( response.status === 200){
      console.log(response);
      this.Subscriptions = response.data as User[];
    }
  }//getSubscriptions

  async Subscribe(){

    const response = await this.profileService.addSubscriber(this.user);

    if ( response.status === 200){
      this.statusSubscribe = response.data;
    }
  }//Subscribe

  async unSubscribe(){
    const response = await this.profileService.removeSubscriber(this.user);
    if ( response.status === 200){
      this.statusSubscribe = response.data;
    }
  }//unSubscribe
}
