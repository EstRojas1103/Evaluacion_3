import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonLabel,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home-estudiante',
  templateUrl: './home-estudiante.page.html',
  styleUrls: ['./home-estudiante.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonLabel,
    CommonModule,
    FormsModule,
  ],
})
export class HomeEstudiantePage implements OnInit {
  studentName: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Cargar el nombre del estudiante desde el localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    if (currentUser && currentUser.email) {
      const user = users.find((u: any) => u.email === currentUser.email);
      this.studentName = user ? user.name : 'Estudiante';
    }
  }

  goToRegistrarQR() {
    // Redirige a la página de Registrar QR
    this.router.navigate(['/registrar-qr']);
  }

  logout() {
    // Elimina la sesión del usuario y redirige al login
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
