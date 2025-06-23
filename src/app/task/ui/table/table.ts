import { Component, effect, input } from '@angular/core';
import { Task } from '../../data-access/task';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-table',
  imports: [RouterLink],
  templateUrl: './table.html',
  styles: ``,
})
export class Table {
  tasks = input.required<Task[]>();
}
