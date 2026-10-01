import { Component } from "@angular/core";
import { PersonagemComponent } from "../../components/personagem/personagem.component";

@Component({
  selector: "app-cursor-tracker-page",
  standalone: true,
  imports: [PersonagemComponent],
  templateUrl: "./cursor-tracker-page.component.html",
  styleUrl: "./cursor-tracker-page.component.scss",
})
export class CursorTrackerPageComponent {}
