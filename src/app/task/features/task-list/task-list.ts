import { Component, inject } from '@angular/core';
import { Table } from '../../ui/table/table';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../data-access/task';

@Component({
  selector: 'app-task-list',
  imports: [Table, RouterLink],
  templateUrl: './task-list.html',
  styles: ``,
  providers: [TaskService],
})
export default class TaskList {
  tasksService = inject(TaskService);
}
