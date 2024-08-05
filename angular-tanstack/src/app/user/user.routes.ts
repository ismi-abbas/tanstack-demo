import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { CommentComponent } from './comment/comment.component';

export const userRoutes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'comment',
    component: CommentComponent,
  },
];
