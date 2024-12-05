import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      // Buscar al usuario en el localStorage
      const user = users.find(
        (u: any) => u.email === email && u.password === password
      );

      if (user) {
        // Redirigir según el tipo de usuario
        if (user.userType === 'estudiante') {
          this.router.navigate(['/home-estudiante']);
        } else if (user.userType === 'docente') {
          this.router.navigate(['/home-docente']);
        }
      } else {
        alert('Correo o contraseña incorrectos. Por favor, inténtelo de nuevo.');
      }
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
