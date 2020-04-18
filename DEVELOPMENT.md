# WIP to apply metadata

## Rebuild `.json` and `.txt`

1. `nix-shell`
2. Navigate to https://www.youtube.com/audiolibrary/music  
3. Copy cookies using the extension [cookies.txt](https://chrome.google.com/webstore/detail/cookiestxt/njabckikapfpffapmjgojcnbfjonfjfg?hl=en)  
4. `writecookies`
5. Comment/uncomment `./getjson:15-16`
6. `./getjson`

One should verify that `forall 0 < x <= 1000, music-${x}.{json,txt} contain the same elements`.

## Reverse Engineering

This builds the get request, it is important to make sure that no filters are applied. Since we download all the data it is not that important to understand how this code works.
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

This is an arbitrary track selected using `jq -S '.tracks[0]' music/music-1000.json`.

```javascript
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
  "waveform_url": "https://www.youtube.com/api/editor/waveform?expire=1583982000&if=0&scale=10&editlist=Cgh3YXZlZm9ybRocCIDiCRIWChA0MWI4Y2FmYjEwN2I1MjA5EAAYAg%3D%3D&sigh=Dnzft6Eh05EiAaeKT3sPpA" // used for displaying a waveform when replacing audio
}
```

```javascript
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

## TODO

* Consider a real programming language. 
    * At the moment the concern is how to structure parallel downloading with a json file and if repeated jq parsing/serialising gets too slow.

* What filename format to avoid the current issue with overlapping titles
    * This shouldn't matter when using any music player worth it's salt.

* MP3 Tagging
    * `id3v2` or `mid3v2` or `eyeD3` or `ffmpeg`
    * Consider which version of `id3`, `id3v2.3` seems to have reasonably good support.
    * How to include all the metadata and [which frames to put what in](http://id3.org/id3v2.3.0#Declared_ID3v2_frames)


* Extra Tagging
    * `beets` or `picard`