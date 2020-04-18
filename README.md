# WIP plan to download metadata

## Instructions

1. Navigate to https://www.youtube.com/audiolibrary/music  
2. Copy cookies using the extension [cookies.txt](https://chrome.google.com/webstore/detail/cookiestxt/njabckikapfpffapmjgojcnbfjonfjfg?hl=en)  
3. Create `cookies.txt` with `xclip -selection clipboard -o > cookies.txt` or otherwise



perform requests to https://www.youtube.com/audioswap_ajax?action_get_tracks=1&dl=true&s=music&mr=25&si=0&qid=0&sh=true with `wget`/`aria2`  
`si=mr*i&qid=i` increment `i`  
continue until `jq .has_more output.json` is false

Sound effects are https://www.youtube.com/audioswap_ajax?action_get_tracks=1&dl=true&s=soundeffects&mr=25&si=0&qid=0&sh=true

```javascript
// https://www.youtube.com/yts/jsbin/www-audiolibrary-vflqWS6UC/www-audiolibrary.js:formatted:10534
    ;function Ip(a, b, c, d, e, f, g, h, k) {
        function m(q, t) {
            q in b && (n[t] = b[q])
        }
        var n = {};
        b = b || {};
        m("query", "q");
        m("keyword", "kw");
        m("reserved_keyword", "rkw");
        m("title", "t");
        m("artist", "ar");
        m("album", "al");
        m("genre", "g");
        m("instrument", "it");
        m("mood", "mo");
        m("downloadable", "dl");
        m("min_length", "minl");
        m("max_length", "maxl");
        m("section", "s");
        m("category", "cat");
        m("audio_revshare", "arev");
        m("min_license_type", "minlt");
        m("max_license_type", "maxlt");
        m("continuation_token", "ct");
        n.mr = c ? c : 20;
        n.si = d || 0;
        n.qid = a;
        n.sh = !!e;
        a = {
            format: "JSON",
            method: "GET",
            context: k,
            cb: n
        };
        f && (a.onSuccess = f);
        g && (a.ia = g);
        h && (a.onError = h);
        vm("/audioswap_ajax?action_get_tracks=1", a)
    }
```

```bash
# max mr=1000
aria2c --out=music0.json --load-cookies=cookies.txt 'https://www.youtube.com/audioswap_ajax?action_get_tracks=1&dl=true&s=music&mr=1000&si=0&qid=0&sh=true'

jq -s '.[0].tracks = [.[].tracks | add] | .[0]' music*.json > music.json
jq -s '.[0].tracks + .[1].tracks | {tracks: .}' music*.json > music.json # should only be dealing with 2 files at a time
jq -s 'reduce .[] as $item ({}; . * $item)' music*.json > music.json # doesn't play well with .tracks

jq -s '{ tracks: map(.tracks[]), has_more: map(.has_more) | all, qid: map(.qid) | max, continuation_token: map(.continuation_token) | add}' music?.json > music.json
```

merge with `jq` then parse  
`aria2c` download the mp3 files  
`id2v3` or eyeD3 for tagging  
`beets` for additional tags?

```bash
# each on one line
jq -c '.tracks | .[]' music.json

```

It's probably time for a real language 

```javascript
// an artibary track 
// jq -S '.tracks[0]'  music.json
{
  "album": "None",
  "artist": "Sir Cubworth",
  "artist_channel_url": "/channel/UC3edSSIDJPTZmBM-m9_G3Nw",
  "artist_url": "",
  "category": "",
  "display_category": "",
  "display_genre": "Cinematic",
  "display_mood": "Dramatic",
  "download_url": "https://www.youtube.com/audiolibrary_download?vid=41b8cafb107b5209",
  "downloadable": true, // I've never seen this as false?
  "favorite": false,
  "fp_ref_id": "41b8cafb107b5209",
  "genre": "Cinematic",
  "instruments": [
    "Synth",
    "drums",
    "Strings",
    "Piano"
  ],
  "is_new_track": false,
  "len": 160, // length of track in seconds
  "license_type": 1, // 0-2 no attribution required (what is the difference then?), 3-6 different CC versions
  "mood": "Dramatic",
  "popularity_percentile": 99,
  "reference_vid": "41b8cafb107b5209",
  "streamid": "4V24F_qzl1IleCjzOOkyOz772PL2xA5USYKBYN1s7sfymP6iSw4ca83D9LyK26T0",
  "title": "Magical Triumph",
  "track_url": "",
  "vid": "41b8cafb107b5209",
  "waveform_url": "https://www.youtube.com/api/editor/waveform?expire=1583982000&if=0&scale=10&editlist=Cgh3YXZlZm9ybRocCIDiCRIWChA0MWI4Y2FmYjEwN2I1MjA5EAAYAg%3D%3D&sigh=Dnzft6Eh05EiAaeKT3sPpA"
}

// https://www.youtube.com/yts/jsbin/www-audiolibrary-vflqWS6UC/www-audiolibrary.js:formatted:1193
    function gp(a) {
        switch (a) {
        case 3:
            return {
                name: "Creative Commons Attribution",
                url: "https://creativecommons.org/licenses/by/1.0/"
            };
        case 4:
            return {
                name: "Creative Commons Attribution",
                url: "https://creativecommons.org/licenses/by/2.0/"
            };
        case 5:
            return {
                name: "Creative Commons Attribution",
                url: "https://creativecommons.org/licenses/by/3.0/"
            };
        case 6:
            return {
                name: "Creative Commons Attribution",
                url: "https://creativecommons.org/licenses/by/4.0/"
            }
        }
        return null
    }
```
```html
<div class="music-templates-root hid">
    <div class="music-attribution-monetization-section">
You're free to use this song and monetize your video, but you must include the following in your video description:
    </div>

    <div class="music-attribution-no-monetization-section">
You’re free to use this song in any of your videos, but you must include the following in your video description:
    </div>

    <div class="music-no-attribution-monetization-section">
You're free to use this song and monetize your video.
    </div>

    <div class="music-no-attribution-no-monetization-section">
You’re free to use this song in any of your videos.
    </div>

    <div id="music-attribution-template">
      <!--
        <div class="music-attribution license">
<span class='attribution_title'>__title__</span> by <span class='attribution_artist'>__artist__</span> is licensed under a <span class='attribution_license'>__license_name__</span> license (<a href='__license_url__' target='blank'>__license_url__</a>)
        </div>
      -->
    </div>

    <div id="music-attribution-track-template">
      <!--
        <div class="music-attribution track">
Source: <a href='__track_url__' target='blank'>__track_url__</a>
        </div>
      -->
    </div>

    <div id="music-attribution-artist-template">
      <!--
        <div class="music-attribution artist">
Artist: <a href='__artist_url__' target='blank'>__artist_url__</a>
        </div>
      -->
    </div>
  </div>
```

# youtube-audio-library-download-all

Some quick scripts to download the youtube audio library.  
Downloads using aria2 have the correct filename and can resume easily.

`nix-shell`  
`mkdir music`  
`cd music`  
`aria2c  --auto-file-renaming=false -x 8 -j 16  -i ../music.txt`  

# Notes

This is an attempt to download and clean (apply metadata) music from youtube's audio library for listening. The goal is to produce a organised local playlist that can be ingested by a music player for listening in the background. The hope is that this will aid in music discovery for creative purposes where creative commons or royalty free music is required. 

At the moment downloading music has been successful but unfortunatly the list is a mess, half of the files do not have the correct genre or mood metadata.

An attempt to categorise things with MusicBrain Picard was made, but this did not end correctly categorising everything. 

It looks like something could be done to reverse engineer the youtube api's endpoint [https://www.youtube.com/audioswap_ajax](https://www.youtube.com/audioswap_ajax?), but this is only accessable when logged in. There is [evidence of other people using this but no official documentation](https://www.google.co.uk/search?q=youtube+audioswap_ajax). Perhaps [youtube-dl](https://github.com/ytdl-org/youtube-dl) would be some kind of starting point.

[Perhaps other places could be used too, but the difficulty here is verifying that the music won't be incorrectly flagged.](https://creativecommons.org/about/program-areas/arts-culture/arts-culture-resources/legalmusicforvideos/).


