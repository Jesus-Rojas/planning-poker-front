import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

function isValidName(name: string) {
  const regex = /^(?![0-9]{5,20}$)(?!.*[_.*#\/-])[A-Za-z0-9]{5,20}$/;
  return regex.test(name);
}
/*
Creame un regex

Al crear la partida, se deben solicitar los siguientes campos obligatorios:
Nombre
el nombre tiene entre 5 y 20 caracteres, no puede tener caracteres especiales (_,.*#/-), maximo puede tener 3 numeros el nombre, y no puede contener solo numeros
*/
