import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { ComputadorasComponent } from './computadoras/computadoras.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalOptionComponent } from './modal-option/modal-option.component';
import { DataInfoComponent } from './modal-option/data-info/data-info.component';

import { EmployeeComponent } from './employee/employee.component';




@NgModule({
  declarations: [
  
    VehiculosComponent,
       ComputadorasComponent,
       HomeComponent,
       ModalOptionComponent,
       DataInfoComponent,
       EmployeeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
  ]
})
export class HomeModule { }
