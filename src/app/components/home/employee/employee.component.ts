import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Store} from '@ngrx/store';
import { Employee } from 'src/app/interfaces/interfaces';
import { AddEmployee, CREATE_EMPLOYEE, CREATE_EMPLOYEE_SUCCESS, DELETE_EMPLOYEE, DELETE_EMPLOYEE_SUCCESS, GET_EMPLOYEES, RemoveEmployee, UpdateEmployee, UPDATE_EMPLOYEE, UPDATE_EMPLOYEE_SUCCESS } from 'src/app/store/actions/employee.actions';
import { AppState } from 'src/app/store/app.state';
import { ModalOptionComponent } from '../modal-option/modal-option.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employees: Employee[] = [];
  loading = false;
  form: any;
  show = false;
  mensaje = '';
  flag = 1;
  isEmployeeEditado = '';

  constructor(private store: Store<AppState>,
              private modalService: NgbModal) { this.formulario() }

  ngOnInit(): void {
    this.store.dispatch({type: GET_EMPLOYEES})

    this.store.subscribe({
      next: (resp) => {
        console.log(resp);
        this.employees = resp.employee.data;
        if(resp.employee.done){
          switch(resp.employee.action){
            case CREATE_EMPLOYEE:
              this.show = true;
              this.mensaje = 'employee creado con exito'
              this.loading = false;
            break;
            case UPDATE_EMPLOYEE:
              this.show = true;
              this.mensaje = 'employee editado con exito'
              this.loading = false;
            break;
            case DELETE_EMPLOYEE:
              this.show = true;
              this.mensaje = 'employee eliminado con exito'
              this.loading = false;
            break;
          }
        }
      
        
      }
    })

    
    
 
  
  }




  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
     this.employees = [];
     this.loading = true;
       let employee: Partial<Employee> = {
         nombre: this.form.controls['nombre'].value,
         edad: this.form.controls['edad'].value,
         sexo: this.form.controls['sexo'].value,
         telefono: this.form.controls['telefono'].value,
         creadorUser: String(localStorage.getItem('name'))
       }
       if(result === 'Guardar'){
        this.store.dispatch(new AddEmployee(employee));
       
        
       }
       else if(result === 'Editar'){
        
        employee.id = this.isEmployeeEditado;
        this.store.dispatch(new UpdateEmployee(employee));
       }
       else{
        this.store.dispatch(new RemoveEmployee(this.isEmployeeEditado))
       }
      
       
     }, (reason) => {
       console.log(reason)
       this.form.reset();
       this.flag = 1;
     });
   }
 
 
   formulario(){
     this.form = new UntypedFormGroup({
       nombre:  new UntypedFormControl('', [ Validators.required]),
       edad:  new UntypedFormControl('', [ Validators.required]),
       sexo:  new UntypedFormControl('', [ Validators.required]),
       telefono:  new UntypedFormControl('', [ Validators.required])
     })
   }
 
 
   editar(content: any, employee: Employee){
     this.form.get('nombre').setValue(employee.nombre);
     this.form.get('edad').setValue(employee.edad);
     this.form.get('sexo').setValue(employee.sexo);
     this.form.get('telefono').setValue(employee.telefono);
     this.isEmployeeEditado = employee.id;
     this.flag = 2;
     this.open(content)
   }
 
   eliminar(content: any, idemployee: string){
     this.isEmployeeEditado = idemployee;
     this.open(content)
   }
 
   verEmpleado(employee: Employee){
     const modalRef = this.modalService.open(ModalOptionComponent);
     modalRef.componentInstance.InfoData = employee;
     modalRef.componentInstance.titleInfoData = "Empleado";
 
     
   }
 

}
