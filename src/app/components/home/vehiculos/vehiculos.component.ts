import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Vehiculo } from 'src/app/interfaces/interfaces';
import { ShareService } from "../../../shares/share.service";
import { ModalOptionComponent } from '../modal-option/modal-option.component';


@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.scss']
})
export class VehiculosComponent implements OnInit {

  vehiculos:Vehiculo[] = [];
  form: any;
  flag = 1;
  isVehiculoEditado = '';
  show = false;
  mensaje = '';
  loading = false;

  constructor(private modalService: NgbModal,
              private sharedService: ShareService) { 
    this.formulario();
  }

  ngOnInit(): void {

   this.listadoVehiculos()
    
  }


  listadoVehiculos(){
    this.loading = true;
    this.form.reset()
    this.flag = 1;
    
    this.sharedService.getVehiculos().subscribe({
      next: (resp: any) => {
        console.log(resp)
        this.vehiculos = resp;
        this.vehiculos.reverse();
        this.loading = false;
      }
    })
  }

  open(content: any) {
   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.vehiculos = [];
    this.loading = true;
      let vehiculo: Partial<Vehiculo> = {
        marca: this.form.controls['marca'].value,
        modelo: this.form.controls['modelo'].value,
        placa: this.form.controls['placa'].value,
        anio: this.form.controls['anio'].value,
        creador: String(localStorage.getItem('name'))
      }
      console.log(vehiculo)
      if(result === 'Guardar'){
        this.sharedService.createVehiculo(vehiculo).subscribe({
          next: (resp: any) => {
            this.show = true;
            this.mensaje = 'Vehículo creado con exito'
            this.listadoVehiculos()
          }
        })
      }
      else if(result === 'Editar'){
        this.sharedService.editarVehiculo(vehiculo, this.isVehiculoEditado).subscribe({
          next: (resp: any) => {
            this.show = true;
            this.mensaje = 'Vehículo editado con exito'
            this.listadoVehiculos()
          }
        })
      }
      else{
        this.sharedService.eliminarVehiculo(this.isVehiculoEditado).subscribe({
          next: (resp: any) => {
            this.show = true;
            this.mensaje = 'Vehículo eliminado con exito'
            this.listadoVehiculos()
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
      modelo:  new UntypedFormControl('', [ Validators.required]),
      placa:  new UntypedFormControl('', [ Validators.required]),
      anio:  new UntypedFormControl('', [ Validators.required])
    })
  }


  editar(content: any, vehiculo: Vehiculo){
    this.form.get('marca').setValue(vehiculo.marca);
    this.form.get('placa').setValue(vehiculo.placa);
    this.form.get('modelo').setValue(vehiculo.modelo);
    this.form.get('anio').setValue(vehiculo.anio);
    this.isVehiculoEditado = vehiculo.id;
    this.flag = 2;
    this.open(content)
  }

  eliminar(content: any, idVehiculo: string){
    this.isVehiculoEditado = idVehiculo;
    this.open(content)
  }

  verVehiculo(vehiculo: Vehiculo){
    const modalRef = this.modalService.open(ModalOptionComponent);
    modalRef.componentInstance.InfoData = vehiculo;
    modalRef.componentInstance.titleInfoData = "Vehículo";

    
  }



}
