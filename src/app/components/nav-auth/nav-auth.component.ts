import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../core/services/auth.service';
import { Component, inject } from "@angular/core";

@Component({
  selector: 'app-nav-auth',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-auth.component.html',
  styleUrl: './nav-auth.component.scss'
})
export class NavAuthComponent {
}
