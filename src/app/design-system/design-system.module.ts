import { NgModule } from '@angular/core';
import { AtomsModule } from './atoms/atoms.module';
import { MoleculesModule } from './molecules/molecules.module';

@NgModule({
  imports: [
    AtomsModule,
    MoleculesModule,
  ],
  exports: [
    AtomsModule,
    MoleculesModule,
  ],
})
export class DesignSystemModule { }
