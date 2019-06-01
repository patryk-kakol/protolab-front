import { Component, OnInit, ViewChild } from '@angular/core';
import { CompoundService } from 'src/app/shared/compound.service';
import { Compound } from 'src/app/shared/compound';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { CompoundComponent } from '../compound/compound.component';
import { StaticsService } from 'src/app/shared/statics.service';
import { CompoundPrintComponent } from '../compound-print/compound-print.component';

@Component({
  selector: 'app-compound-list',
  templateUrl: './compound-list.component.html',
  styleUrls: ['./compound-list.component.css']
})
export class CompoundListComponent implements OnInit {

  compounds: Compound[];
  compoundsDataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['compoundId', 'name', 'formula', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  searchKey: string;
  editDialogConfig: MatDialogConfig = {
    width: '80%',
    disableClose: false,
    data: {
      hazardStatements: [],
      precautionaryStatements: [],
      pictograms: []
    }
  };
  printDialogConfig: MatDialogConfig = {
    width: '40%',
    disableClose: false,
    data: Compound
  };

  constructor(private compoundService: CompoundService,
              private staticsService: StaticsService,
              private dialog: MatDialog) {}

  ngOnInit() {
    this.getStatics();
    this.getCompoundsDataSource();
  }

  getCompoundsDataSource(): void {
    this.compoundService.getCompounds().subscribe(list => {
      this.compounds = list;
      const array = list.map(item => ({
        compoundId: item.compoundId,
        name: item.name,
        formula: item.formula
      }));
      this.compoundsDataSource = new MatTableDataSource(array);
      this.compoundsDataSource.sort = this.sort;
      this.compoundsDataSource.paginator = this.paginator;
      // TODO: put notification service into catch error!
    });
  }

  getStatics(): void {
    this.staticsService
      .getHazardStatements()
      .subscribe(statements => this.editDialogConfig.data.hazardStatements = statements);
    this.staticsService
      .getPrecautionaryStatements()
      .subscribe(statements => this.editDialogConfig.data.precautionaryStatements = statements);
    this.staticsService
      .getPictograms()
      .subscribe(pictograms => this.editDialogConfig.data.pictograms = pictograms);
  }

  onSearchClear(): void {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter(): void {
    this.compoundsDataSource.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate(): void {
    this.dialog.open(CompoundComponent, this.editDialogConfig)
      .afterClosed().subscribe(() => this.getCompoundsDataSource());
  }

  onEdit(id: number): void {
    const compoundObject = this.compounds.find(
      c => c.compoundId === id);
    this.compoundService.populateForm(compoundObject);
    this.dialog.open(CompoundComponent, this.editDialogConfig);
    this.dialog.openDialogs.forEach(open => open.afterClosed()
      .subscribe(() => this.getCompoundsDataSource()));
  }

  onPrint(id: number): void {
    const compoundObject = this.compounds.find(
      c => c.compoundId === id);
    this.printDialogConfig.data = compoundObject;
    this.dialog.open(CompoundPrintComponent, this.printDialogConfig);
  }

  onDelete(id: number): void {
    this.compoundService.deleteCompound(id)
      .subscribe( () => this.getCompoundsDataSource());
  }
}
