import { HazardStatement } from './hazardStatement';
import { PrecautionaryStatement } from './precautionaryStatement';
import { Pictogram } from './pictogram';

export class Compound {
    compoundId: null;
    name: string;
    cas: string;
    we: string;
    formula: string;
    un: string;
    baseClass: string;
    helperClass: string;
    packagingGroup: string;
    hazardStatementDtos: HazardStatement[];
    precautionaryStatementDtos: PrecautionaryStatement[];
    pictogramDtos: Pictogram[];
}
