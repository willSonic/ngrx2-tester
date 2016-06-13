import { Pipe } from '@angular/core';

@Pipe({
  name: 'addCommas'
})
export class AddCommasPipe {
  transform(artists) {
    switch (artists.length) {
      case 1:
        return artists[0].name;
      case 2:
        return artists.map((artist) => { return artist.name;}).join(' and ');
      default:
        const last = artists[artists.length - 1].name;
        const remaining = artists.slice(0, -1).map((artist) => { return artist.name;});
        return `${remaining.join(', ')}, and ${last}`;
    }
  }
}
