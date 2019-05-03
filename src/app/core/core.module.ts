import { NgModule } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  imports: [AngularFireAuthModule, AngularFirestoreModule, PipesModule],
  providers: [AuthService],
  declarations: []
})
export class CoreModule {}
