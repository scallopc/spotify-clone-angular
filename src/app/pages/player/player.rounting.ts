import { Routes } from "@angular/router";
import { HomeComponent } from "../home/home.component";
import { MusicListComponent } from "../music-list/music-list.component";
import { PlayerComponent } from "./player.component";

export const PlayerRoutes: Routes = [

    {
        path: '',
        component: PlayerComponent,
        children: [{
            path: 'home',
            component: HomeComponent
        },
        {
            path: 'list/:type/:id',
            component: MusicListComponent
        }
    ]
    }
]