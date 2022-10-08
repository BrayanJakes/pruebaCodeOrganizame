import * as employeActions from '../actions/employee.actions'; 
import { AppAction, Employee } from 'src/app/interfaces/interfaces';

export interface State {
    data: Employee[];
    selected: any;
    action: string;
    done: boolean;
    error?: Error;
  }
  
  const initialState: State = {
    data: [],
    selected: null,
    action: '',
    done: false,
    error: undefined
  };
  
  export function reducer(state = initialState, action: AppAction): State {
    // ...state create immutable state object
    switch (action.type) {
        /*************************
       * GET all Employee actions
       ************************/
      case employeActions.GET_EMPLOYEES:
        return {
          ...state,
          action: employeActions.GET_EMPLOYEES,
          done: false,
          selected: {},
          error: undefined
        };
      case employeActions.GET_EMPLOYEES_SUCCESS:
        return {
          ...state,
          data: action.payload,
          done: true,
          selected: {},
          error: undefined
        };
      case employeActions.GET_EMPLOYEES_ERROR:
        return {
          ...state,
          done: true,
          selected: {},
          error: action.payload
        };

        /*************************
       * CREATE employee actions
       ************************/
      case employeActions.CREATE_EMPLOYEE:
        return {
          ...state,
          selected: action.payload,
          action: employeActions.CREATE_EMPLOYEE,
          done: false,
          error: undefined
        };
      case employeActions.CREATE_EMPLOYEE_SUCCESS:
        {
          const newemployee = {
            ...state.selected,
            id: action.payload
          };
          const data = [
            ...state.data,
            newemployee
          ];
          return {
            ...state,
            data,
            selected: {},
            error: undefined,
            done: true
          };
        }
      case employeActions.CREATE_EMPLOYEE_ERROR:
        return {
          ...state,
          selected: {},
          done: true,
          error: action.payload
        };
  
        /*************************
       * UPDATE employee actions
       ************************/
      case employeActions.UPDATE_EMPLOYEE:
        return {
          ...state,
          selected: action.payload,
          action: employeActions.UPDATE_EMPLOYEE,
          done: false,
          error: undefined
        };
      case employeActions.UPDATE_EMPLOYEE_SUCCESS:
        {
          const index = state
            .data
            .findIndex(h => h.id === state.selected.id);
          if (index >= 0) {
            const data = [
              ...state.data.slice(0, index),
              state.selected,
              ...state.data.slice(index + 1)
            ];
            return {
              ...state,
              data,
              done: true,
              selected: {},
              error: undefined
            };
          }
          return state;
        }
      case employeActions.UPDATE_EMPLOYEE_ERROR:
        return {
          ...state,
          done: true,
          selected: {},
          error: action.payload
        };
  
        /*************************
       * DELETE employee actions
       ************************/
      case employeActions.DELETE_EMPLOYEE:
        {
          const selected = state.data.find(h => h.id === action.payload);
          return {
            ...state,
            selected,
            action: employeActions.DELETE_EMPLOYEE,
            done: false,
            error: undefined
          };
        }
      case employeActions.DELETE_EMPLOYEE_SUCCESS:
        {
          const data = state.data.filter(h => h.id !== state.selected.id);
          return {
            ...state,
            data,
            selected: {},
            error: undefined,
            done: true
          };
        }
      case employeActions.DELETE_EMPLOYEE_ERROR:
        return {
          ...state,
          selected: {},
          done: true,
          error: action.payload
        };
    }
    return state;
  }
  
