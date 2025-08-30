import {NewTaskFormRequest} from "./new-task/new-task.model";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class TasksService {
  private task = [
    {
      id: 't1',
      userId: 'u1',
      title: 'Hoàn thiện báo cáo',
      summary: 'Soạn báo cáo tuần và gửi cho trưởng nhóm',
      dueDate: '2025-08-18'
    },
    {
      id: 't2',
      userId: 'u2',
      title: 'Họp sprint planning',
      summary: 'Tham gia họp để lên kế hoạch sprint mới',
      dueDate: '2025-08-20'
    },
    {
      id: 't3',
      userId: 'u1',
      title: 'Fix bug giao diện',
      summary: 'Sửa lỗi hiển thị danh sách sản phẩm trên trang chủ',
      dueDate: '2025-08-22'
    },
    {
      id: 't4',
      userId: 'u1',
      title: 'Review pull request',
      summary: 'Kiểm tra và review PR từ team backend',
      dueDate: '2025-08-25'
    }
  ];

  constructor() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      this.task = JSON.parse(tasks)
    }
  }

  getSelectedUserTasks(userId: string) {
    return this.task.filter(task => task.userId === userId);
  }

  addTask(data: NewTaskFormRequest, userId: string) {
    this.task.push({
      ...data,
      userId: userId,
      id: (new Date()).getTime().toString()
    })
    this.saveData()
  }

  removeTask(taskId: string) {
    this.task = this.task.filter((task) => task.id !== taskId)
    this.saveData()
  }

  private saveData(){
    localStorage.setItem('tasks', JSON.stringify(this.task))
  }
}
