import { Component, inject } from "@angular/core";
import { PersonagemComponent } from "../../components/personagem/personagem.component";
import { CursorTrackerService } from "src/app/core/services/cursor-tracker.service";

@Component({
  selector: "app-cursor-tracker-page",
  standalone: true,
  imports: [PersonagemComponent],
  templateUrl: "./cursor-tracker-page.component.html",
  styleUrl: "./cursor-tracker-page.component.scss",
})
export class CursorTrackerPageComponent {
   private readonly cursorTrackerService = inject(CursorTrackerService);

  readonly cursorPosition = this.cursorTrackerService.position;

  onMouseMove(event: MouseEvent): void {
    this.cursorTrackerService.updatePosition(event);
  }
}
