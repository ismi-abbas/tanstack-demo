import { Component, inject } from "@angular/core";
import {
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { CarService } from "../services/car.service";
import { AuthService } from "../services/auth.service";

@Component({
	selector: "app-home",
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule],
	templateUrl: "./home.component.html",
})
export class HomeComponent {
	display = "";
	carService = inject(CarService);

	constructor(private authService: AuthService) {
		this.display = this.carService.getCars().join(" ⭐️ ");
	}

	login() {
		this.authService.login();
	}

	userList: string[] = [];
	username = "";
	email = "";

	profileForm = new FormGroup({
		occupation: new FormControl("", Validators.required),
		age: new FormControl(0, Validators.required),
	});

	handleSubmit() {
		alert(
			`${this.profileForm.value.occupation} | ${this.profileForm.value.age}`,
		);
	}
}
