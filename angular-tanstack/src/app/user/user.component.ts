import { Component } from "@angular/core";

@Component({
	selector: "app-user",
	standalone: true,
	imports: [],
	templateUrl: "./user.component.html",
	styleUrl: "./user.component.css",
})
export class UserComponent {
	isServerRunning = true;

	users = [
		{ id: 0, name: "Sarah" },
		{ id: 1, name: "Amy" },
		{ id: 2, name: "Rachel" },
		{ id: 3, name: "Jessica" },
		{ id: 4, name: "Poornima" },
	];
}
