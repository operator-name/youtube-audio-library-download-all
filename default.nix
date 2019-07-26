with import <nixpkgs> {};

in stdenv.mkDerivation rec {
    name = "youtube-audio-library-download-all";

    buildInputs = [ aria2 picard ];
}