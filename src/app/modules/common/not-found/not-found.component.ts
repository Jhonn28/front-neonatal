import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent implements OnInit {

  constructor(private _router: Router,private _activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    let route = this._activatedRoute;
    const url = this._router.parseUrl(this._router.url);
    const data = this._activatedRoute.data;
    console.log(route.snapshot.queryParamMap.get('type'))
  }

}
