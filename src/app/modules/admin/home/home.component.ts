import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService, IDeviceInfo, IPokedex, UserCore, UtilsService } from '../../../../../projects/libreria/src/public-api';
import { SystemService } from '../../../../../projects/libreria/src/lib/services/system.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {
  puntaje;
  color:string;
  ip: string;
  date;
  user: UserCore;
  hours;
  day;
  device: IDeviceInfo
  ampm: string;
  establecimiento: any;
  clima: any[]=[];
  ciudad='';
  tempActual='';
  tempMin='';
  tempMax='';
  icono='';
  descripcion='';
  urlIcono='';
  sucursal;

  accessDate: any;
  location: IPokedex;
  last_date: string;
  last_time: string;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private route: ActivatedRoute,
    private _utilService: UtilsService,
    private _authService: AuthService,
    private _systemService: SystemService,
    ) {
      this.startClock();
      this.user = this._authService.usuario;
      this.accessDate = _authService.accessDate;
      //console.log('accessDATE=>',this.accessDate);
      this.last_date = _utilService.getFormatDate(this.accessDate[0].fecha_seauac,'yyyy/mm/dd');
      //this.last_date = this.accessDate.fecha_seauac;
      this.last_time = this.accessDate[0].hora_seauac;
      //console.log(this.route.snapshot.data.info);
      this.establecimiento = this.route.snapshot.data.info[0];
      //console.log("DATOS SUCUR=>",this.establecimiento);
      this.location = this.route.snapshot.data.info[1];
      /* this.location.geoplugin_city = 'Quito';
      this.location.geoplugin_region= 'Pichincha'; */
    }
    
    async ngOnInit() {
    await this._systemService.getInfoSucursal().subscribe(resp=>{
      this.sucursal=resp;
    })


    this.ip = this._utilService.getIp();
    this.date = this._utilService.getDateCurrent();
    this.device = this._utilService.deviceInfo;
    this.getClima();
    //this.puntaje = await this._seguimientoService.getPuntaje(this._utilService.getSucursal());
    //console.log('pun=>',this.puntaje);
    (this.puntaje<=60)? this.color='bg-red-200': 0;
    (this.puntaje>60 && this.puntaje<80)? this.color='bg-yellow-200': 0;
    (this.puntaje>80)? this.color='bg-green-200': 0;

    console.log(this._utilService.getMultinacional(),this._utilService.getEmpresa(),this._utilService.getSucursal());
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

  getClima(){


    this._systemService.getClima(this.establecimiento.ciudad).subscribe((resp: any) => {
      //console.log("CLIMAAX=Z",resp);
     this.tempActual=resp.main.temp;
     this.icono=resp.weather[0].icon;
      this.urlIcono = `http://openweathermap.org/img/wn/${this.icono}@4x.png`
    });
  }

}
