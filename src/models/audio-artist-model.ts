interface Image{
       height:number;
       url:string;
       width:number;
}




export interface AudioArtist {
    id: string;
    external_urls:{
        spotify:string;
    }
    followers:{
        href:string;
        total:number;
    }
    genres:string[];
    images: Image[];
    name:string;
    popularity:string;
    type:string;
    uri:string;
}