import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup,FormsModule,FormBuilder } from '@angular/forms';
import {Chatbox} from './chatmessage';
declare var jquery:any;
declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title : 'IGenie';
  display:boolean;
  ngOnInit(): void {
   
  }
  
  onChatOpen(){​​​​​​​​
  //this.display = true;
  this.display = !this.display; 
  }​​​​​​​​
  
  
 
}


