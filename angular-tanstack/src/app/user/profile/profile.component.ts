import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  name: string = 'John Doe';

  namaFunction() {
    return this.name;
  }
}
