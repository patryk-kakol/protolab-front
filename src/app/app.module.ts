import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompoundsComponent } from './compounds/compounds.component';
import { CompoundComponent } from './compounds/compound/compound.component';
import { CompoundService } from './shared/compound.service';
import { CompoundListComponent } from './compounds/compound-list/compound-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CompoundsComponent,
    CompoundComponent,
    CompoundListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [CompoundService],
  bootstrap: [AppComponent],
  entryComponents: [CompoundComponent]
})
export class AppModule { }
