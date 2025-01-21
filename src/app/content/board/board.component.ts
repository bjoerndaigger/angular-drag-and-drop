import { Component, inject } from '@angular/core';
// import { DatabaseService } from '../../services/database.service';
import { FirebaseService } from '../../services/firebase.service';
import { TaskInterface } from '../../interfaces/task.interface';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CdkDropListGroup, CdkDropList, CdkDrag],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})

export class BoardComponent {
  // data = inject(DatabaseService);
  data = inject(FirebaseService)

  drop(event: CdkDragDrop<TaskInterface[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const currentTask = event.container.data[event.currentIndex];

      console.log("Task ID ", currentTask.id);
      console.log("Old status ", currentTask.status);
      console.log("New status ", event.container.id);

      // Update the status of the task in the database (Parameter: taskId, newStatus)
      this.data.updateTaskStatus(currentTask.id!, event.container.id);
    }
  }
}
