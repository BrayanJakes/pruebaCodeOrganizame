export interface Vehiculo {
    placa: string;
    marca: string;
    modelo: string;
    anio: number;
    creador: string;
    id: string;
  }
  


  export interface Computadora {
    marca: string;
    almacenamiento: string;
    ram: string;
    video: string;
    creador: string;
    id: string;
  }
  

  export interface Employee{
    nombre: string;
    edad: string;
    sexo: string;
    telefono: string;
    creadorUser: string;
    id: string;
  }


  export interface AppAction {
    type: string;
    payload?: any;
  }
  