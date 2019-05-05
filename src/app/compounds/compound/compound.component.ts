import { Component, OnInit, OnDestroy, Inject, ChangeDetectorRef } from '@angular/core';
import { CompoundService } from '../../shared/compound.service';
import { HazardStatement } from '../../shared/hazardStatement';
import { PrecautionaryStatement } from '../../shared/precautionaryStatement';
import { Pictogram } from 'src/app/shared/pictogram';
import { Compound } from 'src/app/shared/compound';
import { NotificationService } from '../../shared/notification.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-compound',
  templateUrl: './compound.component.html',
  styleUrls: ['./compound.component.css']
})
export class CompoundComponent implements OnInit, OnDestroy {
  hazardStatements: HazardStatement[];
  precautionaryStatements: PrecautionaryStatement[];
  pictograms: Pictogram[];
  neutralCompound: boolean;

  constructor(
    public compoundService: CompoundService,
    private changeDetector: ChangeDetectorRef,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.hazardStatements = data.hazardStatements;
      this.precautionaryStatements = data.precautionaryStatements;
      this.pictograms = data.pictograms;
    }

    ngOnInit() {
      this.changeDetector.detectChanges();
    }

  ngOnDestroy() {
    this.resetForm();
  }

  compareHazardStatements(
    c1: { hazardStatementId: number },
    c2: { hazardStatementId: number }
  ) {
    return c1 && c2 && c1.hazardStatementId === c2.hazardStatementId;
  }

  comparePrecautionaryStatements(
    c1: { precautionaryStatementId: number },
    c2: { precautionaryStatementId: number }
  ) {
    return (
      c1 && c2 && c1.precautionaryStatementId === c2.precautionaryStatementId
    );
  }

  comparePictograms(
    c1: { pictogramId: number },
    c2: { pictogramId: number }
  ) {
    return c1 && c2 && c1.pictogramId === c2.pictogramId;
  }


  toggleNeutralCompound(): void {
    this.neutralCompound = !this.neutralCompound;
    this.compoundService.toggleNeutralCompound(this.neutralCompound);
  }

  onReset(): void {
    this.resetForm();
    this.notificationService.notify('Form cleared');
  }

  onSubmit(): void {
    if (this.compoundService.compoundForm.get('compoundId').value === 0) {
      this.addCompound(this.compoundService.compoundForm.value as Compound);
    } else {
      this.updateCompound(this.compoundService.compoundForm.value as Compound);
    }
  }

  addCompound(compound: Compound): void {
    this.compoundService.addCompound(compound as Compound).subscribe();
  }

  updateCompound(compound: Compound): void {
    this.compoundService.updateCompound(compound as Compound).subscribe();
  }

  private resetForm(): void {
    this.compoundService.compoundForm.reset();
    if (this.neutralCompound) {
      this.toggleNeutralCompound();
    }
    this.compoundService.initializeCompoundForm();
  }
}
