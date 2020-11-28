import { Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { data } from 'jquery';
import { ChatboxService } from '../chatbox.service';
import { Chatbox } from '../chatmessage';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit,OnChanges {
  TextMsg:FormGroup;
  chatModal=new Chatbox("");
  sendButton:boolean;
  bottext:string;
  askLogin:boolean=false;
  userName:string="";
  password:string="";
  credentials:string;
  login:any;
  @ViewChild('chatlogs',{ read: ElementRef, static: false }) divMsgs: ElementRef;
  @ViewChild('chatlogs',{ read: ElementRef, static: false }) botMsgs: ElementRef;
  title = 'IGenie';
  reply:any;
  userId:string;
  constructor(private renderer:Renderer2, private chatboxService:ChatboxService){
    this.sendButton=true
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("hello");
 // this.onSubmit();
  }
  async ngOnInit(){
    this.userId= await this.chatboxService.startRobot();
    console.log(this.userId);
  }
  Empty(){
    if(this.chatModal.inputQuery!=null){
      this.sendButton=true  
    }
    if(this.chatModal.inputQuery==null){
      this.sendButton=false
    }
  }
  async onSubmit(){
    await this.getData();
    this.execute();
   }

  execute(){
    this.sendButton=false
    if(this.chatModal.inputQuery==""){
      return false
    }else{
      //console.log(this.chatModal.inputQuery)
      //User Msgs
      const divMain= this.renderer.createElement('div');
      const divSub= this.renderer.createElement('div');
      
      const text=this.renderer.createText(this.chatModal.inputQuery);
      
      this.renderer.appendChild(divSub,text);
      this.renderer.addClass(divSub,"UserMsg");  
      this.renderer.appendChild(divMain,divSub);
      this.renderer.addClass(divMain,"d-flex");
      this.renderer.addClass(divMain,"flex-row-reverse");
      this.renderer.appendChild(this.divMsgs.nativeElement,divMain);

      //Bot Msgs
      let random=Math.floor(Math.random() * 5) + 0 
      const botMain= this.renderer.createElement('div');
      const botimg= this.renderer.createElement('div');
      this.renderer.addClass(botimg,"botimg"); 
      const botSub= this.renderer.createElement('div');
      this.bottext=  this.renderer.createText(this.reply);
     
     
       //Our input chat
        this.renderer.appendChild(botSub,botimg);
        this.renderer.appendChild(botSub,this.bottext);
        this.renderer.addClass(botSub,"botMsg");  
        this.renderer.appendChild(botMain,botSub);
        this.renderer.addClass(botMain,"d-flex");
        this.renderer.appendChild(this.divMsgs.nativeElement,botMain);

      var out = document.getElementById("chatlogs");
      var isScrolledToBottom = out.scrollHeight - out.clientHeight <= out.scrollTop + 1;
      // console.log(isScrolledToBottom)
      if(!isScrolledToBottom)
          out.scrollTop = out.scrollHeight - out.clientHeight;
          this.chatModal.inputQuery="";
    }
  }

async getData(){
 let res= await this.chatboxService.getAsyncRobot(this.chatModal.inputQuery+" @"+this.userId)
  this.reply=res
  if(this.reply==="Authenticate first"){
         this.askLogin=true;
       }
  //console.log(this.reply); 
}
onSkip(){
   this.askLogin=false;   
}
async onCredentialsSubmit(){
  this.credentials= this.userName+" "+this.password+" "+this.userId;
  //console.log(this.credentials);
  let res = await this.chatboxService.login(this.credentials)
  //console.log(res);

    if (res==="Authentication Failed"){
      alert("Bad Credentials")
      this.askLogin=true;
    }

    else{
      alert("Authentication Successful")
      this.askLogin=false;
    }
}
}
