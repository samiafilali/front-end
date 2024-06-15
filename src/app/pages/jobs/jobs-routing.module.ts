import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from "./list/list.component"; 
import { GridComponent } from "./grid/grid.component";


const routes: Routes = [
   {
    path:"list",
    component:ListComponent
   },
   {
    path:"grid",
    component:GridComponent
   },
  
 
  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class JobsRoutingModule {}
