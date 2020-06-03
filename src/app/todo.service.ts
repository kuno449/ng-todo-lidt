import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Task } from 'src/model/task';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private baseUrl = 'http://localhost:8080/api/tasks';

  constructor(private httpClient: HttpClient) {}

  public getAllTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.baseUrl);
  }

  public createTask(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(this.baseUrl, task);
  }

  public updateTask(task: Task): Observable<Object> {
    return this.httpClient.put(this.baseUrl + '/' + task.id, task);
  }

  public deleteTask(taskID: number) {
    return this.httpClient.delete(this.baseUrl + '/' + taskID);
  }
}
