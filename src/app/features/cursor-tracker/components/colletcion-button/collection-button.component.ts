import { Component, input, output } from "@angular/core";

@Component({
  selector: "app-collection-button",
  standalone: true,
  templateUrl: "./collection-button.component.html",
  styleUrl: "./collection-button.component.scss",
})
export class CollectionButtonComponent {
  readonly collectedCount = input.required<number>();
  readonly total = input<number>(7);

  readonly opened = output<void>();

  onOpen(): void {
    this.opened.emit();
  }
}
