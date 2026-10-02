import { Component, inject } from "@angular/core";

import { CursorTrackerService } from "../../../../core/services/cursor-tracker.service";
import { PersonagemComponent } from "../../../cursor-tracker/components/personagem/personagem.component";
import { MenuItem } from "../../models/menu-item.model";
import { SideMenuComponent } from "../../components/side-menu/side-menu.component";

@Component({
  selector: "app-home-page",
  standalone: true,
  imports: [PersonagemComponent, SideMenuComponent],
  templateUrl: "./home-page.component.html",
  styleUrl: "./home-page.component.scss"
})
export class HomePageComponent {
  private readonly cursorTrackerService = inject(CursorTrackerService);

  readonly leftMenu: MenuItem[] = [
    {
      label: "Esferas do Dragão",
      route: "/esferas-do-dragao",
    },
    {
      label: "Treinamento",
      route: "/treinamento",
    },
    {
      label: "Desafio do Ki",
      route: "/desafio-do-ki",
    },
    {
      label: "Entendendo as Sagas",
      route: "/sagas",
    },
  ];

  readonly rightMenu: MenuItem[] = [
    {
      label: "Mapa do Mundo",
      route: "/mapa",
    },
    {
      label: "Técnicas",
      route: "/tecnicas",
    },
    {
      label: "Transformações",
      route: "/transformacoes",
    },
    {
      label: "Personagens",
      route: "/personagens",
    },
  ];

  onMouseMove(event: MouseEvent): void {
    this.cursorTrackerService.updatePosition(event);
  }
}
