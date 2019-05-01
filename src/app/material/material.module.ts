import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Material.MatToolbarModule,
    Material.MatGridListModule,
    Material.MatInputModule,
    Material.MatDividerModule,
    Material.MatCheckboxModule,
    Material.MatButtonModule,
    Material.MatListModule,
    Material.MatSelectModule,
    Material.MatSnackBarModule,
    Material.MatTableModule,
    Material.MatIconModule,
    Material.MatSortModule,
    Material.MatPaginatorModule,
    Material.MatTooltipModule,
    Material.MatDialogModule
  ],
  exports: [
    Material.MatToolbarModule,
    Material.MatGridListModule,
    Material.MatInputModule,
    Material.MatDividerModule,
    Material.MatCheckboxModule,
    Material.MatButtonModule,
    Material.MatListModule,
    Material.MatSelectModule,
    Material.MatSnackBarModule,
    Material.MatTableModule,
    Material.MatIconModule,
    Material.MatSortModule,
    Material.MatPaginatorModule,
    Material.MatTooltipModule,
    Material.MatDialogModule
  ]
})
export class MaterialModule { }
