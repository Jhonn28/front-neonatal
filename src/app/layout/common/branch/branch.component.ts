import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UtilsService } from '../../../../../projects/ngbusiness-core/src/public-api';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styles: [
  ]
})
export class BranchComponent implements OnInit {

  branchs = [];

  constructor(
    private _utilService: UtilsService,
    private _router: Router,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {
    const { branch } = this.config.data;
    this.branchs = branch;

  }

  ngOnInit(): void {
  }

  cerrarDialogo() {
    this.ref.close(false);
  }

  selected(sucursal) {
    console.log(sucursal);
    this._utilService.showSpinner();
    setTimeout(() => {
      this._utilService.updateSesionSucursal(sucursal);
      this._router.navigateByUrl('private');
      this.ref.close(false);
      this._utilService.hideSpinner();
    }, 1000);

  }

}
