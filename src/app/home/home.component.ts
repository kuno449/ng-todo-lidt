import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Task} from 'src/model/task';
import {Router} from '@angular/router';
import {TodoService} from '../todo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges {

  constructor(private router: Router,
              private todoService: TodoService) { }

  tasks: Task[];

  ngOnInit(): void {
    this.refresh();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.refresh();
  }

  refresh(){
    this.todoService.getAllTasks().subscribe(data => {
      console.log(JSON.stringify(data));
      this.tasks = data;
    });
  }

  createNew() {
    this.router.navigate(['create']);
  }

  editTask(task: Task) {
    this.router.navigate(['create'],  {state: task});
  }

  deleteTask(task: Task) {
    this.tasks.splice(this.tasks.indexOf(task), 1);
    this.todoService.deleteTask(task.id).subscribe();
  }
}
