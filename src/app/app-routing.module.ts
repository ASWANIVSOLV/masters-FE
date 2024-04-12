import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HashLocationStrategy,LocationStrategy} from '@angular/common';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { CanActivateGuardService } from './can-activate-guard.service';


const routes: Routes = [
  { path: 'about', component: AboutComponent, canActivate:[CanActivateGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'kvb', component: AboutComponent, canActivate:[CanActivateGuardService] },
  {path: '', pathMatch: 'full', redirectTo: 'login' },
  // {path:'atma',loadChildren:()=> import("./atma/atma.module").then(m=>m.AtmaModule)},
  {path:'master',loadChildren:()=> import("./Master/mastermodule.module").then(m=>m.MastermoduleModule)},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[{
    provide:LocationStrategy,useClass:HashLocationStrategy
  }]
})
export class AppRoutingModule { }
