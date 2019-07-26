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


