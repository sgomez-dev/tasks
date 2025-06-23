import { Component, inject } from '@angular/core';
import {
  RouterModule,
  Router,
  RouterOutlet,
  RouterLink,
} from '@angular/router';

import { NgxSonnerToaster } from 'ngx-sonner';
import { AuthStateService } from '../../shared/data-access/auth-state.service';
import { toast } from 'ngx-sonner';

@Component({
  standalone: true,
  imports: [RouterModule, RouterLink],
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export default class LayoutComponent {
  private _authState = inject(AuthStateService);
  private _router = inject(Router);

  async logOut() {
    try {
      await this._authState.logOut();
      this._router.navigateByUrl('/auth/sign-in');
    } catch (error) {
      toast.error('Ha ocurrido un error');
    }
  }
}
