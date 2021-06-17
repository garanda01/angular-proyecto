import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user.ui';
import { UserServiceService } from '../../shared/services/user-service.service';

@Component({
  selector: 'app-eliminartabla',
  templateUrl: './eliminartabla.component.html',
  styleUrls: ['./eliminartabla.component.css']
})
export class EliminartablaComponent implements OnInit {

  public gridData: User[] = [];
  public dialogOpened = false;
  public dialogOpenEdit = false;

  constructor(private getUserService: UserServiceService) {}

  ngOnInit(): void {
    this.getUser();
    this.getUserService.refreshtabla.subscribe(() => {
      this.getUser();
    });
  }
  getUser() {
    this.getUserService.getUserGrid().subscribe((data) => (this.gridData = data));
  }

  /*  Eliminar */
  /*  Se abre la ventana de Eliminacion */
  openEliminar(): void {
    this.dialogOpened = true;
  }

  NoDelete() {
    this.dialogOpened = false;
  }
  YesDelete(item:any) {
    console.log({item});
    this.getUserService.deleteUserGrid(item).subscribe((data)=>(this.gridData = data));
    this.dialogOpened = false;
  }

  /*  Editar */
  openEditar(): void {
    this.dialogOpenEdit = true;
  }

  public closeDelete() {
    this.dialogOpened = false;
  }
  public closeUpdate() {
    this.dialogOpenEdit = false;
  }
}
