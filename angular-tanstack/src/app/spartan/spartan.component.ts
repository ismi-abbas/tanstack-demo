import { Component } from "@angular/core";
import { provideIcons } from "@ng-icons/core";
import { lucideBell, lucideCheck } from "@ng-icons/lucide";
import { HlmButtonDirective } from "@spartan-ng/ui-button-helm";
import {
	HlmCardContentDirective,
	HlmCardDescriptionDirective,
	HlmCardDirective,
	HlmCardFooterDirective,
	HlmCardHeaderDirective,
	HlmCardTitleDirective,
} from "@spartan-ng/ui-card-helm";
import { HlmSwitchComponent } from "@spartan-ng/ui-switch-helm";
import { HlmIconComponent } from "@spartan-ng/ui-icon-helm";

@Component({
	selector: "app-spartan",
	standalone: true,
	imports: [
		HlmButtonDirective,
		HlmCardContentDirective,
		HlmCardDescriptionDirective,
		HlmCardDirective,
		HlmCardFooterDirective,
		HlmCardHeaderDirective,
		HlmCardTitleDirective,
		HlmSwitchComponent,
		HlmIconComponent,
	],
	providers: [provideIcons({ lucideCheck, lucideBell })],
	templateUrl: "./spartan.component.html",
})
export class SpartanComponent {
	protected notifications = [
		{
			id: 1,
			title: "Your call has been confirmed.",
			description: "1 hour ago",
		},
		{
			id: 2,
			title: "You have a new message!",
			description: "1 hour ago",
		},
		{
			id: 3,
			title: "Your subscription is expiring soon!",
			description: "2 hours ago",
		},
	];
}
