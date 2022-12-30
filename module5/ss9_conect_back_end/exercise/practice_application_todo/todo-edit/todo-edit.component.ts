import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {TodoService} from '../todo.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Todo} from '../app-todo/todo';

@Component({
    selector: 'app-todo-edit',
    templateUrl: './todo-edit.component.html',
    styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit {
    todo: Todo = {};
    @Input() tempToDoEdit: Todo = {};
    todoForm: FormGroup = new FormGroup({
        id: new FormControl(''),
        content: new FormControl(''),
        complete: new FormControl(false),
    });
    id: number = 0;

    constructor(private todoService: TodoService,
                private activatedRoute: ActivatedRoute,
                private route: Router) {
        this.activatedRoute.paramMap.subscribe(data => {

            this.id = parseInt(<string>data.get('id'));
            this.getTodo(this.id);
        });
    }


    ngOnInit(): void {
    }


    private getTodo(id: number) {
        return this.todoService.findById(id).subscribe(data => {
            console.log(data);
            this.todoForm.patchValue(data);
        });
    }

    editTodo(id: number) {
        let todo = this.todoForm.value;
        this.todoService.edit(id, todo).subscribe(() => {
            alert("Edit success");
            this.route.navigateByUrl('/todo');
        }, error => {
        }, () => {
        })
    }
}
