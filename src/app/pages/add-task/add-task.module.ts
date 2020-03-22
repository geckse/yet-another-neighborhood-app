import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule  } from '@ionic/angular';

import { AddTaskPage } from './add-task.page';
import { ComponentsModule } from './../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
  ],
  declarations: [AddTaskPage],
  entryComponents: [AddTaskPage]
})
export class AddTaskPageModule {}
