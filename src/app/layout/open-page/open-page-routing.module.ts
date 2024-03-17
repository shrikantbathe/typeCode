import { NgModule } from '@angular/core'; 
import { OpenPageComponent } from './open-page.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: OpenPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OpenPageRoutingModule {}
