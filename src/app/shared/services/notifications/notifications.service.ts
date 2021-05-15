import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastNotificationComponent } from '../../components/toast-notification/toast-notification.component';

@Injectable({
    providedIn: 'root'
})
export class NotificationsService {

    constructor(private snackBar: MatSnackBar) { }

    error(displayTitle: string, displayMessage: string){
        this.snackBar.openFromComponent(ToastNotificationComponent,{
            data:{
                title:displayTitle,
                message:displayMessage
            },
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass:'error',
        });
    }

    success(displayTitle: string, displayMessage: string){
        this.snackBar.openFromComponent(ToastNotificationComponent,{
            data:{
                title:displayTitle,
                message:displayMessage
            },
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass:'success'
        });
    }

    warn(displayTitle: string, displayMessage: string){
        this.snackBar.openFromComponent(ToastNotificationComponent,{
            data:{
                title:displayTitle,
                message:displayMessage
            },
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass:'warn'
        });
    }

    info(displayTitle: string, displayMessage: string){
        this.snackBar.openFromComponent(ToastNotificationComponent,{
            data:{
                title:displayTitle,
                message:displayMessage
            },
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass:'info'
        });
    }
}
