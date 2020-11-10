import { NgModule } from '@angular/core';
import { WelcomeComponent } from './welcome.component';
import { WelcomeRoutingModule } from './welcome-routing.module';

@NgModule({
  imports: [
    WelcomeRoutingModule,
  ],
  declarations: [
    WelcomeComponent,
  ],
})
export class WelcomeModule { }
