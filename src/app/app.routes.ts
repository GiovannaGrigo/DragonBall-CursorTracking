import { Routes } from "@angular/router";
import { HomePageComponent } from "./features/cursor-tracker/pages/home/home-page.component";

export const routes: Routes = [
  {
    path: "",
    component: HomePageComponent,
  },
  {
    path: "esferas-do-dragao",
    loadComponent: () =>
      import("./features/cursor-tracker/pages/dragon-balls-page/dragon-balls-page.component").then(
        (m) => m.DragonBallsPageComponent,
      ),
  },
  {
    path: "**",
    redirectTo: "",
  },
];
