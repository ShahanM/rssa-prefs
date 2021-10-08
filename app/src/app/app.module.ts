import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './components/app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Wrapper} from './components/wrapper/wrapper.component';
import {ChooseComponent} from './components/03-choose/choose.component';
import {ContentComponent} from './components/04-browse/content/content.component';
import {ContentCardComponent} from './components/04-browse/content/content-card/content-card.component';
import {WelcomeComponent} from './components/01-welcome/welcome.component';
import {StepsComponent} from './components/02-steps/steps.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SurveyComponent} from './components/05-survey/survey.component';
import {CardFadeDirective} from './directives/card-fade.directive';
import {ContentAreaComponent} from './components/04-browse/content/content-area/content-area.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ErrorComponent} from './components/utils/error/error.component';
import {TrackerDirective} from './directives/tracker.directive';
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {ErrorInterceptor} from "./interceptors/error.interceptor";
import {LogInterceptor} from "./interceptors/log.interceptor";
import {BrowseComponent} from "./components/04-browse/browse.component";
import {ChooseCardComponent} from './components/03-choose/choose-card/choose-card.component';
import {FormlyModule} from '@ngx-formly/core';
import {FormlyBootstrapModule} from '@ngx-formly/bootstrap';
import {environment} from "../environments/environment";
import {MockInterceptor} from "./interceptors/mock.interceptor";
import {options} from "../environments/options";
import { TutorialComponent } from './components/03-choose/tutorial/tutorial.component';
import { ResizeModalComponent } from './components/utils/resize-modal/resize-modal.component';
import { DebugBarComponent } from './components/utils/debug-bar/debug-bar.component';


// http interceptors
let interceptors = [AuthInterceptor, ErrorInterceptor, LogInterceptor]

if (!environment.production && options.mock) {
    interceptors.push(MockInterceptor)
}

@NgModule({
    declarations: [
        AppComponent,
        Wrapper,
        ChooseComponent,
        ContentComponent,
        ContentCardComponent,
        WelcomeComponent,
        StepsComponent,
        SurveyComponent,
        CardFadeDirective,
        ContentAreaComponent,
        ErrorComponent,
        TrackerDirective,
        BrowseComponent,
        BrowseComponent,
        ChooseCardComponent,
        TutorialComponent,
        ResizeModalComponent,
        DebugBarComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        NgbModule,
        FormsModule,
        HttpClientModule,
        FormlyModule.forRoot({extras: {lazyRender: true}}),
        FormlyBootstrapModule
    ],
    providers: interceptors.map(
        interceptor => ({
            useClass: interceptor,
            provide: HTTP_INTERCEPTORS,
            multi: true,
        })),
    bootstrap: [AppComponent]
})
export class AppModule {
}
