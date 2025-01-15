import { Component, inject } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
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
  data = inject(DatabaseService);

  drop(event: CdkDragDrop<TaskInterface[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
