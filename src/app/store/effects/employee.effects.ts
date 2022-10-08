import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as employeeActions from '../actions/employee.actions';
import {
  AddEmployee,
  AddEmployeeError,
  AddEmployeeSuccess,
  GetAllEmployeesError,
  GetAllEmployeesSuccess,
  RemoveEmployee,
  RemoveEmployeeError,
  RemoveEmployeeSuccess,
  UpdateEmployee,
  UpdateEmployeeError,
  UpdateEmployeeSuccess
} from '../actions/employee.actions';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import {catchError, map, switchMap} from 'rxjs/operators';
import { ShareService } from 'src/app/shares/share.service';
import { Employee } from 'src/app/interfaces/interfaces';

@Injectable()
export class EmployeeEffects {
  constructor(private actions$: Actions,
              private sharedService: ShareService) {
  }

  
  getAllEmployees$: Observable<Action> = createEffect(() => 
    this.actions$.pipe(
        ofType(employeeActions.GET_EMPLOYEES),
        switchMap(() => this.sharedService.getEmployees()),
        map(employee => new GetAllEmployeesSuccess(employee)),
        catchError((err) => [new GetAllEmployeesError(err)])
    )) 


  
  updateEmployee$ = createEffect(() => 
  this.actions$.pipe(
    ofType(employeeActions.UPDATE_EMPLOYEE),
    map((action: UpdateEmployee) => action.payload),
    switchMap(employee => this.sharedService.editarEmployee(employee)),
    map(() => new UpdateEmployeeSuccess()),
    catchError((err) => [new UpdateEmployeeError(err)])
  ))

  
  createEmployee$ = createEffect(() =>  this.actions$.pipe(
    ofType(employeeActions.CREATE_EMPLOYEE),
    map((action: AddEmployee) => action.payload),
    switchMap(newEmployee => this.sharedService.createEmployee(newEmployee)),
    map((response) => new AddEmployeeSuccess(response.id)),
    catchError((err) => [new AddEmployeeError(err)])
  ))
  
  removeEmployee$ = createEffect(() =>  this.actions$.pipe(
    ofType(employeeActions.DELETE_EMPLOYEE),
    map((action: RemoveEmployee) => action.payload),
    switchMap(id => this.sharedService.eliminarEmployee(id)),
    map((employee: Employee) => new RemoveEmployeeSuccess(employee)),
    catchError((err) => [new RemoveEmployeeError(err)])
  ))
}
