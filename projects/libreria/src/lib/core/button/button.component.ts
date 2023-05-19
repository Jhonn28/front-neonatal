import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cmp-button',
  templateUrl: './button.component.html',
  styleUrls: []
})
export class ButtonCoreComponent implements OnInit {

  @Input() title: string;
  @Input() type?: 'basic' | 'rounded' | 'text' | 'outlined' | 'roundedicon' | 'roundedtext' | 'roundedoutlined' | 'badges' | 'loading' = 'basic';
  @Input() icon: string = 'fas fa-code';
  @Input() text: string;
  @Input() tooltip: string = '';
  @Input() disabled: boolean = false;
  @Input() color?: 'primary' | 'secondary' | 'info' | 'success' | 'danger' | 'warning';
  loading = false;
  constructor() { }

  ngOnInit(): void {
    if (this.title) {
      this.title = this.title;
    }
  }

  startLoad(): void {
    this.loading = true;
  }

  stopLoad(): void{
    this.loading = false;
  }

}
