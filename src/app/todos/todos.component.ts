import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '../../../node_modules/@angular/common/http';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  public todos: Array<any>;
  public description: string;
  private httpOptions: any;

  constructor(public http: HttpClient) { }

  ngOnInit() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.getLoadTodo();
  }

  getLoadTodo() {
    this.http.get('/api/todo')
      .subscribe((data: any) => {
        this.todos = data;
        console.log(data);
      });
  }

  onSaveTodo() {
    if (!this.description || this.description.length === 0) {
      alert('Digite a descrição ...');
    } else {
    this.http.post('/api/todo/create', {'description': this.description}, this.httpOptions)
      .subscribe((data: any) => {
        this.todos.push(data);
      });
    }
  }

}
