import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";

describe("AppComponent", () => {
	let component: AppComponent;
	let fixture: ComponentFixture<AppComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppComponent],
		}).compileComponents();

		const fixture = TestBed.createComponent(AppComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});

	it("should have a nav element", () => {
		const navElement = fixture.nativeElement.querySelector("nav");
		expect(navElement).toBeTruthy();
	});

	it("should have three navigation links", () => {
		const links = fixture.nativeElement.querySelectorAll("nav a");
		expect(links.length).toBe(3);
	});

	it("should have correct routerLinks for navigation", () => {
		const links = fixture.nativeElement.querySelectorAll("nav a");
		expect(links[0].getAttribute("routerLink")).toBe("/home");
		expect(links[1].getAttribute("routerLink")).toBe("/about");
		expect(links[2].getAttribute("routerLink")).toBe("/contact");
	});

	it("should have a main element", () => {
		const mainElement = fixture.nativeElement.querySelector("main");
		expect(mainElement).toBeTruthy();
	});

	it("should have a router-outlet in the main element", () => {
		const routerOutlet =
			fixture.nativeElement.querySelector("main router-outlet");
		expect(routerOutlet).toBeTruthy();
	});
});
