import { Component, OnInit } from '@angular/core';

import { ModalController, LoadingController } from '@ionic/angular';
import { TaskService } from './../../providers/task-service/task-service';

import { Task } from './../../models/Task';
import { SubTask } from './../../models/SubTask';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
})
export class AddTaskPage implements OnInit {

  task: Task;
  mode: string = "message";

  loading: any = null;

  constructor(
     public modalController: ModalController,
     public loadingController: LoadingController,
     public taskService: TaskService) { }

  ngOnInit() {
    this.task = new Task;
    this.task.name = "";
    this.task.description = "";
  }

  switchMode(mode: string){
    this.mode = mode;
    if(this.mode != 'message'){
        this.task.type = mode;
    }
  }
  descriptionPlaceholder(){
    if(this.mode == 'message') return 'Schreibe etwas in deine Nachbarschaft...';
    if(this.mode == 'offer') return 'Was bietet du deiner Nachbarschaft an?';
    if(this.mode == 'request') return 'Wie kann dir deine Nachbarschaft behilflich?';
  }

  async submit(){
    if(this.mode != 'message'){
      this.loading = await this.loadingController.create({
        message: 'Sende...',
      });
      this.loading.present();
      this.taskService.addTask(this.task).then( (task) =>{
        this.dismiss();
        this.loading.dismiss();
      }).catch((e)=>{
        this.dismiss();
        this.loading.dismiss();
      });
    }
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
