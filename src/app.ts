import { Component, Output, Input } from '@angular/core';
import { MdAnchor, MdButton } from '@angular2-material/button';
import { MdToolbar } from '@angular2-material/toolbar';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';

import {MATERIAL_DIRECTIVES } from 'ng2-material';


@Component({
  selector: 'app',
	directives: [
		MdAnchor,
		MdButton,
		MdToolbar,
		MD_SIDENAV_DIRECTIVES,
		MdIcon,
		MD_LIST_DIRECTIVES
	],
	providers: [ MdIconRegistry ],
	styles: [`
		* {
		  -webkit-font-smoothing: antialiased;
		  -moz-osx-font-smoothing: grayscale;
		}
	
		.secondary {
          color: #EBEBEB;
		}
		md-content{
          color: #EBEBEB;
		}
		.app-content {
		   background-color:#65788b;
		}

	    md-sidenav-layout {
           background-color:#65788b;
        }

        .sidenav-layout md-sidenav{
           background:#65788b;
           background-color:#65788b;
           width: 300px;
        }
        
        a {
          color: #2aa4c9;
          text-decoration: none;
        }
        
  `],
	template:`
				<md-sidenav-layout fullscreen class="sidenav-layout" >
				    <md-sidenav #sidenav>
						<md-nav-list>
						  <a md-list-item linkTo="/" (click)="sidenav.close()">
							<md-icon md-list-icon>list</md-icon>
							<span md-line><My Music Collection</span>
							<span md-line class="secondary">View in Playlist</span>
						  </a>
						  <a md-list-item linkTo="/audioArtist/find" (click)="sidenav.close()">
							<md-icon md-list-icon>search</md-icon>
							<span md-line> Spotify Artist Search</span>
							<span md-line class="secondary">Search for Music</span>
						  </a>
						</md-nav-list>
				    </md-sidenav>
					<md-toolbar>
						<button md-icon-button (click)="sidenav.open()">
						  <md-icon>menu</md-icon>
						</button>
						Wilsonic NRGX2 Test Harness
						<span class="app-toolbar-filler"></span>
					</md-toolbar>
					<div class="app-content" layout-fill layout="row">
						<section>
						   <route-view></route-view>      
					   </section>
						<aside>
						  <route-view name="sideMenu"></route-view>
						</aside>
					</div>
			    </md-sidenav-layout> 
			  `
})
export default class App {}

