import { Component, OnInit } from '@angular/core';
import { User } from './shared/models/user.ui';
import { UserServiceService } from './shared/services/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  public user: any;  
  
  recibedatos(item: any) {
    console.log(item);
    this.user = item
  }

  ngOnInit():void{
   /*  console.log(this.user); */
  }
  /* 
  item:any;
  recibedatos($event) {
    this.item = $event
  } */

}


