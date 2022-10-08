import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Computadora } from 'src/app/interfaces/interfaces';
import { ShareService } from 'src/app/shares/share.service';
import { ModalOptionComponent } from '../modal-option/modal-option.component';

@Component({
  selector: 'app-computadoras',
  templateUrl: './computadoras.component.html',
  styleUrls: ['./computadoras.component.scss']
})
export class ComputadorasComponent implements OnInit {

  computadoras:Computadora[] = [];
  form: any;
  flag = 1;
  isComputadoraEditado = '';
  show = false;
  mensaje = '';
  loading = false;

  constructor(private modalService: NgbModal,
              private sharedService: ShareService) { 
    this.formulario();
  }

  ngOnInit(): void {

   this.listadoComputadora()

    
  }


  listadoComputadora(){
    this.loading = true;
    this.form.reset()
    this.flag = 1;
    
    this.sharedService.getComputadoras().subscribe({
      next: (resp: any) => {
        console.log(resp)
        this.computadoras = resp;
        this.computadoras.reverse();
        this.loading = false;
      }
    })
  }

  open(content: any) {
   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.computadoras = [];
    this.loading = true;
      let computadora: Partial<Computadora> = {
        marca: this.form.controls['marca'].value,
        almacenamiento: this.form.controls['almacenamiento'].value,
        ram: this.form.controls['ram'].value,
        video: this.form.controls['video'].value,
        creador: String(localStorage.getItem('name'))
      }
      if(result === 'Guardar'){
        this.sharedService.createComputadora(computadora).subscribe({
          next: (resp: any) => {
            this.show = true;
            this.mensaje = 'Computadora creado con exito'
            this.listadoComputadora()
          }
        })
      }
      else if(result === 'Editar'){
        this.sharedService.editarComputadora(computadora, this.isComputadoraEditado).subscribe({
          next: (resp: any) => {
            this.show = true;
            this.mensaje = 'Computadora editado con exito'
            this.listadoComputadora()
          }
        })
      }
      else{
        this.sharedService.eliminarComputadora(this.isComputadoraEditado).subscribe({
          next: (resp: any) => {
            this.show = true;
            this.mensaje = 'Computadora eliminado con exito'
            this.listadoComputadora()
          }
        })
      }
     
      
    }, (reason) => {
      console.log(reason)
      this.form.reset();
      this.flag = 1;
    });
  }


  formulario(){
    this.form = new UntypedFormGroup({
      marca:  new UntypedFormControl('', [ Validators.required]),
      almacenamiento:  new UntypedFormControl('', [ Validators.required]),
      ram:  new UntypedFormControl('', [ Validators.required]),
      video:  new UntypedFormControl('', [ Validators.required])
    })
  }


  editar(content: any, computadora: Computadora){
    this.form.get('marca').setValue(computadora.marca);
    this.form.get('almacenamiento').setValue(computadora.almacenamiento);
    this.form.get('ram').setValue(computadora.ram);
    this.form.get('video').setValue(computadora.video);
    this.isComputadoraEditado = computadora.id;
    this.flag = 2;
    this.open(content)
  }

  eliminar(content: any, idComputadora: string){
    this.isComputadoraEditado = idComputadora;
    this.open(content)
  }

  verVehiculo(computadora: Computadora){
    const modalRef = this.modalService.open(ModalOptionComponent);
    modalRef.componentInstance.InfoData = computadora;
    modalRef.componentInstance.titleInfoData = "Computador";

    
  }

}
