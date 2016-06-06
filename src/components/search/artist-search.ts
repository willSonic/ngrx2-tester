import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import { Component, Output, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import {MdToolbar} from '@angular2-material/toolbar';
import {MdButton} from 'ng2-material';
import {MdInput} from '@angular2-material/input';
import {MdIcon} from 'ng2-material';
import {MATERIAL_DIRECTIVES} from 'ng2-material';




export type QueryInput = string;
export type SearchOutput = string;

@Component({
  selector: 'app',
	directives: [
	    MATERIAL_DIRECTIVES,
	    MdToolbar,
	    MdButton,
	    MdInput,
	    MdIcon
	],
	templateUrl  : 'main.app.html',
})

export default class ArtistSearch {


    keyup$ = new Subject<KeyboardEvent>();

	@Input() query: QueryInput = '';
	  @Output() search: Observable<SearchOutput> = this.keyup$
		.debounceTime(300)
		.map(event => (event.target as HTMLInputElement).value)
		.distinctUntilChanged();


}
