import { Component, ElementRef, ViewChild, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import QrScanner from 'qr-scanner'; // Librería para escanear QR

@Component({
  selector: 'app-registrar-qr',
  templateUrl: './registrar-qr.page.html',
  styleUrls: ['./registrar-qr.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonSelect,
    IonSelectOption,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RegistrarQrPage implements OnInit {
  @ViewChild('video') videoElement!: ElementRef<HTMLVideoElement>;
  videoStream: MediaStream | null = null;
  sections: string[] = [
    '002V Arquitectura',
    '005V Programación Móvil',
    '002V Ciberseguridad',
    '005V Calidad de Software',
  ];
  selectedSection: string | null = null; // Sección seleccionada
  attendanceMessage: string | null = null; // Mensaje de asistencia
  qrScanner: QrScanner | null = null; // Instancia del escáner

  constructor() {}

  ngOnInit() {}

  // Seleccionar una sección
  selectSection(section: string) {
    this.selectedSection = section;
    this.attendanceMessage = null; // Limpiar mensajes previos
    alert(`Has seleccionado la sección: ${section}`);
    this.activateCamera(); // Activar cámara al seleccionar sección
  }

  // Activar la cámara para escanear QR
  async activateCamera() {
    if (!this.selectedSection) {
      alert('Por favor selecciona una sección antes de activar la cámara.');
      return;
    }

    try {
      this.videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = this.videoElement.nativeElement;
      video.srcObject = this.videoStream;
      video.play();

      // Configurar el escáner de QR
      this.qrScanner = new QrScanner(video, (result: string) => {
        this.handleQRCodeScanned(result);
      });
      this.qrScanner.start();
    } catch (error: any) {
      console.error('Error al activar la cámara:', error);
      alert('Error al activar la cámara: ' + error.message);
    }
  }

  // Manejar el código QR escaneado
  handleQRCodeScanned(result: string) {
    console.log('Código QR escaneado:', result);

    if (!this.selectedSection) {
      alert('Por favor selecciona una sección antes de escanear el código QR.');
      return;
    }

    // Registrar asistencia
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();

    this.attendanceMessage = `Asistencia registrada para ${this.selectedSection} el ${formattedDate} a las ${formattedTime}. ¡Asistencia exitosa!`;

    // Guardar en el localStorage
    const attendanceRecord = {
      section: this.selectedSection,
      date: formattedDate,
      time: formattedTime,
    };
    this.saveToLocalStorage(attendanceRecord);

    // Detener la cámara después de escanear
    this.stopCamera(this.videoElement.nativeElement);
  }

  // Guardar en localStorage
  saveToLocalStorage(record: { section: string; date: string; time: string }) {
    const storedRecords = JSON.parse(localStorage.getItem('attendanceRecords') || '[]');
    storedRecords.push(record);
    localStorage.setItem('attendanceRecords', JSON.stringify(storedRecords));
    console.log('Asistencia guardada en localStorage:', storedRecords);
  }

  // Detener la cámara
  stopCamera(video: HTMLVideoElement) {
    if (this.videoStream) {
      const tracks = this.videoStream.getTracks();
      tracks.forEach((track) => track.stop());
      this.videoStream = null;
    }
    if (this.qrScanner) {
      this.qrScanner.stop();
      this.qrScanner.destroy();
      this.qrScanner = null;
    }
    video.pause();
    video.srcObject = null;
  }
}
