import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-toast-notification',
  templateUrl: './toast-notification.component.html',
  styleUrls: ['./toast-notification.component.styl']
})
export class ToastNotificationComponent implements OnInit {

    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any ) { }

    ngOnInit(): void {
    }

}
