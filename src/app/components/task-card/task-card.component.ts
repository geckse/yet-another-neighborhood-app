import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';


import { TaskService } from './../../providers/task-service/task-service';
import { AuthService } from './../../providers/auth-service/auth-service';

import { Task } from './../../models/Task';
import { SubTask } from './../../models/SubTask';

@Component({
  selector: 'task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnInit {

  @Input() task: Task;

  constructor(
    public router: Router,
    public navCtrl: NavController,
    public taskService: TaskService,
    public auth: AuthService) { }

  ngOnInit() {

  }

  gotoTaskPage(){
    if(this.task && this.task.id){
      this.navCtrl.navigateForward('/task-detail/'+this.task.id);
    }
  }

  acceptTask(){
    this.taskService.acceptTask(this.task);
  }
  resignTask(){
    this.taskService.resignTask(this.task);
  }
}
