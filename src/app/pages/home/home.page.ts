import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';

import { AuthService } from './../../providers/auth-service/auth-service';
import { TaskService } from './../../providers/task-service/task-service';

import { Task } from './../../models/Task';
import { Observable } from 'rxjs';

import { ModalController, IonRouterOutlet } from '@ionic/angular';

import { AddTaskPage } from './../add-task/add-task.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  tasks: Task[];

  slideOpts: any = {
    slidesPerView: 'auto'
  };

  constructor(
    public auth: AuthService,
    public taskService: TaskService,
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    public navCtrl: NavController) {
  }


  ngOnInit() {
    this.auth.isReady().then( (userId) => {
      this.taskService.getTasks().subscribe((tasks)=>{
        this.tasks = tasks;
      });
    });
  }

  async openMessageModal(){
    const modal = await this.modalController.create({
      component: AddTaskPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    modal.present();
  }

  gotoSettings(){
    this.navCtrl.navigateForward('/settings');
  }

}
