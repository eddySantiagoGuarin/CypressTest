import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  newTaskTitle: string = '';

  tasks: Task[] = [
    { id: 1, title: 'Estudiar Angular 17', completed: true },
    { id: 2, title: 'Aprender automatización con Cypress', completed: false }
  ];

  addTask(): void {
    if (this.newTaskTitle.trim()) {
      this.tasks.push({
        id: Date.now(),
        title: this.newTaskTitle.trim(),
        completed: false
      });
      this.newTaskTitle = '';
    }
  }

  toggleTask(task: Task): void {
    task.completed = !task.completed;
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }
}