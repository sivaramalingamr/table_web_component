import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';
import { TableAppComponent } from './table-app/table-app.component';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [
    TableAppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  entryComponents: [TableAppComponent]
})
export class AppModule {
  constructor(injector: Injector) {
    const table = createCustomElement(TableAppComponent, { injector })
    customElements.define('app-table', table);
  }
  ngDoBootstrap() { }
}
