import { NgModule } from '@angular/core'; 
import { ListPageComponent } from './list-page.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: ListPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListPageRoutingModule {}
