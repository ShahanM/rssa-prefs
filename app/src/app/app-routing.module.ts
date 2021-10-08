import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContentComponent} from "./components/04-browse/content/content.component";
import {Wrapper} from "./components/wrapper/wrapper.component";
import {AppGuard} from "./services/app.guard";

const routes: Routes = [
    {
        path: 'app', component: ContentComponent, canActivate: [AppGuard],
        children: [
            {path: 'browse', component: ContentComponent},
            // todo add paths
            // todo community
            // todo local...
        ]
    },
    {path: '**', component: Wrapper},
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
