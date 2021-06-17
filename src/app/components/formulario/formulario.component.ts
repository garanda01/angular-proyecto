import { IfStmt } from '@angular/compiler';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormatSettings } from '@progress/kendo-angular-dateinputs';
import { ItemTemplateDirective } from '@progress/kendo-angular-dropdowns';
import { UserServiceService } from 'src/app/shared/services/user-service.service';
import { User } from '../../shared/models/user.ui';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent implements OnInit, OnChanges {
  @Input() input: any;

  nombre: string = "";
  apellidos: string = "";
  edad: number = 0;
  fechanacimiento = new Date();
  varedicion: boolean = false; /* Para diferenciar si edita o registra */
  namebutton: string = "Guardar";

  public data: any = {
    nombre: '',
    apellidos: '',
    edad: '',
    fechanacimiento: new Date(),
  };

  /* public llenarform: any[] = products; */

  public value: Date = new Date(2019, 5, 1);
  public format: FormatSettings = {
    displayFormat: 'dd/MM/yyyy',
    inputFormat: 'dd/MM/yyyy',
  };

  public registerForm: FormGroup;

  constructor(readonly UserService: UserServiceService) {
    this.registerForm = new FormGroup({
      nombre: new FormControl(this.data.nombre, [Validators.required]),
      apellidos: new FormControl(this.data.apellidos, [Validators.required]),
      edad: new FormControl(this.data.apellidos, [Validators.required]),
      fechanacimiento: new FormControl(this.data.fechanacimiento, [
        Validators.required,
      ]),
    });

  }


  public GuardarForm(): void {
    /*     this.varedicion = this.input?.id ? true : false;
     */
    this.varedicion = this.input?.id ? true : false;
    /* if(this.input.id){
      this.varedicion=true

    }else{
      this.varedicion=false
    } */


    console.log('este es el valor de:' + this.varedicion);

    const UserGuardar: User = {
      /* id: 0,  */
      nombre: this.registerForm.get('nombre')?.value,
      apellidos: this.registerForm.get('apellidos')?.value,
      edad: this.registerForm.get('edad')?.value,
      fechanacimiento: this.registerForm.get('fechanacimiento')?.value,
    };

    if (this.varedicion) {
      UserGuardar.id = this.input.id
      this.UserService.updateUserGrid(UserGuardar).subscribe((data) =>
        console.log(data));
      this.input = null
      this.registerForm.reset();
      this.namebutton = "Guardar";
    } else {
      this.UserService.postUserGrid(UserGuardar).subscribe((data) =>
        console.log(data));
      this.registerForm.reset();

    }

  }


  public LimpiarForm(): void {
    this.registerForm.reset();
    this.namebutton = "Guardar";
    this.input = null;
  }

  public Eliminarfila(): void { }

  ngOnInit(): void {

    /*  this.UserService.disparadordatos.subscribe(data => {
       console.log('recibiendo datos',data);
       this.llenarform.push(data); 
     })*/
  }

  ngOnChanges(): void {
    /* console.log(this.input); */
    this.namebutton = this.input?.id ? "Actualizar" : "Guardar"

    const user: User = {
      nombre: this.input.nombre,
      apellidos: this.input.apellidos,
      edad: this.input.edad,
      fechanacimiento: new Date(this.input.fechanacimiento)
    }
    this.cargar(user);

  }
/*   cargar elementos en el formulario
 */  cargar(user: User): void {

    this.registerForm.get('nombre')?.setValue(user.nombre);
    this.registerForm.get('apellidos')?.setValue(user.apellidos);
    this.registerForm.get('edad')?.setValue(user.edad);
    this.registerForm.get('fechanacimiento')?.setValue(user.fechanacimiento)
    
    /* this.registerForm.get('fechanacimiento')?.setValue(new Date(user.fechanacimiento)) */
  }
}