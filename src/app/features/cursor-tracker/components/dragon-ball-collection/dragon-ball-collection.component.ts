import { Component, input, output } from "@angular/core";

import { DragonBall } from "../../models/dragon-ball.model";
import { getDragonBallImage } from "../../utils/dragon-ball-image.util";

@Component({
  selector: "app-dragon-ball-collection",
  standalone: true,
  templateUrl: "./dragon-ball-collection.component.html",
  styleUrl: "./dragon-ball-collection.component.scss",
})
export class DragonBallCollectionComponent {
  readonly dragonBalls = input.required<DragonBall[]>();

  readonly closed = output<void>();

  readonly getDragonBallImage = getDragonBallImage;

  get collectedCount(): number {
    return this.dragonBalls().filter((ball) => ball.collected).length;
  }

  onClose(): void {
    this.closed.emit();
  }

  stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }
}