import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { BtnMenuComponent } from './btn-menu/btn-menu.component';
import { UserComponent } from './user/user.component';
import { TopArtistComponent } from './top-artist/top-artist.component';
import { RightPanelComponent } from './right-panel/right-panel.component';
import { TopArtistsComponent } from './top-artists/top-artists.component';
import { PlayerCardComponent } from './player-card/player-card.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MenuComponent,
    BtnMenuComponent,
    UserComponent,
    TopArtistComponent,
    RightPanelComponent,
    TopArtistsComponent,
    PlayerCardComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    MenuComponent, 
    BtnMenuComponent, 
    UserComponent, 
    TopArtistComponent, 
    RightPanelComponent
  ]
})
export class ComponentsModule { }
