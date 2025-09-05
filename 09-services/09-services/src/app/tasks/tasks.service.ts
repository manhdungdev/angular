import {inject, Injectable, signal} from "@angular/core";
import {Task, TaskStatus} from "./task.model";
import {LoggingService} from "../logging.service";

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tasks = signal<Task[]>([])
  allTasks = this.tasks.asReadonly()
  private loggingService= inject(LoggingService)

  onAddTask(data: { title: string, description: string }) {
    const newTask: Task = {
      ...data,
      id: Math.random().toString(),
      status: 'OPEN'
    }

    this.tasks.update(oldTask => [...oldTask, newTask]);
    this.loggingService.log('Added item in to list')
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    this.tasks.update((oldTask) => oldTask.map(task => task.id === id ? {...task, status} : task));
    this.loggingService.log('Updated item in to list')
  }
}
