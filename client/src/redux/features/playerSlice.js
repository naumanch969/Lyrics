import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {},
  genreListId: '',
};

// createSlice - simillar to creating reducers in react-redux (react-redux and redux/toolkit are different a bit)
const playerSlice = createSlice({                     // this is boiler plate of redux/toolkit - extra-line-8
  name: 'player',
  initialState,
  reducers: {

    // first switch statement   -- comparatively
    setActiveSong: (state, action) => {               //?? by consoling state, it gives ajeeb answer, but i can use object elements, specified in initial state
      //action = { payload:{data:(50)[{… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }],i:2,song:{ layout: '5', type: 'MUSIC', key: '632531170', title: 'Unholy', subtitle: 'Sam Smith & Kim Petras', … }},type:"player/setActiveSong" }
      //song = { artists: [{ alias: 'jin', id: '42', adamid: '1191850724' }],highlightsurls:{ },hub:{ type: 'APPLEMUSIC', image: 'https://images.shazam.com/static/icons/hub/web/v5/applemusic.png', actions: Array(2), options: Array(1), explicit: false, … },images:{ background: 'https://is5-ssl.mzstatic.com/image/thumb/Music122/…b8e-30b6-16531daf8b94/pr_source.png/800x800cc.jpg', coverart: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/…253b-299eaf34eb5e/8809829712307.jpg/400x400cc.jpg', coverarthq: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/…253b-299eaf34eb5e/8809829712307.jpg/400x400cc.jpg', joecolor: 'b:221e1fp:d4d6cfs:d3d8aet:b0b1acq:b0b391' },key:"590865488",layout:"5",properties:{ },share:{ subject: 'Yours - JIN', text: 'I used Shazam to discover Yours by JIN.', href: 'https://www.shazam.com/track/590865488/yours', image: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/…253b-299eaf34eb5e/8809829712307.jpg/400x400cc.jpg', twitter: 'I used @Shazam to discover Yours by JIN.', … },subtitle:"JIN",title:"Yours",type:"MUSIC",url:"https://www.shazam.com/track/590865488/yours"}
      state.activeSong = action.payload.song;         // setting current song (which is playing)
      state.currentIndex = action.payload.i;          // setting index of current song
      state.isActive = true;                          // setting active true for current song
      if (action.payload?.data?.tracks?.hits) {
        state.currentSongs = action.payload.data.tracks.hits;
      } else if (action.payload?.data?.properties) {
        state.currentSongs = action.payload?.data?.tracks;
      } else {
        state.currentSongs = action.payload.data;     // setting current fetched songs to currentSongs (take a look in initialState)
      }
    },

    // second switch
    nextSong: (state, action) => {
      //action = {type: 'player/nextSong', payload: 2}
      if (state.currentSongs[action.payload]?.track) {
        state.activeSong = state.currentSongs[action.payload]?.track;
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }
      state.currentIndex = action.payload;
      state.isActive = true;
    },

    // third switch
    prevSong: (state, action) => {                    //action = {type: 'player/nextSong', payload: 2}
      if (state.currentSongs[action.payload]?.track) {
        state.activeSong = state.currentSongs[action.payload]?.track;
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }
      state.currentIndex = action.payload;
      state.isActive = true;
    },

    // fourth switch
    playPause: (state, action) => {                   // action = {type: 'player/playPause', payload: true/false}
      state.isPlaying = action.payload;
    },

    // fifth switch
    selectGenreListId: (state, action) => {
      console.log("action", action.payload)
      state.genreListId = action.payload;
    },

  },
});

export const { setActiveSong, nextSong, prevSong, playPause, selectGenreListId } = playerSlice.actions;

export default playerSlice.reducer;
