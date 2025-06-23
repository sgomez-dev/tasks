import { AfterViewInit, Component, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService, TaskCreate, Task } from '../../data-access/task';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
  providers: [TaskService],
})
export default class TaskForm implements AfterViewInit {
  private _formBuilder = inject(FormBuilder);
  private _taskService = inject(TaskService);
  private _router = inject(Router);

  loadingSave = signal(false);
  loadingDelete = signal(false);

  idTask = input.required<string>();

  form = this._formBuilder.group({
    title: this._formBuilder.control('', Validators.required),
    completed: this._formBuilder.control(false, Validators.required),
  });

  ngAfterViewInit() {
    const id = this.idTask();
    if (id) {
      this.getTask(id);
    }
  }

  async submit() {
    if (this.form.invalid) return;
    try {
      this.loadingSave.set(true);
      const { title, completed } = this.form.value;
      const task: TaskCreate = {
        title: title || '',
        completed: !!completed,
      };

      const id = this.idTask();

      if (id) {
        await this._taskService.update(task, id);
      } else {
        await this._taskService.create(task);
      }

      toast.success(`Tarea ${id ? 'actualizada' : 'creada'} correctamente`);
      this._router.navigateByUrl('/tasks');
    } catch (error) {
      toast.error('Ha ocurrido un error');
    } finally {
      this.loadingSave.set(false);
    }
  }

  async delete() {
    try {
      this.loadingDelete.set(true);

      const id = this.idTask();

      if (id) {
        await this._taskService.delete(id);
      }

      toast.success(`Tarea eliminada correctamente`);
      this._router.navigateByUrl('/tasks');
    } catch (error) {
      toast.error('Ha ocurrido un error');
    } finally {
      this.loadingDelete.set(false);
    }
  }

  async getTask(id: string) {
    const taskSnapshot = await this._taskService.getTask(id);

    if (!taskSnapshot.exists()) return;

    const task = taskSnapshot.data() as Task;

    this.form.patchValue(task);
  }
}
