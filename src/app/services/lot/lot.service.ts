import { Injectable } from '@angular/core';

import { ApiRoutes } from '../../models/ApiRoutes';

import {ServerResponse} from "../../models/server/ServerResponse";

import {HttpClient, HttpParams, HttpRequest} from "@angular/common/http";

import { Lot } from '../../models/lot/Lot';
import {FileInput} from 'ngx-material-file-input';

@Injectable({
  providedIn: 'root'
})
export class LotService {

  constructor(
    private http: HttpClient
  ) { }

  getTypeLot( offset: number, limit: number ): Promise<ServerResponse>{

    const httpParams: HttpParams = new HttpParams()
      .set('limit' , limit.toString())
      .set('offset' , offset.toString());

    return this.http.get(
      `${ApiRoutes.SERVER_URL}${ApiRoutes.GET_LOT_TYPES_LIST}`,
      {
        params: httpParams
      }
    ).toPromise() as Promise<ServerResponse>;

  }//getTypeLot

  getSingleLot( id: string ): Promise<ServerResponse>{

    if (id) {
      const httpParams: HttpParams = new HttpParams()
        .set('id', id);

      return this.http.get(
        `${ApiRoutes.SERVER_URL}${ApiRoutes.GET_SINGLE_LOT}`,
        {
          params: httpParams
        }
      ).toPromise() as Promise<ServerResponse>;

    }//if

  }//getSingleLot

  addLot( lot: Lot, files: FileInput ): Promise<ServerResponse>{

    console.log('files' , files);

    const formData = new FormData();

    [].forEach.call(files.files , ( file ) => {
      formData.append('files' , file );
    });

    formData.append('lotTitle' , lot.lotTitle) ;

    console.log('files' , files);

    return this.http.post(
      `${ApiRoutes.SERVER_URL}${ApiRoutes.ADD_LOT}`,
      formData
    ).toPromise() as Promise<ServerResponse>;

  }//getLot
}
