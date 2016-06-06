import { Component, Output, Input } from '@angular/core';
import { ArtistSearch } from './components/search/artist-search'
import { MdToolbar } from '@angular2-material/toolbar';
import {MATERIAL_DIRECTIVES } from 'ng2-material';


@Component({
  selector: 'app',
	directives: [
	    MATERIAL_DIRECTIVES,
	    MdToolbar,
	    ArtistSearch
	],
	template:`
				<md-toolbar>
					Wilsonic NRGX2 Test Harness
					<span class="app-toolbar-filler"></span>
				</md-toolbar>
				
				<div class="app-content" layout="row" flex="100">
                       <route-view></route-view>      
                </div>
             `
})
export default class App {}

