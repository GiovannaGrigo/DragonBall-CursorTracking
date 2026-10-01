import { Injectable, signal } from "@angular/core";
import { CursorPosition } from "../../features/cursor-tracker/models/cursor-position.model";

@Injectable({
  providedIn: "root"
})
export class CursorTrackerService {
  private readonly _position = signal<CursorPosition>({
    x: 0,
    y: 0
  });

  readonly position = this._position.asReadonly();

  updatePosition(event: MouseEvent): void {
    this._position.set({
      x: event.clientX,
      y: event.clientY
    });
  }
}
