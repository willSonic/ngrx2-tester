import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import { Component, Output, Input,Directive } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import {MdButton} from 'ng2-material';
import {MdInput} from '@angular2-material/input';
import {MdIcon} from 'ng2-material';
import {MATERIAL_DIRECTIVES} from 'ng2-material';



export type QueryInput = string;
export type SearchOutput = string;

@Component({
  selector: 'artist-search',
  directives: [
	    MATERIAL_DIRECTIVES,
	    MdButton,
	    MdInput,
	    MdIcon
	],
	template:require('./main.app.html')
})

export class ArtistSearch {

    keyup$ = new Subject<KeyboardEvent>();

	@Input() query: QueryInput = '';
	@Output() search: Observable<SearchOutput> = this.keyup$
		.debounceTime(300)
		.map(event => (event.target as HTMLInputElement).value)
		.distinctUntilChanged();


}
