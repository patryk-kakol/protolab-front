import { Component, OnInit, ViewChild } from '@angular/core';
import { CompoundService } from 'src/app/shared/compound.service';
import { Compound } from 'src/app/shared/compound';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { CompoundComponent } from '../compound/compound.component';
import { HazardStatement } from 'src/app/shared/hazardStatement';

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
  dialogConfig: MatDialogConfig = {
    width: '80%',
    disableClose: false
  };

  Hstats: HazardStatement[] = [
{hazardStatementId: 38, code: 'H312', text: 'Działa szkodliwie w kontakcie ze skórą.'},
{hazardStatementId: 38, code: 'H312', text: 'Działa szkodliwie w kontakcie ze skórą.'},
{hazardStatementId: 40, code: 'H315', text: 'Działa drażniąco na skórę.'},
{hazardStatementId: 43, code: 'H319', text: 'Działa drażniąco na oczy.'},
{hazardStatementId: 46, code: 'H332', text: 'Działa szkodliwie w następstwie wdychania.'},
{hazardStatementId: 48, code: 'H335', text: 'Może powodować podrażnienie dróg oddechowych.'},
{hazardStatementId: 68, code: 'H372', text: 'tatatatatat'},
{hazardStatementId: 82, code: 'H400', text: 'Działa bardzo toksycznie na organizmy wodne.'}
];

  constructor(private compoundService: CompoundService,
              private dialog: MatDialog) {}

  ngOnInit() {
    // delay test
    // setTimeout(() => {
    //   this.getCompoundsDataSource();
    //   }, 1000);

    // No data test
    // setTimeout(() => {
    //   console.log('now is the time!');
    //   this.compoundsDataSource = new MatTableDataSource([]);
    //   }, 3000);

    // regular:
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

  onSearchClear(): void {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter(): void {
    this.compoundsDataSource.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate(): void {
    this.dialog.open(CompoundComponent, this.dialogConfig)
      .afterClosed().subscribe(() => this.getCompoundsDataSource());
  }

  onEdit(id: number): void {
    const compoundObject = this.compounds.find(
      c => c.compoundId === id);
    this.dialog.open(CompoundComponent, this.dialogConfig)
      .afterOpened().subscribe(() => this.compoundService.populateForm(compoundObject));
    this.dialog.openDialogs.forEach(open => open.afterClosed()
      .subscribe(() => this.getCompoundsDataSource()));
  }

  onDelete(id: number): void {
    this.compoundService.deleteCompound(id)
      .subscribe( () => this.getCompoundsDataSource());
  }
}
