import { Component, Output, Input } from '@angular/core';
import { MdToolbar } from '@angular2-material/toolbar';
//import { MdAnchor, MdButton } from '@angular2-material/button';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import {MATERIAL_DIRECTIVES } from 'ng2-material';


@Component({
  selector: 'app',
	directives: [
	    MATERIAL_DIRECTIVES,
	    MdToolbar,
	    MD_LIST_DIRECTIVES
	],
	styles: [`
		* {
		  -webkit-font-smoothing: antialiased;
		  -moz-osx-font-smoothing: grayscale;
		}
	
		.secondary {
		  color: rgba(0, 0, 0, .54);
		}
		md-content.app-content {
		   background-color:#65788b;
		}
  `],
	template:`
				<md-toolbar>
					Wilsonic NRGX2 Test Harness
					<span class="app-toolbar-filler"></span>
				</md-toolbar>
				
				<div class="app-content" layout-fill layout="column">
                       <route-view></route-view>      
                </div>
             `
})
export default class App {}

