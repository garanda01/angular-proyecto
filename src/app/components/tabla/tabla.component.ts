import { EventEmitter, Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../shared/models/user.ui';
import { UserServiceService } from '../../shared/services/user-service.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css'],
})
export class TablaComponent implements OnInit {
  @Input() dataEntrante: any;

  @Output() enviar = new EventEmitter<any>();


  /*  @Output() enviar :EventEmitter<any> = new EventEmitter<any>();
      @Output() enviar: EventEmitter<any>= new EventEmitter(); */

  public gridData: User[] = [];
  public updateForm: FormGroup;

  public data: any = {
    nombre: '',
    apellidos: '',
    edad: '',
    fechanacimiento: new Date(),
  };

  constructor(private getUserService: UserServiceService) {

    this.updateForm = new FormGroup({
      mnombre: new FormControl(this.data.nombre, [Validators.required]),
      mapellidos: new FormControl(this.data.apellidos, [Validators.required]),
      medad: new FormControl(this.data.apellidos, [Validators.required]),
      mfechanacimiento: new FormControl(this.data.fechanacimiento, [
        Validators.required,
      ]),
    });
  }

  ngOnInit(): void {
    this.getUser();
    this.getUserService.refreshtabla.subscribe(() => {
      this.getUser();
    });
  }
  getUser() {
    this.getUserService
      .getUserGrid()
      .subscribe((data) => (this.gridData = data));
  }

  /*  Eliminar */
  /*  Se abre la ventana de Eliminacion */
  /* openEliminar(): void {
    this.dialogOpened = true;
  }

  NoDelete() {
    this.dialogOpened = false;
  } */
  YesDelete(item: any) {
    console.log({ item });
    
    this.getUserService
      .deleteUserGrid(item.id)
      .subscribe((data) => (this.gridData = data));
  }
  /* this.dialogOpened = false;
    this.getUserService.deleteUserGrid(item.id)
    .subscribe((data)=>(this.gridData = data));
    this.dialogOpened = false; */
  /* }
  public closeDelete() {
    this.dialogOpened = false;
  }

  /*  Editar */
  /* openEditar(): void {
    this.dialogOpenEdit = true;
  } 
  public closeUpdate() {
    this.dialogOpenEdit = false;
    this.updateForm.reset();
  }
  */

  YesUpdate(item: any) {
    console.log(item)
    this.enviar.emit(item);
    /*  this.getUserService
      .updateUserGrid(item.id)
      .subscribe((data) => (this.gridData = data)); */
  }
}
