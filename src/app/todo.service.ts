import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Task } from 'src/model/task';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  MAXIMUM_NUMBER_TASKS = 5;

  constructor(private httpClient: HttpClient) {}

  public createTask(task: Task) {
    if (this.getAllTasks().length < this.MAXIMUM_NUMBER_TASKS) { return; }
    this.httpClient.post<Task>('http://localhost:8080/api/tasks', task).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

  // @ts-ignore
  public getAllTasks(): Task[] {
    this.httpClient.get<Task[]>('http://localhost:8080/api/tasks').subscribe(data => {
      console.log(JSON.stringify(data));
      return data;
    }, error => {
      console.log(error);
    });
  }

  public updateTask(taskID: number, task: Task) {
    this.httpClient.put<void>('http://localhost:8080/api/taskstasks?id=' + taskID, {param: task}).subscribe(data => {
      console.log(JSON.stringify(data));
    }, error => {
      console.log(error);
    });
  }

  private deleteTask(taskID: number) {
    this.httpClient.delete<void>('http://localhost:8080/api/tasks?id=' + taskID).subscribe(data => {
      console.log(JSON.stringify(data));
    }, error => {
      console.log(error);
    });
  }
}
