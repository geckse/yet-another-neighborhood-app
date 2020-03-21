import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Task } from './../../models/Task';
import { SubTask } from './../../models/SubTask';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.page.html',
  styleUrls: ['./task-detail.page.scss'],
})
export class TaskDetailPage implements OnInit {

  taskId: string;
  task: Task;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.taskId = this.activatedRoute.snapshot.paramMap.get('taskId');
    this.task = new Task();
    this.task.id = this.taskId;
    this.task.creator = "Nutzer";
    this.task.name = "Mein Test Task";
    this.task.plz = 12345;
    this.task.description = "Das ist ein Test Task";

    let sub = new SubTask();
    sub.name = "Punkt 1";
    sub.quantity = 1;
    sub.unit = "g";

    this.task.items = [sub];


  }

}
