import { Injectable, inject, OnDestroy } from '@angular/core';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { TaskInterface } from '../interfaces/task.interface';
import { doc, updateDoc } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService implements OnDestroy {
  firestore: Firestore = inject(Firestore);

  todo: TaskInterface[] = [];
  inProgress: TaskInterface[] = [];
  awaitFeedback: TaskInterface[] = [];
  done: TaskInterface[] = [];

  unsubscribe;

  constructor() {
    this.unsubscribe = onSnapshot(collection(this.firestore, 'tasks'), (list) => {
      // Clearing arrays so that content is not displayed multiple times
      this.todo = [];
      this.inProgress = [];
      this.awaitFeedback = [];
      this.done = [];

      list.forEach((element) => {
        const task = this.setTaskObjects(element.data(), element.id);
        this.categorizeTask(task);
      });
    });
  }

  // Convert the task document data into a TaskInterface object
  setTaskObjects(obj: any, id: string): TaskInterface {
    return {
      id: id || '',
      title: obj.title || '',
      description: obj.description || '',
      status: obj.status
    };
  }

  // Categorizes tasks based on their status and pushes them into their respective arrays
  categorizeTask(task: TaskInterface) {
    if (task.status === 'todo') {
      this.todo.push(task);
    } else if (task.status === 'in-progress') {
      this.inProgress.push(task);
    } else if (task.status === 'await-feedback') {
      this.awaitFeedback.push(task);
    } else if (task.status === 'done') {
      this.done.push(task);
    }
  }

  // Update task in firebase
  async updateTaskStatus(taskId: string, newStatus: string) {
    const taskDocRef = doc(this.firestore, `tasks/${taskId}`);
    await updateDoc(taskDocRef, { status: newStatus })
      .catch((error) => {
        console.error(error);
      });
  }

  // Unsubscribe from Firestore listener when the service is destroyed
  ngOnDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}


