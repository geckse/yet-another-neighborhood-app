import { Injectable } from '@angular/core';

import { Task } from '../../models/Task';

import { AuthService } from './../auth-service/auth-service';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks: Observable<Task[]>;
  private tasksCollection: AngularFirestoreCollection<Task>;

  constructor(private afs: AngularFirestore, private auth: AuthService) {
    this.auth.getUid().then((userId)=>{
      this.tasksCollection = this.afs.collection<Task>('tasks',  ref => ref.where('owner', '==', userId));
      this.tasks = this.tasksCollection.snapshotChanges().pipe(
          map(actions => {
            return actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
            });
          })
      );
    });
  }

  getTasks(): Observable<Task[]> {
    return this.tasks;
  }

  getTask(id: string): Observable<Task> {
    return this.tasksCollection.doc<Task>(id).valueChanges().pipe(
      take(1),
      map(task => {
        task.id = id;
        return task
      })
    );
  }

  addTask(task: Task): Promise<DocumentReference> {
    //task.owner = this.owner;
    task = JSON.parse(JSON.stringify(task));
    return this.tasksCollection.add(task);
  }

  updateTask(task: Task): Promise<void> {
    // task.owner = this.owner;
    return this.tasksCollection.doc(task.id).set(task);
  }

  deleteTask(id: string): Promise<void> {
    return this.tasksCollection.doc(id).delete();
  }

}
