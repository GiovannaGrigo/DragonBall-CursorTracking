import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
  computed,
  inject,
  signal,
} from "@angular/core";

import { CursorTrackerService } from "../../../../core/services/cursor-tracker.service";

@Component({
  selector: "app-character",
  standalone: true,
  templateUrl: "./personagem.component.html",
  styleUrl: "./personagem.component.scss",
})
export class PersonagemComponent implements AfterViewInit, OnDestroy {
  @ViewChild("head")
  private headElement!: ElementRef<HTMLElement>;

  @HostListener("window:resize")
  onResize(): void {
    this.updateHeadPosition();
  }

  private readonly cursorTrackerService = inject(CursorTrackerService);

  readonly cursorPosition = this.cursorTrackerService.position;

  private readonly headCenterX = signal(0);
  private readonly headCenterY = signal(0);

  readonly isBlinking = signal(false);

  private blinkTimer?: ReturnType<typeof setTimeout>;

  readonly pupilOffset = computed(() => this.calculatePupilOffset());

  readonly headRotation = computed(() => {
    const dx = this.cursorPosition().x - this.headCenterX();

    return this.clamp(dx / 80, -8, 8);
  });

  readonly headImageSrc = computed(() => {
    return this.isBlinking()
      ? "assets/images/personagem/head-closed.png"
      : "assets/images/personagem/head-open.png";
  });

  ngAfterViewInit(): void {
    this.updateHeadPosition();
    this.scheduleBlink();
  }

  ngOnDestroy(): void {
    if (this.blinkTimer) {
      clearTimeout(this.blinkTimer);
    }
  }

  private calculatePupilOffset() {
    const dx = this.cursorPosition().x - this.headCenterX();
    const dy = this.cursorPosition().y - this.headCenterY();

    const angle = Math.atan2(dy, dx);

    const maxX = 7;
    const maxYUp = 2;
    const maxYDown = 5;
    const baseY = 5;

    const x = Math.cos(angle) * maxX;
    const sin = Math.sin(angle);

    const yMovement = sin < 0 ? sin * maxYUp : sin * maxYDown;

    return {
      x,
      y: baseY + yMovement,
    };
  }

  private scheduleBlink(): void {
    const nextBlink = 2000 + Math.random() * 4000;

    this.blinkTimer = setTimeout(() => {
      this.blink();

      this.scheduleBlink();
    }, nextBlink);
  }

  private blink(): void {
    this.isBlinking.set(true);

    setTimeout(() => {
      this.isBlinking.set(false);
    }, 150);
  }

  private updateHeadPosition(): void {
    const rect = this.headElement.nativeElement.getBoundingClientRect();

    this.headCenterX.set(rect.left + rect.width / 2);

    this.headCenterY.set(rect.top + rect.height / 2);
  }

  private clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  }
}
