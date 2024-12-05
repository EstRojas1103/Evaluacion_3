import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss'],
})
export class RegisterModalComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      career: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      console.log('User registered successfully:', this.registerForm.value);
      alert('Registro exitoso!');
      this.closeModal();
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
