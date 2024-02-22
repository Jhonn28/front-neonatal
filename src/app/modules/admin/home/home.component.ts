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


  anio;
  sucursal;

  accessDate: any;
  location: IPokedex;
  last_date: string;
  last_time: string;

  admin_distrital;

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
    console.log('user=>', this.user);
    this.accessDate = _authService.accessDate;
    this.admin_distrital = this.user.admin_multi_segusu;
    this.last_date = _utilService.getFormatDate(this.accessDate[0].fecha_seauac, 'yyyy/mm/dd');
    this.last_time = this.accessDate[0].hora_seauac;
    this.establecimiento = this.route.snapshot.data.info[0];
    this.location = this.route.snapshot.data.info[1];

  }

  async ngOnInit() {


    await this._systemService.getInfoSucursal().subscribe(resp => {
      this.sucursal = resp;
    })
    this.anio = this._utilService.getDateCurrent('YYYY/MM/DD');
    this.ip = this._utilService.getIp();
    this.date = this._utilService.getDateCurrent();
    this.device = this._utilService.deviceInfo;
    this.getClima();
    this.puntaje = await this._indicadorService.getPuntaje(this._utilService.getEmpresa(),this.anio);
    console.log('pinma0>', this.puntaje);
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
    const white = 'bg-slate-50';

    this.puntaje.unoNueve.forEach(element => {
      const puntaje = Number(element?.porcentaje);
      
      console.log('nummmber=>',puntaje);
      if(!puntaje){
        console.log('emtro a null');
      }
      (!element?.porcentaje) ? this.color1.push(white):0;
      (element?.porcentaje && element?.porcentaje >= 0 && element?.porcentaje < 71) ? this.color1.push(red):0;
      (element?.porcentaje && element?.porcentaje >= 71 && element?.porcentaje < 91) ? this.color1.push(yellow):0;
      (element?.porcentaje && element?.porcentaje >= 91 && element?.porcentaje <= 100) ? this.color1.push(green):0;
      /* (puntaje >= 0 && puntaje < 71 && puntaje != null ) ? this.color1.push(red) : 0 ;
      (puntaje >= 71 && puntaje < 91 && puntaje != null) ? this.color1.push(yellow) : 0 ;
      (puntaje > 91 && puntaje <= 100 && puntaje != null) ? this.color1.push(green) : 0 ;
      (!puntaje || puntaje === null ) ? this.color1.push(white) : 0; */

    });

    (this.puntaje.diez?.porcentaje > 1) ? this.color1.push(red) : (this.puntaje.diez?.porcentaje != null) ? this.color1.push(green) : this.color1.push(white);
    (this.puntaje.once?.porcentaje > 1 && (this.puntaje.once?.porcentaje != null)) ? this.color1.push(red) : (this.puntaje.once?.porcentaje != null) ? this.color1.push(green) : this.color1.push(white);
    (this.puntaje.doce?.porcentaje < 71 && (this.puntaje.doce?.porcentaje != null)) ? this.color1.push(red) : (this.puntaje.doce?.porcentaje != null) ? this.color1.push(green) : this.color1.push(white);
    (this.puntaje.trece?.porcentaje < 100 && (this.puntaje.trece?.porcentaje != null)) ? this.color1.push(red) : (this.puntaje.trece?.porcentaje != null) ? this.color1.push(green) : this.color1.push(white);

    console.log(this.color1);
  }


}
