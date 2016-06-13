let STORE_SLICE_NAME = 'artists';

export const artistSelector = (store: any) => store.select(STORE_SLICE_NAME);
export const artistAsArraySelector = (store: any) => store.select(STORE_SLICE_NAME).map(res => Object.keys(res).map(key => res[key]));

