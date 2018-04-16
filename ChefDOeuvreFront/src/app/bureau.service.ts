import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Ibureau } from './ibureau';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { tap } from 'rxjs/operators';

@Injectable()
export class BureauService {

  constructor(private api: ApiService) { }

  getBureau(): Observable<Ibureau[]> {
    return this.api.getBureau() as Observable<Ibureau[]>;
  }

}
