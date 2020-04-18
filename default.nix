with import <nixpkgs> {};

let
    writecookies = pkgs.writeShellScriptBin "writecookies" ''
        ${pkgs.xclip}/bin/xclip -selection clipboard -o > cookies.txt
    '';
    getjson = pkgs.writeShellScriptBin "getjson" ''
        SI=$((0))
        echo "$SI"

        # max mr=1000
        ${pkgs.aria2}/bin/aria2c --out=music0.json --load-cookies=cookies.txt 'https://www.youtube.com/audioswap_ajax?action_get_tracks=1&dl=true&s=music&mr=1000&si=0&qid=0&sh=true'
    '';
in stdenv.mkDerivation {    
    name = "youtube-audio-library-download-all";

    buildInputs = [
        shellcheck
        writecookies
        getjson
        aria2 
        picard 
        jq
    ];
}
