import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
} from '@ionic/angular/standalone';
import * as QRCode from 'qrcode'; // Importación correcta del paquete QRCode

@Component({
  selector: 'app-home-docente',
  templateUrl: './home-docente.page.html',
  styleUrls: ['./home-docente.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
  ],
})
export class HomeDocentePage implements OnInit {
  sections: string[] = [
    '002V Arquitectura',
    '005V Programación Móvil',
    '002V Ciberseguridad',
    '005V Calidad de Software',
  ];

  selectedSection: string | null = null; // Sección seleccionada
  qrCode: string | null = null; // URL del QR generado

  constructor() {}

  ngOnInit() {}

  // Seleccionar una sección y generar QR único
  selectSection(section: string) {
    const confirm = window.confirm(
      `¿Deseas generar un código QR para la sección ${section}?`
    );
    if (confirm) {
      this.selectedSection = section;
      this.generateQRCode(section);
    }
  }

  // Generar un código QR único para la sección
  generateQRCode(section: string) {
    const uniqueData = `${section}-${Date.now()}`; // Crear datos únicos para el QR
    QRCode.toDataURL(uniqueData)
      .then((qrUrl: string) => {
        this.qrCode = qrUrl; // Guardar el QR generado como base64
      })
      .catch((error: Error) => {
        alert('Error al generar el código QR: ' + error.message);
        console.error('Error QRCode:', error);
      });
  }

  // Limpiar datos al cerrar QR
  clearQRCode() {
    this.selectedSection = null;
    this.qrCode = null;
  }
}
