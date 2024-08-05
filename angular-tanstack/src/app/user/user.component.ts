import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentComponent } from './comment/comment.component';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterOutlet, Routes } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommentComponent, NgOptimizedImage, RouterOutlet, RouterLink],
  templateUrl: './user.component.html',
})
export class UserComponent {
  isServerRunning = true;
  message = '';
  users = [
    { id: 0, name: 'Sarah' },
    { id: 1, name: 'Amy' },
    { id: 2, name: 'Rachel' },
    { id: 3, name: 'Jessica' },
    { id: 4, name: 'Poornima' },
  ];
  isEditable = true;
  logoUrl = '/assets/logo.svg';
  logoAlt = 'Angular logo';
  username = 'youngTech';

  @Input() hobby = 'Coding';
  @Output() addItemEvent = new EventEmitter<string>();

  addItem() {
    this.addItemEvent.emit('🐢');
  }

  greet() {
    alert('Hello, welcome to Angular!');
  }

  onMouseOver() {
    this.message = 'Way to go 🚀';
  }
}
