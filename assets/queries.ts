import { Dispatch, SetStateAction } from "react";
import { CurrentTrack, TrackModel } from "../models/models";
import { get } from "./requests";


export const getPlaylists = (cb: Dispatch<SetStateAction<any[]>>) => {
    get('/api/playlists', {}, (data: any) => cb(data.items) )
}

export const currentlyPlaying = (cb: (cur: CurrentTrack, isPlaying: boolean) => void ) => {
    get('/api/currently-playing', {}, (t: any) => {
        const { is_playing, progress_ms } = t;
        const { name, id, duration_ms, album, artists } = t.item
        const image = album.images[Math.min(1, album.images.length - 1)].url
        const _artists = artists.map( artist => artist.name )
        const cur: CurrentTrack = {
            added_at: undefined,
            name, id, image, duration_ms,
            album: album.name, artists: _artists,
            position_ms: progress_ms 
        }
        cb(cur, is_playing)
    })
}

export const play = ( track: TrackModel, cb: (data: any) => void ) => {
    get('/api/play', { id: track.id }, cb )
}

export const pause = ( cb: () => void ) => {
    get('/api/pause', {}, cb )
}

export const resume = ( trackId: string, position_ms: number, cb: () => void ) => {
    get('/api/resume', { trackId, position_ms }, cb )
}

export const seek = ( position_ms: number, cb: (data: any) => void ) => {
    get('/api/seek', { position_ms }, cb )
}

export const next = ( cb: () => void ) => {
    get('/api/next', {}, cb )
}

export const prev = ( cb: () => void ) => {
    get('/api/prev', {}, cb )
}