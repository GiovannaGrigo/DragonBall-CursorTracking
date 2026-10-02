import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MenuItem } from '../../models/menu-item.model';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent {
  readonly items = input.required<MenuItem[]>();

  readonly side = input<'left' | 'right'>('left');
}