interface Image{
       height:number;
       url:string;
       width:number;
}

interface Artist{
    external_urls : {
        spotify: string
    },
    href: string,
    id: string,
    name: string,
    type: string,
    uri: string
}

interface Album{
    album_type:string,
    available_markets :string[],
    id: string;
    href:string;
    external_urls:{
        spotify:string;
    }
    genres:string[];
    images: Image[];
    name:string;
    popularity:string;
    preview_url:string,
    track_number:number;
    type:string;
    uri:string;
}

export interface AudioArtist {
  album:Album;
  artist:Artist;
}