import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;
  userType: 'estudiante' | 'docente' | null = null;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      career: [''], // Campo solo para estudiantes
      name: [''], // Campo solo para estudiantes
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  selectUserType(type: 'estudiante' | 'docente') {
    this.userType = type;

    if (type === 'docente') {
      // Ajustar formulario para docentes
      this.registerForm.get('career')?.clearValidators();
      this.registerForm.get('name')?.clearValidators();
    } else if (type === 'estudiante') {
      // Ajustar formulario para estudiantes
      this.registerForm.get('career')?.setValidators(Validators.required);
      this.registerForm.get('name')?.setValidators(Validators.required);
    }

    this.registerForm.get('career')?.updateValueAndValidity();
    this.registerForm.get('name')?.updateValueAndValidity();
  }

  onRegister() {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      // Verificar si el usuario ya existe
      const userExists = users.some((user: any) => user.email === userData.email);

      if (userExists) {
        alert('Este correo ya está registrado.');
        return;
      }

      // Guardar nuevo usuario
      users.push({ ...userData, userType: this.userType });
      localStorage.setItem('users', JSON.stringify(users));
      alert('Registro exitoso!');
      this.router.navigate(['/login']); // Redirigir al login
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }
}
