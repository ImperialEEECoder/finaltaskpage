import { Component , NgModule, enableProdMode } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import Parse from 'parse';
import { stringify } from '@angular/core/src/util';

@Component({
  selector: 'page-task',
  templateUrl: 'task.html',
})

export class TaskPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private alertCtrl: AlertController, 
    public toastCtrl: ToastController,
    ) {}

  day:string = '0'; 
  month:string = 'monkey';
  year:string = '2019';
  date:string;
  click:boolean = false;
  length:string; 
  alreadyclicked:boolean = false;
  SameDate:boolean = false;
  OldDate:string = '16-16-2000';

  objectId:string;
  EstimatedTime:string;
  Vehicle:string;
  Instruction:string;
  StartPoint:string;
  Destination:string;
  ReferenceNumber:string;
  Service = [];
  Username:string; 
  CompleteStatus:string; 
  VehicleType:string;
  VehicleID:string; 
  StopPoint:string;
  Distance:string;

  years:string = "";
  months:string = "";
  days:string = "";
  DisplayDate:string = "";

  objects: Array <any> = [];
  object: any;

  types: Array <any> = [];
  type:any;
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskPage');
  }

  //////////////////

  refresh_year(){
    this.years = this.year;
  }

  refresh_month(){
    this.months = this.month;
  }

  refresh_day(){
    this.days = this.day;
  }

  //////////////////

  DeleteVector(){
    this.types = [];
  }

  DeleteVectorNew(){
    this.objects = [];
  }

  //////////////////

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Alert!',
      subTitle: 'Please enter the full date',
      buttons: ['Okay']
    });
    alert.present();
  }

  async allTasks(){
    this.alreadyclicked = true;
    this.click = true;
    this.DeleteVector()
    let Tasks = Parse.Object.extend('Task');
    let tasks = new Parse.Query(Tasks);
    
    this.date = this.year + '-' + this.month + '-' + this.day;
    this.DisplayDate = this.day + '-' + this.month + '-' + this.year;

    tasks.equalTo("Date", this.date);
    const results = await tasks.find();

    //this.length = results.length;

    for (let i=0; i< results.length; i++){
      this.type = results[i];
      this.types.push(this.type.id);
      this.objectId = this.type.id;
      this.viewTask(this.objectId);
      //this.objectId = this.type.id;
      //this.viewTask(this.objectId);
    }
  }

  async viewTask(objectId){

    let Tasks = Parse.Object.extend('Task');
    let tasks = new Parse.Query(Tasks);
    this.date = this.year + '-' + this.month + '-' + this.day;

    tasks.equalTo("objectId", this.objectId);
    const results = await tasks.find();

    for (let i=0; i< results.length; i++){
      this.object = results[i];
      this.objects.push(this.object.get('Complete'));
      this.objects.push(this.object.get('Username'));
      this.objects.push(this.object.get('EstimatedTime'));
      this.objects.push(this.object.get('VehicleType'));
      this.objects.push(this.object.get('VehicleID'));
      this.objects.push(this.object.get('StopPoint'));
      this.objects.push(this.object.get('Destination'));
      this.objects.push(this.object.get('ReferenceNumber'));
      this.objects.push(this.object.get('TaskType'));
      //this.objects.push(this.object.get('Instruction'));
      //this.objects.push(this.object.get('Distance'));
    }

    //this.CompleteStatus = this.objects[0];
    //this.Username = this.objects[1];   
    //this.EstimatedTime = this.objects[2];
    //this.VehicleType = this.objects[3];
    //this.VehicleID = this.objects[4];
    //this.Instruction = this.objects[5];
    //this.StopPoint = this.objects[6];
    //this.Destination = this.objects[7];
    //this.ReferenceNumber = this.objects[8];
    //this.Service = this.objects[9];
    //this.Distance = this.objects[10];

    //this.DeleteVectorNew()
  }
}
enableProdMode();