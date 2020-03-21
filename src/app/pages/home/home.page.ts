import { Component, OnInit } from '@angular/core';

import { AuthService } from './../../providers/auth-service/auth-service';
import { TaskService } from './../../providers/task-service/task-service';

import { Task } from './../../models/Task';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  tasks: Observable<Task[]>;

  slideOpts: any = {
    slidesPerView: 'auto'
  };

  constructor(public auth: AuthService, public taskService: TaskService) {

  }
  ngOnInit() {
    this.auth.isReady().then( (userId) => {
      this.taskService.getTasks().subscribe((tasks)=>{
        this.tasks = tasks;
      });
    });
  }


}
