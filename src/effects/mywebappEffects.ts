import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { Effect, StateUpdates, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';



import { AppState } from '../reducers';
import { ArtistService } from '../services/artistService';
import { ArtistActions } from '../actions/artistsAction';
import { Artist } from '../models';