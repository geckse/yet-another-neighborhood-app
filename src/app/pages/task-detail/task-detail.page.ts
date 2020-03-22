import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Task } from './../../models/Task';
import { SubTask } from './../../models/SubTask';

import { AuthService } from './../../providers/auth-service/auth-service';
import { TaskService } from './../../providers/task-service/task-service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.page.html',
  styleUrls: ['./task-detail.page.scss'],
})
export class TaskDetailPage implements OnInit {

  taskId: string;
  task: Task;

  constructor(
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.taskId = this.activatedRoute.snapshot.paramMap.get('taskId');

    this.auth.isReady().then( (userId) => {
      this.taskService.getTask(this.taskId).subscribe((task)=>{
        this.task = task;
      });
    });

  }

  acceptTask(){
    this.taskService.acceptTask(this.task);
  }
  resignTask(){
    this.taskService.resignTask(this.task);
  }


}
