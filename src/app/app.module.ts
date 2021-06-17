import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LabelModule } from '@progress/kendo-angular-label';

import { TablaComponent } from './components/tabla/tabla.component';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import "@progress/kendo-angular-intl/locales/de/all";
import "@progress/kendo-angular-intl/locales/es/all";
import { HttpClientModule } from '@angular/common/http';
import { UserServiceService } from './shared/services/user-service.service';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { EditartablaComponent } from './components/editartabla/editartabla.component';
import { EliminartablaComponent } from './components/eliminartabla/eliminartabla.component';


@NgModule({
  declarations: [AppComponent, FormularioComponent, TablaComponent, EditartablaComponent, EliminartablaComponent],
  imports: [
    BrowserModule,
    InputsModule,
    BrowserAnimationsModule,
    LabelModule,
    FormsModule,
    ReactiveFormsModule,
    DateInputsModule,
    GridModule,
    HttpClientModule,
    DialogsModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-ES' },UserServiceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
