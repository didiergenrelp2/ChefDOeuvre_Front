import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Ibureau } from './ibureau';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { tap } from 'rxjs/operators';

@Injectable()
export class BureauService {

  constructor(private api: ApiService) { }

  recupererBureaux(): Observable<Ibureau[]> {
    return this.api.recupererBureaux() as Observable<Ibureau[]>;
  }

  recupererBureau(id): Observable<Ibureau> {
    return this.api.recupererBureau(id) as Observable<Ibureau>;
  }
  
}
