import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {


    constructor(private cdRef: ChangeDetectorRef, private primengConfig: PrimeNGConfig) {
    }


    ngOnInit(): void {
        this.primengConfig.ripple = true;
    }

    ngAfterViewInit(): void {
        this.cdRef.detectChanges();
    }

}
