import { NgModule } from '@angular/core';

// Components
import { HeaderComponent } from './header.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [
    // components
    HeaderComponent,
    

    // sub components
    SidebarComponent
  ],
  exports: [
    HeaderComponent,
  ],
  imports: [
  ]
})
export class HeaderModule {}
