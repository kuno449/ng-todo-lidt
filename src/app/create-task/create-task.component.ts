import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

import {HttpClient} from '@angular/common/http';
import {Task} from 'src/model/task';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  model: NgbDateStruct;
  createTaskForm: FormGroup;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.createTaskForm = new FormGroup(
      {
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        date: new FormControl('', [Validators.required])
      }
    );
  }

  createTask() {

    const task = {
      title: this.createTaskForm.controls.title.value,
      description: this.createTaskForm.controls.description.value,
    } as Task;

    const dateS = this.createTaskForm.controls.date.value;
    task.date = new Date(dateS.year, dateS.month, dateS.day);

    this.httpClient.post<Task>('http://localhost:8080/api/tasks', task).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

}
