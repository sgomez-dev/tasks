import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';
import { AuthService } from '../../data-access/auth';
import { isRequired, hasEmailError } from '../../utils/validators';
import { GoogleButton } from '../../ui/google-button/google-button';

export interface FormSignIn {
  email: FormControl<string | null>;
  pass: FormControl<string | null>;
}

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule, RouterLink, GoogleButton],
  templateUrl: './sign-in.html',
  styles: ``,
})
export default class SignIn {
  private _formBuilder = inject(NonNullableFormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  isRequired(field: 'email' | 'pass') {
    return isRequired(field, this.form);
  }

  hasEmailError() {
    return hasEmailError(this.form);
  }

  form = this._formBuilder.group<FormSignIn>({
    email: this._formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    pass: this._formBuilder.control('', Validators.required),
  });

  async submit() {
    if (this.form.invalid) return;
    try {
      const { email, pass } = this.form.value;

      if (!email || !pass) return;
      await this._authService.signIn({ email, pass });

      toast.success('Se ha iniciado sesión correctamente');
      this._router.navigateByUrl('/tasks');
    } catch (error) {
      toast.error('Ha ocurrido un error');
    }
  }

  async submitWithGoogle() {
    try {
      await this._authService.signInGoogle();
      toast.success('Bienvenido de nuevo.');
      this._router.navigateByUrl('/tasks');
    } catch (error) {
      toast.error('Ha ocurrido un error');
    }
  }
}
