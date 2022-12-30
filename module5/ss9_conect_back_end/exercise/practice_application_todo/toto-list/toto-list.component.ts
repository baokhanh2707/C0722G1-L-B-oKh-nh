import {Component, OnInit} from '@angular/core';
import {Todo} from '../app-todo/todo';
import {TodoService} from '../todo.service';

@Component({
    selector: 'app-toto-list',
    templateUrl: './toto-list.component.html',
    styleUrls: ['./toto-list.component.css']
})
export class TotoListComponent implements OnInit {
    temp: Todo = {};
    todoes: Todo[] = [];

    constructor(private todoService: TodoService) {
        this.todoService.getAll().subscribe(data => {
            console.log(data);
            this.todoes = data;
        }, error => {
        }, () => {
        });
    }

    ngOnInit(): void {
    }

    toggleTodo(i: number): void {
        console.log(1);
        this.todoes[i].complete = !this.todoes[i].complete;
    }
}
