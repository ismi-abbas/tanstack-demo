import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserComponent } from './user/user.component';
import { AngularQueryDevtools } from '@tanstack/angular-query-devtools-experimental';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserComponent, RouterLink, AngularQueryDevtools],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'angular-tanstack';

  items = new Array();

  addItem(item: string) {
    this.items.push(item);
  }
}
