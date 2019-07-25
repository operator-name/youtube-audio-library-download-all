# youtube-audio-library-download-all

Some quick scripts to download the youtube audio library.  
Downloads using aria2 have the correct filename and can resume easily.

`nix-shell`  
`mkdir music`  
`cd music`  
`aria2c  --auto-file-renaming=false -x 8 -j 16  -i ../music.txt`  


