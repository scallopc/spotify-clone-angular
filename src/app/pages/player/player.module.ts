import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { RouterModule } from '@angular/router';
import { PlayerRoutes } from './player.rounting';
import { ComponentsModule } from 'src/app/components/components.module';
import { HomeComponent } from '../home/home.component';
import { MusicListComponent } from '../music-list/music-list.component';



@NgModule({
  declarations: [
    PlayerComponent,
    HomeComponent,
    MusicListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PlayerRoutes),
    ComponentsModule
  ]
})
export class PlayerModule { }
