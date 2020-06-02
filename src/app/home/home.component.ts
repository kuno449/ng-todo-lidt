import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Task} from 'src/model/task';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
              private httpClient: HttpClient) { }

  tasks: Task[];

  ngOnInit(): void {
    this.httpClient.get<Task[]>('http://localhost:8080/api/tasks').subscribe(data => {
      console.log(JSON.stringify(data));
      this.tasks = data;
    }, error => {
      console.log(error);
    });
  }

  createNew() {
    this.router.navigate(['create']);
  }
}
