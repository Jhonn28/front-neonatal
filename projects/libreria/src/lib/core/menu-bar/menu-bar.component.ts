import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'cmp-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: []
})
export class MenuBarComponent implements OnInit {

  isButtonInsert = true;
  isButtonSave = true;
  isButtonDelete = true;
  isRemoveButtons = false;
 

  get buttonInsert(): HTMLButtonElement {
    return (document.getElementById('botInsertar') as HTMLButtonElement);
  }
  get buttonDelete(): HTMLButtonElement {
    return (document.getElementById('botEliminar') as HTMLButtonElement);
  }
  get buttonSave(): HTMLButtonElement {
    return (document.getElementById('botGuardar') as HTMLButtonElement);
  }

  // Eventos
  onInsert?: (event?: any) => void;
  onDelete?: (event?: any) => void;
  onSave?: (event?: any) => void;

  constructor(private cdRef: ChangeDetectorRef) {  }

  ngOnInit(): void {
    this.isButtonInsert = true;
  }

  insert(event): void {
    if (this.onInsert) {
      this.onInsert({ originalEvent: event });
    }
  }

  save(event): void {
    if (this.onSave) {
      this.onSave({ originalEvent: event });
    }
  }

  delete(event): void {
    if (this.onDelete) {
      this.onDelete({ originalEvent: event });
    }
  }

  removeInsertButton(): void {
    this.buttonInsert.hidden = true;
    this.isButtonInsert = false;
    this.cdRef.detectChanges();
  }

  removeSaveButton(): void {
    this.buttonSave.hidden = true;
    this.isButtonSave = false;
    this.cdRef.detectChanges();
  }

  removeDeleteButton(): void {
    this.buttonDelete.hidden = true;
    this.isButtonDelete = false;
    this.cdRef.detectChanges();
  }

  removeButtons(): void {
    this.isButtonInsert = false;
    this.isButtonSave = false;
    this.isButtonSave = false;
    this.isRemoveButtons = true;
    this.cdRef.detectChanges();
  }

}
