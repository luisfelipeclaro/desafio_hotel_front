import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(private http: HttpClient) { }

  form = new FormGroup({
    // $key: new FormControl(null),
    dataEntrada: new FormControl('', Validators.required),
    dataSaida: new FormControl(''),
    hospede: new FormGroup({
      id: new FormControl('', Validators.required),
      nome: new FormControl('', Validators.required),
      documento: new FormControl('', Validators.required),
      telefone: new FormControl('', Validators.required)
    }),
    adicionalVeiculo: new FormControl('')
  });

  getReservasAberto(){
    return this.http.get('http://localhost:8080/reservas/abertas');
  }

  getReservasFechado(){
    return this.http.get('http://localhost:8080/reservas/fechadas');
  }

  postReserva(form){
    return this.http.post('http://localhost:8080/reservas/checkin', form).subscribe(
      data => {
        console.log("post request is successful", data);
      },
      error => {
        console.log("error", error);
      }
    );
  }
}
