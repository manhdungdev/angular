import {Component, Input} from '@angular/core';
import {TaskComponent} from "./task/task.component";
import {NewTaskComponent} from "./new-task/new-task.component";
import {NewTaskFormRequest} from "./new-task/new-task.model";
import {TasksService} from "./tasks.service";

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    TaskComponent,
    NewTaskComponent
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  @Input({required: true}) userId!: string
  @Input({required: true}) name!: string
  isAddNewTask: boolean = false;

  constructor(private taskService: TasksService) {
  }

  get selectedUserTasks() {
    return this.taskService.getSelectedUserTasks(this.userId)
  }

  onStartAddNewTask() {
    this.isAddNewTask = true
  }

  onCloseDialog(){
    this.isAddNewTask = false
  }
}
