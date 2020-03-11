# WIP plan to download metadata

idea:

Navigate to https://www.youtube.com/audiolibrary/music  
Download cookies with [cookies.txt](https://chrome.google.com/webstore/detail/cookiestxt/njabckikapfpffapmjgojcnbfjonfjfg?hl=en)  
perform requests to https://www.youtube.com/audioswap_ajax?action_get_tracks=1&dl=true&s=music&mr=25&si=0&qid=0&sh=true with `wget`/`aria2`  
`si=mr*i&qid=i` increment `i`  
continue until `jq .has_more output.json` is false

Sound effects are https://www.youtube.com/audioswap_ajax?action_get_tracks=1&dl=true&s=soundeffects&mr=25&si=0&qid=0&sh=true

```javascript
// https://www.youtube.com/yts/jsbin/www-audiolibrary-vflqWS6UC/www-audiolibrary.js:1193
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
```

```bash
# max mr=1000
aria2c --out=music0.json --load-cookies=cookies.txt 'https://www.youtube.com/audioswap_ajax?action_get_tracks=1&dl=true&s=music&mr=1000&si=0&qid=0&sh=true'

jq -s 'reduce .[] as $item ({}; . * $item)' music*.json > music.json
```

merge with `jq` then parse  
`aria2c` download the mp3 files  
`id2v3` or eyeD3 for tagging  
`beets` for additional tags?

It's probably time for a real language 

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


