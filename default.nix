with import <nixpkgs> {};

stdenv.mkDerivation {
    name = "youtube-audio-library-download-all";

    buildInputs = [ 
      aria2 
      picard 
      jq
    ];
}
