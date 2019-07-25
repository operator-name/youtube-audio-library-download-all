var tracks = document.getElementsByClassName("track-list")[0];
var prevLastTrack = tracks.children[tracks.children.length-1];
var audioTracks = [];

function scrollToBottom() {
    prevLastTrack.scrollIntoView();
    let lastTrack = tracks.children[tracks.children.length-1];
    if (lastTrack != prevLastTrack) {
        prevLastTrack = lastTrack;
    } else {
        audioTracks = Array
            .from(tracks.querySelectorAll('div.audiolibrary-column.audiolibrary-column-download a'))
            .map(function (link) { return link.href; })
            .filter(function (link, i, a) { return i === a.lastIndexOf(link); });
    }
}

var interval = setInterval(scrollToBottom, 1000);

//clearInterval(interval);
//copy(audioTracks);