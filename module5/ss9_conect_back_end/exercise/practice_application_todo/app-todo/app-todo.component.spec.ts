import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTodoComponent } from './app-todo.component';

describe('AppTodoComponent', () => {
  let component: AppTodoComponent;
  let fixture: ComponentFixture<AppTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppTodoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
