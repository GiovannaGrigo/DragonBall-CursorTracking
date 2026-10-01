import {
  AfterViewInit,
  Component,
  ElementRef,
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

  private readonly cursorTrackerService = inject(CursorTrackerService);

  readonly cursorPosition = this.cursorTrackerService.position;

  private readonly headCenterX = signal(0);
  private readonly headCenterY = signal(0);

  readonly isBlinking = signal(false);

  private blinkTimer?: ReturnType<typeof setTimeout>;

  readonly pupilX = computed(() => {
    const dx = this.cursorPosition().x - this.headCenterX();

    return this.clamp(dx / 40, -8, 8);
  });

  readonly pupilY = computed(() => {
    const dy = this.cursorPosition().y - this.headCenterY();

    return this.clamp(dy / 40, -8, 8);
  });

  readonly headRotation = computed(() => {
    const dx = this.cursorPosition().x - this.headCenterX();

    return this.clamp(dx / 80, -8, 8);
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
