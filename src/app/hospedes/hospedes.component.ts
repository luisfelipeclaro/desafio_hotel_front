import { Component, OnInit } from '@angular/core';
import { HospedeService } from '../shared/hospede.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-hospedes',
  templateUrl: './hospedes.component.html',
  // styleUrls: ['./hospedes.component.css']
})
export class HospedesComponent implements OnInit {

  hospedes$: Object;

  constructor(private hs: HospedeService) { }

  submitted: boolean;
  formControls = this.hs.form.controls;
  showSuccessMessage: boolean;

  ngOnInit() {
    this.hs.getHospedes().subscribe(
      hs => this.hospedes$ = hs
    );
  }

  onSubmit(){
    this.submitted = true;
    // if(this.hs.form.get('$key').value == null){
    //   // novo hospede
      let result = this.hs.postHospede(this.hs.form.value);
      console.log(result);
      if(result){
        this.showSuccessMessage = true;
        this.submitted = false;
        setTimeout(() => {
          this.showSuccessMessage = false
        }, 3000);
        this.hs.form.reset();
      }

    //   this.submitted = false;
    // }
  }

}
