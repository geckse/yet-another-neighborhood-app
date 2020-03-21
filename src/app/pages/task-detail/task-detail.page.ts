import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Task } from './../../models/Task';
import { SubTask } from './../../models/SubTask';

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
  ) { }

  ngOnInit() {
    this.taskId = this.activatedRoute.snapshot.paramMap.get('taskId');
    this.task = new Task();
    this.task.creator = "Nutzer";
    this.task.name = "Mein Test Task";
    this.task.plz = 12345;
    this.task.description = "Das ist ein Test Task";

    let sub = new SubTask();
    sub.name = "Punkt 1";
    /*
    this.task.items = [sub];
    this.taskService.addTask(this.task).then((task)=>{
      console.log('HERE');
      console.log(task);
    }).catch((e) => {
      console.log(e);
    });*/
  }

}
