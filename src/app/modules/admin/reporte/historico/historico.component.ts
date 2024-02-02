import { Component, OnInit } from '@angular/core';
import { ExcelService } from 'app/services/excel.service';
import { IndicadorService } from 'app/services/indicador.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss']
})
export class HistoricoComponent implements OnInit {

  constructor(private _excelService: ExcelService, private _indicadorService: IndicadorService) { }

  ngOnInit(): void {
  }

  async descargar(){

    this._excelService.downloadHistorico();
  }
}
