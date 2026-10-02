import { Routes } from "@angular/router";
import { CursorTrackerPageComponent } from "./features/cursor-tracker/pages/cursor-tracker-page/cursor-tracker-page.component";
import { HomePageComponent } from './features/cursor-tracker/pages/home/home-page.component';

export const routes: Routes = [
  {
    path: "",
    component: HomePageComponent,
  },
  {
    path: "**",
    redirectTo: "",
  },
];
