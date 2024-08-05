import type { Routes } from "@angular/router";
import { UserComponent } from "./user/user.component";
import { HomeComponent } from "./home/home.component";
import { SpartanComponent } from "./spartan/spartan.component";

export const routes: Routes = [
	{
		path: "user",
		title: "User",
		component: UserComponent,
	},
	{
		path: "home",
		title: "Home",
		component: HomeComponent,
	},
	{
		path: "spartan",
		title: "Spartan",
		component: SpartanComponent,
	},
];
