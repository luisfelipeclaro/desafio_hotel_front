import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HospedeService } from '../shared/hospede.service';
import { ReservaService } from '../shared/reserva.service';
import { IOption } from 'ng-select';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  // styleUrls: ['./reservas.component.css']
})

export class ReservasComponent implements OnInit {

  reserva$: Object;
  hospedes$: Object;
  hospede$: Object;
  hospedesOption: Array<IOption>;
  selectedHospede: string = '3';

  constructor(private hs: HospedeService, private rs: ReservaService) { }

  submitted: boolean;
  formControls = this.rs.form.controls;
  showSuccessMessage: boolean;
  selectedRadio: string="abertas";

  ngOnInit() {
    this.rs.getReservasAberto().subscribe(
      rs => this.reserva$ = rs
    );
    this.hs.getHospedes().subscribe(
      hs => this.hospedes$ = hs
    );
  }

  setradio(e: string): void{
    this.selectedRadio = e;

    if(this.selectedRadio === 'abertas'){
      this.rs.getReservasAberto().subscribe(
        rs => this.reserva$ = rs
      );
    } else {
      this.rs.getReservasFechado().subscribe(
        rs => this.reserva$ = rs
      );
    }
  }

  isSelected(name: string): boolean{
    if(!this.selectedRadio){
      return false;
    }
    return (this.selectedRadio === name);
  }

  onSubmit(){
    this.submitted = true

    var dtEntrada = this.rs.form.controls["dataEntrada"].value;
    var dtSaida = this.rs.form.controls["dataSaida"].value;
    var date;
    if(dtEntrada != null && dtEntrada != ""){
      date = new Date(dtEntrada);
      this.rs.form.controls['dataEntrada'].setValue(date.toISOString());
    }

    if(dtSaida != null && dtSaida != ""){
      date = new Date(dtSaida);
      this.rs.form.controls['dataSaida'].setValue(date.toISOString());
    }

    let result = this.rs.postReserva(this.rs.form.value);
    if(result){
      this.showSuccessMessage = true;
      this.submitted = false;
      setTimeout(() => {
        this.showSuccessMessage = false;
        this.hs.form.reset();
      }, 3000);
    }
  }

  optionSelected(value:BigInteger){
    let x;
    this.hs.getHospede(value).subscribe(
      hs => {
        this.hospede$ = hs;
        this.rs.form.controls['hospede'].setValue({
          id: this.hospede$['id'],
          nome: this.hospede$['nome'],
          documento: this.hospede$['documento'],
          telefone: this.hospede$['telefone']
        });
      }
    );
  }

}
