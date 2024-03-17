import { NgModule } from '@angular/core'; 
import { LayoutComponent } from './layout.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
            },
            { path: 'charts', loadChildren: () => import('./charts/charts.module').then((m) => m.ChartsModule) },
            { path: 'tables', loadChildren: () => import('./tables/tables.module').then((m) => m.TablesModule) },
            { path: 'forms', loadChildren: () => import('./form/form.module').then((m) => m.FormModule) },
            {
                path: 'bs-element',
                loadChildren: () => import('./bs-element/bs-element.module').then((m) => m.BsElementModule)
            },
            { path: 'grid', loadChildren: () => import('./grid/grid.module').then((m) => m.GridModule) },
            {
                path: 'components',
                loadChildren: () => import('./bs-component/bs-component.module').then((m) => m.BsComponentModule)
            },
            {
                path: 'blank-page',
                loadChildren: () => import('./blank-page/blank-page.module').then((m) => m.BlankPageModule)
            },
            {
                path: 'open-page',
                loadChildren: () => import('./open-page/open-page.module').then((m) => m.OpenPageModule)
            },
            {
                path: 'app-page',
                loadChildren: () => import('./app-page/app-page.module').then((m) => m.AppPageModule)
            },
            {
                path: 'list-page',
                loadChildren: () => import('./appGrid/list-page/list-page.module').then((m) => m.ListPageModule)
            },
            {
                path: 'form-page',
                loadChildren: () => import('./form-page/form-page.module').then((m) => m.FormPageModule)
            },
            {
                path: 'search-page',
                loadChildren: () => import('./search-page/search-page.module').then((m) => m.SearchPageModule)
            }
            // {
            //     path: 'search-page',
            //     loadChildren: () => import('./search-page/search-page.module').then((m) => m.SearchPageModule)
            // }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
