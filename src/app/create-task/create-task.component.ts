import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {HttpClient} from '@angular/common/http';
import {Task} from 'src/model/task';
import {TodoService} from '../todo.service';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
  providers: [DatePipe]
})
export class CreateTaskComponent implements OnInit {

  createTaskForm: FormGroup;

  isUpdate = false;
  editTask = null;
  editDate = null;

  constructor(private router: Router, private datePipe: DatePipe,
              private httpClient: HttpClient, private todoService: TodoService) {
    if (this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras.state){
      this.isUpdate = true;
      this.editTask = this.router.getCurrentNavigation().extras.state;
      this.editDate = new Date(this.editTask.date);
    }
  }

  ngOnInit(): void {
    this.createTaskForm = new FormGroup(
      {
        title: new FormControl(this.isUpdate ? this.editTask.title : '', [Validators.required]),
        description: new FormControl(this.isUpdate ? this.editTask.description : ''),
        date: new FormControl(this.isUpdate ? { year: this.editDate.getFullYear(),
          month: this.editDate.getMonth() + 1, day: this.editDate.getDate() } : '', [Validators.required])
      }
    );
  }

  createTask() {

    if (!this.createTaskForm.valid) { return; }

    const task = {
      title: this.createTaskForm.controls.title.value,
      description: this.createTaskForm.controls.description.value,
    } as Task;

    const dateS = this.createTaskForm.controls.date.value;
    task.date = new Date(dateS.year, (dateS.month - 1), dateS.day);

    if(this.isUpdate) task.id = this.editTask.id;

    if(this.isUpdate) {
      this.todoService.updateTask(task).subscribe(data => {
        console.log(JSON.stringify(data));
      });
    } else {
      this.todoService.createTask(task).subscribe(data => {
        console.log(JSON.stringify(data));
      });
    }

    this.router.navigate(['']);
  }

  backToHome() {
    this.router.navigate(['']);
  }
}
