import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {TasksService} from "../tasks.service";

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {
  @Input({required:true}) userId!: string;
  @Output() closeDialog = new EventEmitter()

  private tasksService = inject(TasksService)

  enterTitle = ''
  enterDueDate = ''
  enterSummary = ''

  onCloseDialog() {
    this.closeDialog.emit();
  }

  onSubmit(){
    this.tasksService.addTask({
      title: this.enterTitle,
      dueDate: this.enterDueDate,
      summary: this.enterSummary
    }, this.userId)
    this.onCloseDialog()
  }
}
