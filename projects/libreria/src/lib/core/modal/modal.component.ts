import { ChangeDetectorRef, Component, EventEmitter, Input, Output, OnDestroy } from '@angular/core';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'cmp-modal',
  templateUrl: './modal.component.html',
  styleUrls: []
})
export class ModalCoreComponent implements OnDestroy {

  @Input() title: string = 'Título';
  @Input() showButtonCancel: boolean = true;
  @Input() labelButtonCancel: string = 'Cancelar';
  @Input() showButtonAccept: boolean = true;
  @Input() labelButtonAcept: string = 'Aceptar';
  @Input() visible: boolean = false;

  @Output() onCancel = new EventEmitter<Event>();
  @Output() onAccept = new EventEmitter<Event>();

  @Input() width = '500px';

  loading = false;
  showFooter = true;
  onShow= false;
  //Eventos
  onClickAcept?: (event?: any) => void;
  onClickCancel?: (event?: any) => void;

  constructor(private cdRef: ChangeDetectorRef, private utilitarioSvc: UtilsService) { 
    // this.utilitarioSvc.showSpinner();
  }

  /**
   * Titulo del dialogo
   */
  setTitle(title: string): void {
    this.title = title;
  }

  /**
   * Open modal
   */
  show() {
    this.visible = true;
    this.cdRef.detectChanges();
    // this.utilitarioSvc.hideSpinner();
  }

  /**
   * Close modal
   */
   hide(event?) {
    console.log('click en cerrar modal');
    this.visible = false;
    this.onCancel.emit(event);
    if (this.onClickCancel) {
      this.onClickCancel({
        originalEvent: event
      });
    }
  }

  onAcept(event) {
    console.log('emito al aceptar',);
    this.loading = true;
    this.onAccept.emit(event);
    if (this.onClickAcept) {
      this.onClickAcept({
        originalEvent: event
      });
    }
  }

  setSize(size: 'sm' | 'lg' | 'xl') {
    if (size == 'sm') {
      this.width = '300px';
    } else if (size == 'lg') {
      this.width = '800px';
    } else if (size == 'xl') {
      this.width = '1140px';
    }
  }

  ngOnDestroy() {
    this.loading = false;
    this.visible = false;
  }

  /**
   * Oculta el footer del dialogo
   * @param status 
   */
  setShowFooter(status: boolean){
    this.showFooter = status;
  }

  isDraw(){
    this.onShow = true;
  }

}
