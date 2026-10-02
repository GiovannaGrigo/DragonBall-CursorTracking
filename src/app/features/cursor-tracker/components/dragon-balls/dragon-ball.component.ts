import { Component, computed, input, output } from "@angular/core";

import { CursorPosition } from "../../../cursor-tracker/models/cursor-position.model";
import { DragonBall } from "../../models/dragon-ball.model";
import { DragonBallState } from "../../models/dragon-ball-state.type";
import { calculateDistance } from "../../utils/dragon-ball-distance.util";

@Component({
  selector: "app-dragon-ball",
  standalone: true,
  templateUrl: "./dragon-ball.component.html",
  styleUrl: "./dragon-ball.component.scss",
})
export class DragonBallComponent {
  readonly ball = input.required<DragonBall>();
  readonly cursorPosition = input.required<CursorPosition>();

  readonly collected = output<DragonBall>();

  readonly state = computed<DragonBallState>(() => {
    if (this.ball().collected) {
      return "collected";
    }

    const distance = this.calculateDistanceFromCursor();

    if (distance <= 80) {
      return "very-near";
    }

    if (distance <= 180) {
      return "near";
    }

    return "normal";
  });

  readonly imageSrc = computed(() => {
    const stars = this.ball().stars;

    if (stars === 1) {
      return "assets/images/dragon-balls/esfera-1-estrela.png";
    }

    return `assets/images/dragon-balls/esfera-${stars}-estrelas.png`;
  });

  onCollect(): void {
    if (this.ball().collected) {
      return;
    }

    this.collected.emit(this.ball());
  }

  private calculateDistanceFromCursor(): number {
    const elementX = (this.ball().x / 100) * window.innerWidth;

    const elementY = (this.ball().y / 100) * window.innerHeight;

    return calculateDistance(
      this.cursorPosition().x,
      this.cursorPosition().y,
      elementX,
      elementY,
    );
  }
}
