import { Component, OnInit } from '@angular/core';
import {Task} from 'src/model/task';
import {Router} from '@angular/router';
import {TodoService} from '../todo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
              private todoService: TodoService) { }

  tasks: Task[];

  ngOnInit(): void {
      this.tasks = this.todoService.getAllTasks();
  }

  createNew() {
    this.router.navigate(['create']);
  }
}
