import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService, IDeviceInfo, IPokedex, UserCore, UtilsService } from '../../../../../projects/libreria/src/public-api';
import { SystemService } from '../../../../../projects/libreria/src/lib/services/system.service';
import { IndicadorService } from 'app/services/indicador.service';
import { ExcelService } from 'app/services/excel.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {
  puntaje;
  color1 = new Array();
  ip: string;
  date;
  user: UserCore;
  hours;
  day;
  device: IDeviceInfo
  ampm: string;
  establecimiento: any;
  clima: any[] = [];
  ciudad = '';
  tempActual = '';
  tempMin = '';
  tempMax = '';
  icono = '';
  descripcion = '';
  urlIcono = '';


  anio: Date[] | undefined;
  sucursal;

  accessDate: any;
  location: IPokedex;
  last_date: string;
  last_time: string;

  supervisionForm: FormGroup = new FormGroup({});


  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private route: ActivatedRoute,
    private _utilService: UtilsService,
    private _authService: AuthService,
    private _systemService: SystemService,
    private _indicadorService: IndicadorService,
    private _excelService: ExcelService,
    private _formBuilder: FormBuilder,

  ) {
    this.startClock();
    this.user = this._authService.usuario;
    this.accessDate = _authService.accessDate;
    this.last_date = _utilService.getFormatDate(this.accessDate[0].fecha_seauac, 'yyyy/mm/dd');
    this.last_time = this.accessDate[0].hora_seauac;
    this.establecimiento = this.route.snapshot.data.info[0];
    this.location = this.route.snapshot.data.info[1];

  }

  async ngOnInit() {
    this.supervisionForm = this._formBuilder.group({
      fecha_de: [],
      fecha_hasta: [],
      distrito: [],
      establecimiento: [],
    })
    
    await this._systemService.getInfoSucursal().subscribe(resp => {
      this.sucursal = resp;
    })
    this.ip = this._utilService.getIp();
    this.date = this._utilService.getDateCurrent();
    this.device = this._utilService.deviceInfo;
    this.getClima();
    this.puntaje = await this._indicadorService.getPuntaje(this._utilService.getSucursal());
    console.log('pinma0>',this.puntaje);
    this.setColor();
  }

  startClock() {
    setInterval(() => {
      let hora = "";
      let fecha = new Date();
      let horas = fecha.getHours();
      let diaSemana = fecha.getDay();
      let minutos = fecha.getMinutes();
      let segundos = fecha.getSeconds();
      let horasArregladas = horas.toString();
      this.ampm = fecha.getHours() >= 12 ? 'PM' : 'AM';
      if (horas < 10) {
        horasArregladas = "0" + horasArregladas;
      }
      let minutosArreglados = minutos.toString();
      if (minutos < 10) {
        minutosArreglados = "0" + minutosArreglados;
      }
      let segundosArreglados = segundos.toString();
      if (segundos < 10) {
        segundosArreglados = "0" + segundosArreglados;
      }
      this.day = this._utilService.semana[diaSemana]
      this.hours = `${horasArregladas}:${minutosArreglados}`;
    }, 500);
  }

  getClima() {


    this._systemService.getClima(this.establecimiento.ciudad).subscribe((resp: any) => {
      //console.log("CLIMAAX=Z",resp);
      this.tempActual = resp.main.temp;
      this.icono = resp.weather[0].icon;
      this.urlIcono = `http://openweathermap.org/img/wn/${this.icono}@4x.png`
    });
  }

  setColor() {
    console.log(this.puntaje);
    const green = 'bg-green-200';
    const yellow = 'bg-yellow-200';
    const red = 'bg-red-200';

    this.puntaje.unoNueve.forEach(element => {
      (element?.porcentaje >= 0 && element?.porcentaje < 71) ? this.color1.push(red) : 0;
      (element?.porcentaje >= 71 && element?.porcentaje < 91) ? this.color1.push(yellow) : 0;
      (element?.porcentaje > 91 && element?.porcentaje <= 100) ? this.color1.push(green) : 0;
    });

    (this.puntaje.diez?.porcentaje>1) ?  this.color1.push(red): (this.puntaje.diez?.porcentaje!=null) ? this.color1.push(green):0 ;
    (this.puntaje.once?.porcentaje>1 && (this.puntaje.once?.porcentaje!=null)) ? this.color1.push(red): (this.puntaje.once?.porcentaje!=null) ? this.color1.push(green):0 ;
    (this.puntaje.doce?.porcentaje<71 && (this.puntaje.doce?.porcentaje!=null)) ? this.color1.push(red): (this.puntaje.doce?.porcentaje!=null) ? this.color1.push(green):0 ;
    (this.puntaje.trece?.porcentaje<100 && (this.puntaje.trece?.porcentaje!=null)) ? this.color1.push(red): (this.puntaje.trece?.porcentaje!=null) ? this.color1.push(green):0 ;

    console.log(this.color1);
  }


}
