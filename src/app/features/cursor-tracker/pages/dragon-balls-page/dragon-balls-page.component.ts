import { Component, computed, inject, signal } from "@angular/core";

import { CursorTrackerService } from "../../../../core/services/cursor-tracker.service";
import { DragonBallComponent } from "../../components/dragon-balls/dragon-ball.component";
import { CollectionButtonComponent } from "../../components/colletcion-button/collection-button.component";
import { DragonBall } from "../../models/dragon-ball.model";
import { DragonBallCollectionComponent } from "../../components/dragon-ball-collection/dragon-ball-collection.component";
import { RouterLink } from "@angular/router";
import { ShenlongSummonComponent } from "../../components/shenlong-summon/shenlong-summon.component";

@Component({
  selector: "app-dragon-balls-page",
  standalone: true,
  imports: [
    RouterLink,
    DragonBallComponent,
    CollectionButtonComponent,
    DragonBallCollectionComponent,
    ShenlongSummonComponent
  ],
  templateUrl: "./dragon-balls-page.component.html",
  styleUrl: "./dragon-balls-page.component.scss",
})
export class DragonBallsPageComponent {
  private readonly cursorTrackerService = inject(CursorTrackerService);

  readonly cursorPosition = this.cursorTrackerService.position;

  readonly isShenlongSummoned = signal(false);

  readonly dragonBalls = signal<DragonBall[]>([
    {
      id: 1,
      stars: 1,
      x: 6.7,
      y: 19.5,
      size: 32,
      collected: false,
      location: "bush",
    },
    {
      id: 2,
      stars: 2,
      x: 16,
      y: 76.5,
      size: 50,
      collected: false,
      location: "rock",
    },
    {
      id: 3,
      stars: 3,
      x: 51,
      y: 91.3,
      size: 58,
      collected: false,
      location: "field",
    },
    {
      id: 4,
      stars: 4,
      x: 21.9,
      y: 50.6,
      size: 26,
      collected: false,
      location: "house",
    },
    {
      id: 5,
      stars: 5,
      x: 91.5,
      y: 66.8,
      size: 33,
      collected: false,
      location: "field",
    },
    {
      id: 6,
      stars: 6,
      x: 85.8,
      y: 15,
      size: 20,
      collected: false,
      location: "bush",
    },
    {
      id: 7,
      stars: 7,
      x: 68.9,
      y: 54,
      size: 27,
      collected: false,
      location: "field",
    },
  ]);

  readonly collectedCount = computed(
    () => this.dragonBalls().filter((ball) => ball.collected).length,
  );

  readonly allCollected = computed(() => this.collectedCount() === 7);

  readonly isCollectionOpen = signal(false);

  onMouseMove(event: MouseEvent): void {
    this.cursorTrackerService.updatePosition(event);
  }

  collectDragonBall(ball: DragonBall): void {
    this.dragonBalls.update((balls) =>
      balls.map((item) =>
        item.id === ball.id
          ? {
              ...item,
              collected: true,
            }
          : item,
      ),
    );
  }

  openCollection(): void {
    this.isCollectionOpen.set(true);
  }

  closeCollection(): void {
    this.isCollectionOpen.set(false);
  }

  summonShenlong(): void {
    if (!this.allCollected()) {
      return;
    }

    this.isCollectionOpen.set(false);
    this.isShenlongSummoned.set(true);
  }
}
