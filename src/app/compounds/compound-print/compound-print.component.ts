import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Compound } from 'src/app/shared/compound';
import { HazardStatement } from 'src/app/shared/hazardStatement';
import { PrecautionaryStatement } from 'src/app/shared/precautionaryStatement';
import { Pictogram } from 'src/app/shared/pictogram';
import * as jsPDF from 'jspdf';
import { PictogramsStatic } from '../../shared/pictograms.static';
import { FontsStatic } from '../../shared/fonts.static';


@Component({
  selector: 'app-compound-print',
  templateUrl: './compound-print.component.html',
  styleUrls: ['./compound-print.component.css']
})
export class CompoundPrintComponent implements OnInit {
  compoundProperties: Compound;
  capacity = '';
  expirationDate = '';
  series = '';
  clarity = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.compoundProperties = data;
    }

  ngOnInit() {}

  onSubmit() {
    console.log(this.compoundProperties);
    const ratio = 0.3538;
    const pictogramPlacingOrder = [
      {x: 154 * ratio, y: 16.5 * ratio},
      {x: 142 * ratio, y: 4.5 * ratio},
      {x: 166 * ratio, y: 28.5 * ratio},
      {x: 166 * ratio, y: 4.5 * ratio},
      {x: 142 * ratio, y: 28.5 * ratio}
    ];
    // build document
    const doc = new jsPDF({
      orientation: 'l',
      unit: 'mm',
      format: [195, 55]
    });
    // setup font
    doc.addFileToVFS('roboto-bold-webfont.ttf', FontsStatic.REGULAR);
    doc.addFont('roboto-bold-webfont.ttf', 'roboto-bold', 'normal');
    // compund name and clarity
    doc.setFont('roboto-bold');
    doc.setFontSize(5);
    doc.text(`${this.compoundProperties.name} ${this.clarity}`, 22 * ratio, 8 * ratio);
    doc.setFontSize(3);
    // static compound parameter names
    doc.text('CAS:', 22 * ratio, 13 * ratio);
    doc.text('WE:', 22 * ratio, 17 * ratio);
    doc.text('Wzór:', 22 * ratio, 21 * ratio);
    doc.text('UN:', 22 * ratio, 25 * ratio);
    doc.text('RID/ADR:', 22 * ratio, 29 * ratio);
    doc.text('Data ważności:', 22 * ratio, 33 * ratio);
    doc.text('', 22 * ratio, 37 * ratio);
    doc.text('Seria:', 22 * ratio, 41 * ratio);
    // dynamic compound parameter properties
    doc.text(this.compoundProperties.cas, 30 * ratio, 13 * ratio);
    doc.text(this.compoundProperties.we, 29 * ratio, 17 * ratio);
    doc.text(this.compoundProperties.formula, 31 * ratio, 21 * ratio);
    // dynamic non-neutral compound parameter properties
    if (this.compoundProperties.un) {
      doc.text(this.compoundProperties.un, 28 * ratio, 25 * ratio);
      doc.text(`${this.compoundProperties.baseClass}, ${this.compoundProperties.packagingGroup}`, 36 * ratio, 29 * ratio);
      } else {
      doc.text('-', 28 * ratio, 25 * ratio);
      doc.text('-', 36 * ratio, 29 * ratio);
      }
    // dynamic product parameter properties
    doc.text(this.expirationDate, 24 * ratio, 37 * ratio);
    doc.text(this.series, 31 * ratio, 41 * ratio);
    doc.setFontSize(5);
    // doc.text(this.capacity, 161 * ratio, 51 * ratio);
    doc.text(this.capacity, 165 * ratio, 51 * ratio, {align: 'center',  maxWidth : 20 * ratio});
    // combine hazard and precautionary statements
    let warningText = '';
    if (this.compoundProperties.hazardStatementDtos) {
      this.compoundProperties.hazardStatementDtos.forEach(
        (value: HazardStatement) => { warningText = warningText + value.code + ' ' + value.text + ' '; }
      );
    }
    if (this.compoundProperties.precautionaryStatementDtos) {
      this.compoundProperties.precautionaryStatementDtos.forEach(
        (value: PrecautionaryStatement) => { warningText = warningText + value.code + ' ' + value.text + ' '; }
      );
    }
    if (warningText) {
      doc.setFontSize(2);
      doc.text(warningText, 64 * ratio, 12 * ratio, {align: 'justify',  maxWidth : 70 * ratio});
    }
    // pictograms
    this.compoundProperties.pictogramDtos.forEach(
      (p: Pictogram, i: number) => doc.addImage(
        PictogramsStatic[this.compoundProperties.pictogramDtos[i].code],
        'PNG',
        pictogramPlacingOrder[i].x,
        pictogramPlacingOrder[i].y,
        22 * ratio,
        22 * ratio
      )
    );
    // print document
    doc.autoPrint();
    window.open(doc.output('bloburl'));

  }

}
