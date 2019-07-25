var tracks = document.getElementsByClassName("track-list")[0];
var prevLastTrack = tracks.children[tracks.children.length-1];
var audioTracks = [];

function scrollToBottom() {
    let lastTrack = tracks.children[tracks.children.length-1];
    if (lastTrack != prevLastTrack) {
        prevLastTrack.scrollIntoView();
        prevLastTrack = lastTrack;
    } else {
        let elAudioLibraryContent = document.querySelector('#audio-library-content');
        let elAudioLibraryBrowser = elAudioLibraryContent.querySelector('.audio-library-browser');
        let elAudioLibraryTrackList = elAudioLibraryBrowser.querySelector('.track-list');
        let elAudioLibraryTrackFooter = elAudioLibraryContent.querySelector('#audio-library-track-footer');
        audioTracks = Array
            .from(elAudioLibraryTrackList.querySelectorAll('div.audiolibrary-column.audiolibrary-column-download a'))
            .map(function (link) { return link.href; })
            .filter(function (link, i, a) { return i === a.lastIndexOf(link); });
    }
}

var interval = setInterval(scrollToBottom, 1000);

//clearInterval(interval);
//copy(audioTracks);