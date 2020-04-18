with import <nixpkgs> {};

let
    writecookies = pkgs.writeShellScriptBin "writecookies" ''
        ${pkgs.xclip}/bin/xclip -selection clipboard -o > cookies.txt
    '';
in stdenv.mkDerivation {
    srcs = ./.;
    name = "youtube-audio-library-download-all";

    buildInputs = [
        shellcheck

        writecookies
        
        curl
        aria2 
        jq
        
        picard 
    ];
}
