import { MelhoresPrecosComponent } from './melhores-precos/melhores-precos.component';
import { CidadeComponent } from './cidade/cidade.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cidade', component: CidadeComponent },
  { path: 'precos', component: MelhoresPrecosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
