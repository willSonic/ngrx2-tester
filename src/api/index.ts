import { HTTP_PROVIDERS } from '@angular/http';
import { AudioPlayerService } from './audioplayerAPI';
import { ArtistService } from './artistAPI';
import { AudioDataLoadService } from './audioloadAPI';

export default[
    HTTP_PROVIDERS,
    AudioPlayerService,
    ArtistService,
    AudioDataLoadService
]
