import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { RootComponent } from './layout/root/root.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './layout/footer/footer.component';



@NgModule({
  declarations: [
    RootComponent,
    FooterComponent,
    HeaderComponent

  ],
  imports: [CommonModule, RouterModule, SharedModule],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
