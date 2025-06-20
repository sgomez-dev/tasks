import { Component, inject } from '@angular/core';
import { getFirestore } from '@angular/fire/firestore';
import { hasEmailError, isRequired } from '../../utils/validators';

import {
  FormBuilder,
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../data-access/auth';
import { toast } from 'ngx-sonner';

interface FormSignUp {
  email: FormControl<string | null>;
  pass: FormControl<string | null>;
}
@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styles: ``,
})
export default class SignUp {
  private _formBuilder = inject(NonNullableFormBuilder);
  private _authService = inject(AuthService);

  isRequired(field: 'email' | 'pass') {
    return isRequired(field, this.form);
  }

  hasEmailError() {
    return hasEmailError(this.form);
  }

  form = this._formBuilder.group<FormSignUp>({
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
      await this._authService.signUp({ email, pass });

      toast.success('Usuario creado correctamente');
    } catch (error) {
      toast.error('Ha ocurrido un error');
    }
  }
}
