import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxMaskModule } from 'ngx-mask'

import { AppComponent } from './app.component';
import { ToastNotificationComponent } from './shared/components/toast-notification/toast-notification.component';
import { AuthComponent } from './auth/auth.component';
import { UsersComponent } from './portal/users/users.component';
import { LayoutComponent } from './portal/layout/layout.component';
import { ModalComponent } from './shared/components/modal/modal.component';

import { SharedService } from './shared/services/shared.service';
import { AuthService } from './auth/auth.service';
import { HomeComponent } from './portal/home/home.component';


@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
        LayoutComponent,
        ModalComponent,
        ToastNotificationComponent,
        UsersComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatIconModule,
        HttpClientModule,
        NgxMaskModule.forRoot(),
    ],
    providers: [
        AuthService,
        SharedService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

    constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer){
        matIconRegistry.addSvgIconSet(
            domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg')
        );
    }
}
