import { Injectable } from '@angular/core';
import { TaskInterface } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  todo: TaskInterface[] = [
    { title: 'Task 1', description: 'Description' },
    { title: 'Task 2', description: 'Description' }
  ];

  inProgress: TaskInterface[] = [
    { title: 'Task 3', description: 'Description' },
    { title: 'Task 4', description: 'Description' }
  ];

  awaitFeedback: TaskInterface[] = [
    { title: 'Task 5', description: 'Description' },
    { title: 'Task 6', description: 'Description' }
  ];

  done: TaskInterface[] = [
    { title: 'Task 7', description: 'Description' },
    { title: 'Task 8', description: 'Description' }
  ];
}
