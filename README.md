# youtube-audio-library-download-all

## Instuctions

1. Install [`aria2`](https://aria2.github.io/)
2. `cd music`
3. `aria2c  --auto-file-renaming=false --max-connection-per-server=8 --max-concurrent-downloads=16 --input-file=music-1000.txt`

Change `--max-connection-per-server` and `--max-concurrent-downloads` depending on your computer, internet and when youtube starts throttling you/putting up captchas. The current numbers have been tested once overnight and did not seem to produce any issues.

`wget --content-disposition -i music-1000.txt` or `curl` also works, but you'll have to manually parallelise it with `xargs` or `parallel`. `aria2` also has the benefit of being able to automatically continue if interrupted.  

The overall download is ~30gb for both music and sound effects. Note that the current audio library at time of writing has the following songs with repeated titles, which may be overwritten when using the instructions. 


```javascript
// jq -Sc '[{title:.tracks[].title}] | group_by(.title) | map(select(length > 1)) | map({(.[0].title):length}) | .[]' music-1000.json # select tracks with the same title
{"Amazing Grace":2}
{"Bar Crawl":2}
{"Bittersweet":2}
...
```
<details>
  <summary>Show all</summary>
  
```javascript
{"Contact":2}
{"Cruiser":2}
{"Cycles":2}
{"Destination Unknown":2}
{"Dirt Road Traveler":2}
{"Don't Look":2}
{"Drive":2}
{"Drunken Sailor":2}
{"Escape":2}
{"Ether":2}
{"Feel The Funk":2}
{"Ferris Wheel":2}
{"Firefly":2}
{"Follow Me":2}
{"Funk Down":2}
{"Granite":2}
{"Greedy":2}
{"Happy Feet":2}
{"Hero Theme":2}
{"Home":2}
{"Invincible":2}
{"Level Up":2}
{"Lullaby":3}
{"March On":3}
{"Meteor":2}
{"Midnight":2}
{"Mirror Mirror":2}
{"Monument":2}
{"Mountain":2}
{"Night Drive":2}
{"Night Ride":2}
{"Open Highway":2}
{"Over Time":2}
{"Payday":2}
{"Pressure":2}
{"Procession":2}
{"Quiet":2}
{"Riding":2}
{"Rise":2}
{"Road Trip":2}
{"Rollin":2}
{"Run":2}
{"Serenity":2}
{"Smooth":2}
{"Star Spangled Banner":2}
{"Summer Nights":2}
{"Sunday":2}
{"Surrender":2}
{"The End":2}
{"The Heist":2}
{"Timeless":2}
{"Travel Light":2}
{"Undeniable":2}
{"Walk With Me":2}
{"Way Out West":2}
{"When Johnny Comes Marching Home":2}
{"Wrong":2}
{"Yankee Doodle":2}
```
</details>

### Optional "automatic" tagging
1. Install [`beets`](https://github.com/beetbox/beets) with [Chromaprint](https://beets.readthedocs.io/en/stable/plugins/chroma.html)
2. `beet import -qa music/`

Tagging accuracy cannot be guaranteed.

## Why?

This is an attempt to download and clean (apply metadata) music from youtube's audio library for listening. The goal is to produce a organized local playlist that can be ingested by a music player for listening in the background. The hope is that this will aid in music discovery for creative purposes where creative commons or royalty free music is required. 

### Scope

At the moment it is outside of the scope of the project to download music from [other sources](https://creativecommons.org/about/program-areas/arts-culture/arts-culture-resources/legalmusicforvideos/). It is also currently not within the scope of the project to filter the categories before downloading. 

## Intersting Statistics

### Total number of tracks

Youtube is always adding new tracks to their audio library. When development started there were only 4378 tracks.

```javascript
// jq '.tracks | length' music-1000.json
5013
```

### Total length of all tracks
```javascript
// jq -S '[.tracks[].len] | add | {hours:(./60/60%24), minutes:(./60%60), seconds:(.%60)}' music-1000.json
{
  "hours": 8,
  "minutes": 24,
  "seconds": 52
}
```

### Number of unique instruments
<details>
    <summary>The list of "instruments"</summary>

```javascript
// jq '[.tracks[].instruments[]] | unique | length' music-1000.json
321
// jq -S '[.tracks[].instruments[]] | unique | .[] ' music-1000.json
""
"'Bass'"
"'Drums'"
"808"
"808 Drums"
"Acoustic"
"Acoustic Guitar"
"Acoustic Guitar Drums"
"Acoustic Gutair"
"Acoustic Gutar"
"Acoustic Gutiar"
"Acoustic guitar"
"Acoustic guitars"
"Acoustic slide guitar"
"Analgo Synth"
"Analog Bass Synth"
"Analog Lead Synth"
"Analog Polyphonic Synthesizer"
"Analog Synth"
"Analog Synth Bass"
"Analog Synthesizer"
"Analog Synthesizers"
"Analog synthesizer"
"Arpeggiators"
"Autoharp"
"Banjo"
"Bas"
"Bass"
"Bass Drums"
"Bass. Synth"
"Bells"
"Berimbau"
"Blues"
"Brass"
"Cello"
"Choir"
"Chorus"
"Clarinet"
"Contra Bass"
"Cora"
"Delay Guitar"
"Dobro"
"Double Bass"
"Drum"
"Drum Machine"
"Drum machine"
"Drums"
"Drums. Electric Guitar"
"Dums"
"Electric Bass"
"Electric Guitar"
"Electric Guitar'"
"Electric Guitars"
"Electric Gutair"
"Electric Piano"
"Electric guitar"
"Electric guitars"
"Electric piano"
"Electric slide guitar"
"Electronic Drums"
"Electronic Guitar"
"Electronic drums"
"Flugal horn"
"Flute"
"Flutes,"
"Guitar"
"Guitars"
"Hammond"
"Hammond B3 organ"
"Harmonica"
"Harp"
"Horn"
"Horns"
"Kalimba"
"Kazoo"
"Keyboard"
"Keyboards"
"Koto"
"Lap Steel"
"Male choir"
"Mallets"
"Mandolin"
"Marimba"
"Mellotron"
"Metal"
"Modular Synthesizer"
"Modular synthesizer"
"Ogan"
"Orchestra"
"Organ"
"Organ Piano"
"Organic"
"Organs"
"Percussion"
"Piano"
"Quica"
"Rhodes"
"Rhodes Piano"
"Rhodes electric piano"
"Samples"
"Saxophone"
"Slide Guitar"
"Slide guitar"
"Snaps"
"Solo violin"
"Sound Design"
"Sound fx"
"Steel Guitar"
"Stings"
"Strings"
"Synth"
"Synth Electric Guitar"
"Synth Voice"
"Synth,"
"Synthesizer"
"Synths"
"Sythn"
"Talk box"
"Timpani"
"Tres"
"Trumpet"
"Trumpets"
"Ukelele"
"Ukulele"
"Upright Bass"
"Vibraphone"
"Vocal"
"Vocal Samples"
"Vocals"
"Voice"
"Water"
"Weissenborn"
"Woodwinds"
"World Percussion"
"Wurlitzer"
"_audiolibrary_featured"
"accordian"
"accordion"
"acoustic Guitar"
"acoustic bass"
"acoustic guitar"
"acoustic gutiar"
"acoustic nylon guitar"
"acoustic piano"
"alto flutes"
"ambient guitar"
"ambient slide"
"analog bass synth"
"atmospheres"
"autoharp"
"bandura"
"banjo"
"banjo. ambient guitar"
"baritone saxophone"
"bass"
"bass clarinet"
"bass clarinets"
"bass drum"
"bass drums"
"bass flutes"
"bass tongue drum"
"bassoon"
"bells"
"bongos"
"brass"
"brass section"
"bss"
"buckets"
"cajon"
"calvinet"
"celeste"
"cello"
"cellos"
"charango"
"chimes"
"choir"
"church bells"
"cimbasso"
"clap"
"claps"
"clarinet"
"clarinets"
"clav"
"clavinet"
"congas"
"dhol"
"dholak"
"dra-ngen"
"drum"
"drum kit"
"drum machine"
"drum macnines"
"drums"
"drumss"
"dulcimer"
"dum machine"
"electic guitar"
"electric bass"
"electric electric guitar"
"electric guitar"
"electric guitars"
"electric gutiar"
"electric piano"
"electronic drums"
"electronic percussion"
"epic percussion"
"female choir"
"fiddle"
"fires sfx"
"flugel horn"
"flute"
"flutes"
"french horn"
"french horns"
"funky guitars"
"gamelan"
"glockenspiel"
"guitar"
"guitars"
"hand percussion"
"harmonica"
"harmonium"
"harp"
"harp ensemble"
"harpsichord"
"harpsicord"
"horn"
"horn section"
"horns"
"human shouts"
"jaw harp"
"kalimba"
"karimba"
"keyboard"
"keys"
"kora"
"lap steel"
"male choir"
"male voice"
"male voices"
"mallets"
"mandolin"
"mandoline"
"marimba"
"mellotron"
"melodica"
"modular synth"
"muted trumpet"
"ngoni"
"orchestra"
"organ"
"organs"
"original vocal samples"
"originalvocal samples"
"oud"
"pan flute"
"percussion"
"percussion."
"piano"
"piano synth"
"pipe organ"
"rhodes"
"santoor"
"saxophone"
"saz"
"scratches"
"shaker"
"sitar"
"slide guitar"
"snap"
"snaps"
"snare drum"
"software sequencer"
"solo violin"
"sound design"
"sound effects"
"steel drum"
"steel drums"
"steel guitar"
"street percussion"
"string orchestra"
"strings"
"synth"
"synth bass"
"synthesizer"
"synthesizers"
"synths"
"tabla"
"tambourine"
"tambura"
"theremin"
"timbale"
"timpani"
"toy piano"
"trombone"
"trumpet"
"trumpets"
"tuba"
"tubular bells"
"tumbi"
"ukelele"
"upright bass"
"upright bass percussion"
"upright piano"
"vibraphone"
"viola"
"violas"
"violin"
"violins"
"vocal chop"
"vocal chops"
"vocal samples"
"vocoder"
"voice"
"waterphone"
"weissenborn"
"whistle"
"woodwinds"
"xylophone"
"xyzlophone"
"zsoura sakis"
```
</details>

There are quite a few instruments, but here we find our first questionable pieces of data. `"'Bass'"` and `"'Drums'"` are additional fields to `"Bass"`and `"Drums"` and `"base"` and `"drums"`. Many fields have upper and lowercase counterparts, but it seems that the api ignores case so this is not an issue when using the interface. Somewhat strangely there is also a instrument called `"_audiolibrary_featured"`.

```javascript
// jq '[.tracks[].instruments[] | ascii_downcase] | unique | length' music-1000.json
250
```

### Number of unique artists
```javascript
// jq '[.tracks[].artist] | unique | length' music-1000.json
215
```

### Artists sorted by number of tracks 

```javascript
// jq -Sc '.tracks | group_by(.artist) | map({artist:.[0].artist, len:([.[].len] | add), count:length}) | sort_by(.count) | reverse | map({(.artist):({len:.len,count:.count} | {count:.count, hours:(.len/60/60%24), minutes:(.len/60%60), seconds:(.len%60)})}) | .[]' music-1000.json
{"Kevin MacLeod":{"count":604,"hours":6,"minutes":17,"seconds":59}}
{"Silent Partner":{"count":403,"hours":16,"minutes":27,"seconds":40}}
{"Audionautix":{"count":301,"hours":11,"minutes":52,"seconds":17}}
...
```
<details>
  <summary>Show all</summary>
  
```javascript
{"Jingle Punks":{"count":180,"hours":3,"minutes":30,"seconds":45}}
{"Quincas Moreira":{"count":110,"hours":5,"minutes":21,"seconds":28}}
{"TrackTribe":{"count":100,"hours":5,"minutes":12,"seconds":13}}
{"Twin Musicom":{"count":84,"hours":3,"minutes":29,"seconds":8}}
{"Chris Zabriskie":{"count":79,"hours":6,"minutes":30,"seconds":28}}
{"Otis McDonald":{"count":74,"hours":2,"minutes":54,"seconds":50}}
{"Sir Cubworth":{"count":70,"hours":3,"minutes":4,"seconds":25}}
{"Doug Maxwell/Media Right Productions":{"count":62,"hours":1,"minutes":45,"seconds":27}}
{"The 126ers":{"count":61,"hours":2,"minutes":38,"seconds":57}}
{"E's Jammy Jams":{"count":60,"hours":2,"minutes":43,"seconds":22}}
{"Dan Lebowitz":{"count":60,"hours":2,"minutes":8,"seconds":51}}
{"Gunnar Olsen":{"count":55,"hours":2,"minutes":16,"seconds":26}}
{"Unicorn Heads":{"count":50,"hours":3,"minutes":35,"seconds":53}}
{"The Green Orbs":{"count":50,"hours":1,"minutes":53,"seconds":14}}
{"Freedom Trail Studio":{"count":50,"hours":2,"minutes":54,"seconds":48}}
{"Density & Time":{"count":50,"hours":2,"minutes":27,"seconds":59}}
{"Aakash Gandhi":{"count":50,"hours":2,"minutes":14,"seconds":1}}
{"Topher Mohr and Alex Elena":{"count":49,"hours":2,"minutes":44,"seconds":2}}
{"Coyote Hearing":{"count":48,"hours":2,"minutes":2,"seconds":33}}
{"MK2":{"count":46,"hours":1,"minutes":20,"seconds":41}}
{"Riot":{"count":43,"hours":1,"minutes":34,"seconds":6}}
{"John Deley and the 41 Players":{"count":42,"hours":1,"minutes":31,"seconds":31}}
{"United States Marine Band":{"count":41,"hours":1,"minutes":56,"seconds":32}}
{"The Whole Other":{"count":40,"hours":1,"minutes":43,"seconds":55}}
{"The Mini Vandals":{"count":40,"hours":1,"minutes":27,"seconds":8}}
{"Jesse Gallagher":{"count":40,"hours":3,"minutes":39,"seconds":10}}
{"Asher Fulero":{"count":40,"hours":2,"minutes":4,"seconds":21}}
{"Ethan Meixsell":{"count":34,"hours":1,"minutes":10,"seconds":15}}
{"Max McFerren":{"count":31,"hours":2,"minutes":53,"seconds":37}}
{"Vibe Tracks":{"count":30,"hours":1,"minutes":40,"seconds":11}}
{"Verified Picasso":{"count":30,"hours":1,"minutes":12,"seconds":28}}
{"Jeremy Blake":{"count":30,"hours":2,"minutes":7,"seconds":24}}
{"Huma-Huma":{"count":30,"hours":1,"minutes":23,"seconds":45}}
{"Geographer":{"count":30,"hours":1,"minutes":23,"seconds":32}}
{"Chris Haugen":{"count":30,"hours":1,"minutes":23,"seconds":58}}
{"Bad Snacks":{"count":30,"hours":1,"minutes":19,"seconds":14}}
{"Dan Bodan":{"count":29,"hours":1,"minutes":16,"seconds":24}}
{"Jimmy Fontanez/Media Right Productions":{"count":28,"hours":0,"minutes":42,"seconds":55}}
{"Doug Maxwell":{"count":24,"hours":0,"minutes":48,"seconds":23}}
{"Saidbysed":{"count":21,"hours":0,"minutes":43,"seconds":57}}
{"William Rosati":{"count":20,"hours":1,"minutes":1,"seconds":48}}
{"Wayne Jones":{"count":20,"hours":0,"minutes":40,"seconds":37}}
{"Text Me Records / Bobby Renz":{"count":20,"hours":0,"minutes":47,"seconds":20}}
{"Spazz Cardigan":{"count":20,"hours":0,"minutes":58,"seconds":0}}
{"South London HiFi":{"count":20,"hours":1,"minutes":20,"seconds":1}}
{"Rondo Brothers":{"count":20,"hours":0,"minutes":49,"seconds":17}}
{"Reed Mathis":{"count":20,"hours":0,"minutes":46,"seconds":29}}
{"RKVC":{"count":20,"hours":0,"minutes":49,"seconds":21}}
{"Puddle of Infinity":{"count":20,"hours":1,"minutes":1,"seconds":12}}
{"Patrick Patrikios":{"count":20,"hours":0,"minutes":49,"seconds":40}}
{"Noir Et Blanc Vie":{"count":20,"hours":1,"minutes":3,"seconds":51}}
{"Letter Box":{"count":20,"hours":1,"minutes":3,"seconds":18}}
{"Konrad OldMoney":{"count":20,"hours":0,"minutes":32,"seconds":34}}
{"Jeremy Korpas":{"count":20,"hours":0,"minutes":46,"seconds":4}}
{"JR Tundra":{"count":20,"hours":0,"minutes":48,"seconds":39}}
{"I Think I Can Help You":{"count":20,"hours":0,"minutes":48,"seconds":23}}
{"Everet Almond":{"count":20,"hours":0,"minutes":43,"seconds":33}}
{"ELPHNT":{"count":20,"hours":1,"minutes":3,"seconds":2}}
{"Dyalla":{"count":20,"hours":0,"minutes":47,"seconds":42}}
{"Diamond Ortiz":{"count":20,"hours":1,"minutes":12,"seconds":13}}
{"DJ Williams":{"count":20,"hours":1,"minutes":12,"seconds":58}}
{"Cxdy":{"count":20,"hours":0,"minutes":50,"seconds":27}}
{"Cooper Cannell":{"count":20,"hours":0,"minutes":42,"seconds":39}}
{"Biz Baz Studio":{"count":20,"hours":0,"minutes":37,"seconds":34}}
{"Bird Creek":{"count":20,"hours":0,"minutes":36,"seconds":30}}
{"Audio Hertz":{"count":20,"hours":0,"minutes":51,"seconds":18}}
{"Anno Domini Beats":{"count":20,"hours":1,"minutes":7,"seconds":52}}
{"Aaron Kenny":{"count":20,"hours":0,"minutes":41,"seconds":0}}
{"ALBIS":{"count":20,"hours":0,"minutes":42,"seconds":25}}
{"Eveningland":{"count":19,"hours":0,"minutes":57,"seconds":29}}
{"Max Surla/Media Right Productions":{"count":18,"hours":0,"minutes":35,"seconds":36}}
{"Aaron Lieberman":{"count":18,"hours":0,"minutes":38,"seconds":12}}
{"Text Me Records / Leviathe":{"count":17,"hours":0,"minutes":34,"seconds":45}}
{"Text Me Records / Jorge Hernandez":{"count":17,"hours":0,"minutes":36,"seconds":16}}
{"The U.S. Army Band":{"count":16,"hours":0,"minutes":33,"seconds":5}}
{"Josh Kirsch/Media Right Productions":{"count":16,"hours":0,"minutes":25,"seconds":32}}
{"roljui":{"count":10,"hours":0,"minutes":23,"seconds":50}}
{"pATCHES":{"count":10,"hours":0,"minutes":36,"seconds":50}}
{"ann annie":{"count":10,"hours":0,"minutes":40,"seconds":1}}
{"Yung Logos":{"count":10,"hours":0,"minutes":25,"seconds":39}}
{"White Hex":{"count":10,"hours":0,"minutes":22,"seconds":9}}
{"Wes Hutchinson":{"count":10,"hours":0,"minutes":29,"seconds":51}}
{"Vibe Mountain":{"count":10,"hours":0,"minutes":20,"seconds":34}}
{"VYEN":{"count":10,"hours":0,"minutes":22,"seconds":30}}
{"Underbelly":{"count":10,"hours":0,"minutes":28,"seconds":20}}
{"Ugonna Onyekwe":{"count":10,"hours":0,"minutes":29,"seconds":34}}
{"True Cuckoo":{"count":10,"hours":0,"minutes":42,"seconds":36}}
{"The Tower of Light":{"count":10,"hours":0,"minutes":24,"seconds":53}}
{"The Grand Affair":{"count":10,"hours":0,"minutes":29,"seconds":51}}
{"The Brothers Records":{"count":10,"hours":0,"minutes":22,"seconds":36}}
{"The 129ers":{"count":10,"hours":0,"minutes":29,"seconds":14}}
{"Text Me Records":{"count":10,"hours":0,"minutes":27,"seconds":17}}
{"Stayloose":{"count":10,"hours":0,"minutes":33,"seconds":0}}
{"Spence":{"count":10,"hours":0,"minutes":23,"seconds":36}}
{"Slenderbeats":{"count":10,"hours":0,"minutes":30,"seconds":55}}
{"Single Friend":{"count":10,"hours":0,"minutes":16,"seconds":37}}
{"Sextile":{"count":10,"hours":0,"minutes":27,"seconds":29}}
{"Sarah, The Illstrumentalist":{"count":10,"hours":0,"minutes":24,"seconds":2}}
{"SYBS":{"count":10,"hours":0,"minutes":31,"seconds":31}}
{"Rick Steel":{"count":10,"hours":0,"minutes":20,"seconds":22}}
{"Ramzoid":{"count":10,"hours":0,"minutes":26,"seconds":30}}
{"RalphReal":{"count":10,"hours":0,"minutes":26,"seconds":41}}
{"Rachel K Collier":{"count":10,"hours":0,"minutes":24,"seconds":8}}
{"RW Smith":{"count":10,"hours":0,"minutes":17,"seconds":48}}
{"RAGE":{"count":10,"hours":0,"minutes":23,"seconds":10}}
{"R.LUM.R":{"count":10,"hours":0,"minutes":26,"seconds":47}}
{"Public Memory":{"count":10,"hours":0,"minutes":21,"seconds":51}}
{"Odonis Odonis":{"count":10,"hours":0,"minutes":30,"seconds":44}}
{"Norma Rockwell":{"count":10,"hours":0,"minutes":33,"seconds":40}}
{"Nate Blaze":{"count":10,"hours":0,"minutes":20,"seconds":9}}
{"Nat Keefe with The Bow Ties":{"count":10,"hours":0,"minutes":30,"seconds":29}}
{"Nana Kwabena":{"count":10,"hours":0,"minutes":36,"seconds":55}}
{"Myuu":{"count":10,"hours":0,"minutes":21,"seconds":41}}
{"Mylar Melodies":{"count":10,"hours":0,"minutes":40,"seconds":54}}
{"Mini Vandals":{"count":10,"hours":0,"minutes":21,"seconds":31}}
{"Mikos Da Gawd":{"count":10,"hours":0,"minutes":27,"seconds":52}}
{"Mike Relm":{"count":10,"hours":0,"minutes":25,"seconds":27}}
{"Midnight North":{"count":10,"hours":0,"minutes":29,"seconds":12}}
{"Media Right Productions":{"count":10,"hours":0,"minutes":17,"seconds":40}}
{"Matt Harris":{"count":10,"hours":0,"minutes":18,"seconds":7}}
{"Magic In The Other":{"count":10,"hours":0,"minutes":27,"seconds":4}}
{"Loopop":{"count":10,"hours":0,"minutes":20,"seconds":59}}
{"Lish Grooves":{"count":10,"hours":0,"minutes":25,"seconds":16}}
{"Lauren Duski":{"count":10,"hours":0,"minutes":19,"seconds":30}}
{"Late Night Feeler":{"count":10,"hours":0,"minutes":24,"seconds":1}}
{"LATASHÁ":{"count":10,"hours":0,"minutes":28,"seconds":41}}
{"Josh Lippi & The Overtimers":{"count":10,"hours":0,"minutes":20,"seconds":46}}
{"John Deley":{"count":10,"hours":0,"minutes":27,"seconds":51}}
{"Joey Pecoraro":{"count":10,"hours":0,"minutes":20,"seconds":58}}
{"Joe Bagale":{"count":10,"hours":0,"minutes":26,"seconds":7}}
{"JVNA":{"count":10,"hours":0,"minutes":26,"seconds":21}}
{"JHS Pedals":{"count":10,"hours":0,"minutes":27,"seconds":41}}
{"JAde Wii":{"count":10,"hours":0,"minutes":23,"seconds":59}}
{"Houses of Heaven":{"count":10,"hours":0,"minutes":25,"seconds":0}}
{"Hanu Dixit":{"count":10,"hours":0,"minutes":19,"seconds":42}}
{"Hainbach":{"count":10,"hours":0,"minutes":30,"seconds":53}}
{"HOVATOFF":{"count":10,"hours":0,"minutes":25,"seconds":31}}
{"Francis Preve":{"count":10,"hours":0,"minutes":20,"seconds":24}}
{"Endless Love":{"count":10,"hours":0,"minutes":19,"seconds":0}}
{"Emily A. Sprague":{"count":10,"hours":0,"minutes":25,"seconds":4}}
{"Drew Banga":{"count":10,"hours":0,"minutes":31,"seconds":42}}
{"Dougie Wood":{"count":10,"hours":0,"minutes":27,"seconds":26}}
{"DivKid":{"count":10,"hours":0,"minutes":29,"seconds":0}}
{"Devon Church":{"count":10,"hours":0,"minutes":26,"seconds":39}}
{"Dan Henig":{"count":10,"hours":0,"minutes":16,"seconds":37}}
{"Craig MacArthur":{"count":10,"hours":0,"minutes":25,"seconds":25}}
{"Chasms":{"count":10,"hours":0,"minutes":24,"seconds":0}}
{"Causmic":{"count":10,"hours":0,"minutes":30,"seconds":39}}
{"Bruno E.":{"count":10,"hours":0,"minutes":45,"seconds":26}}
{"Birocratic":{"count":10,"hours":0,"minutes":23,"seconds":53}}
{"Au.Ra":{"count":10,"hours":0,"minutes":30,"seconds":52}}
{"Ashley Shadow":{"count":10,"hours":0,"minutes":24,"seconds":48}}
{"Andrew Langdon":{"count":10,"hours":0,"minutes":25,"seconds":51}}
{"Andrew Huang":{"count":10,"hours":0,"minutes":30,"seconds":18}}
{"Amulets":{"count":10,"hours":0,"minutes":31,"seconds":2}}
{"Slynk":{"count":9,"hours":0,"minutes":29,"seconds":14}}
{"Jason Farnham":{"count":9,"hours":0,"minutes":15,"seconds":32}}
{"Text Me Records / Social Work":{"count":8,"hours":0,"minutes":19,"seconds":9}}
{"Text Me Records / GrandBankss":{"count":8,"hours":0,"minutes":25,"seconds":36}}
{"The U.S. Marine Corps Band":{"count":7,"hours":0,"minutes":8,"seconds":14}}
{"Text Me Records / Grandbankss":{"count":7,"hours":0,"minutes":20,"seconds":15}}
{"Doug Maxwell, Jimmy Fontanez":{"count":7,"hours":0,"minutes":11,"seconds":50}}
{"United States Naval Academy Band":{"count":6,"hours":0,"minutes":13,"seconds":17}}
{"Doug Maxwell/Jimmy Fontanez":{"count":6,"hours":0,"minutes":9,"seconds":45}}
{"Nat Keefe & Hot Buttered Rum":{"count":5,"hours":0,"minutes":15,"seconds":43}}
{"Nat Keefe & BeatMower":{"count":5,"hours":0,"minutes":17,"seconds":11}}
{"Alge":{"count":5,"hours":0,"minutes":9,"seconds":56}}
{"The Midshipmen Glee Club":{"count":4,"hours":0,"minutes":9,"seconds":39}}
{"Text Me Records / Jordan Blackmon":{"count":4,"hours":0,"minutes":7,"seconds":12}}
{"Text Me Records / Hii.de":{"count":4,"hours":0,"minutes":8,"seconds":52}}
{"Ron Meixsell and Wahneta Meixsell":{"count":4,"hours":0,"minutes":11,"seconds":44}}
{"Jimmy Fontanez/Doug Maxwell":{"count":4,"hours":0,"minutes":6,"seconds":45}}
{"Doug Maxwell/ Zac Zinger":{"count":4,"hours":0,"minutes":9,"seconds":59}}
{"Beethoven":{"count":4,"hours":0,"minutes":38,"seconds":23}}
{"Wahneta Meixsell":{"count":3,"hours":0,"minutes":5,"seconds":52}}
{"Unites States Marine Band ":{"count":3,"hours":0,"minutes":8,"seconds":54}}
{"Tchaikovsky":{"count":3,"hours":0,"minutes":25,"seconds":6}}
{"Ron Meixsell":{"count":3,"hours":0,"minutes":9,"seconds":10}}
{"United States Army Herald Trumpets":{"count":2,"hours":0,"minutes":1,"seconds":23}}
{"Network 415":{"count":2,"hours":0,"minutes":3,"seconds":34}}
{"Grieg":{"count":2,"hours":0,"minutes":6,"seconds":7}}
{"Danny Kean/Doug Maxwell":{"count":2,"hours":0,"minutes":3,"seconds":19}}
{"Chopin":{"count":2,"hours":0,"minutes":11,"seconds":59}}
{"Bizet":{"count":2,"hours":0,"minutes":4,"seconds":24}}
{"Bach":{"count":2,"hours":0,"minutes":5,"seconds":18}}
{"Windows of Ken":{"count":1,"hours":0,"minutes":2,"seconds":49}}
{"Wagner":{"count":1,"hours":0,"minutes":5,"seconds":28}}
{"United States Naval Academy ":{"count":1,"hours":0,"minutes":5,"seconds":15}}
{"United States Marine Band and Arthur S.Witcomb":{"count":1,"hours":0,"minutes":4,"seconds":6}}
{"United States Marine Band ":{"count":1,"hours":0,"minutes":2,"seconds":20}}
{"USAF Heritage of America Band ":{"count":1,"hours":0,"minutes":0,"seconds":14}}
{"US Navy Academy Men's Glee Club ":{"count":1,"hours":0,"minutes":2,"seconds":57}}
{"US NavalAcademy":{"count":1,"hours":0,"minutes":3,"seconds":15}}
{"U.S. Navy Band":{"count":1,"hours":0,"minutes":1,"seconds":8}}
{"U.S. Coast Guard Band":{"count":1,"hours":0,"minutes":3,"seconds":36}}
{"U.S. Army Band":{"count":1,"hours":0,"minutes":4,"seconds":7}}
{"Strauss":{"count":1,"hours":0,"minutes":9,"seconds":27}}
{"Slynk & Kermode":{"count":1,"hours":0,"minutes":4,"seconds":15}}
{"Satie":{"count":1,"hours":0,"minutes":3,"seconds":12}}
{"Rossini":{"count":1,"hours":0,"minutes":11,"seconds":51}}
{"Offenbach":{"count":1,"hours":0,"minutes":9,"seconds":14}}
{"None":{"count":1,"hours":0,"minutes":4,"seconds":39}}
{"Mozart":{"count":1,"hours":0,"minutes":5,"seconds":51}}
{"Mendelssohn":{"count":1,"hours":0,"minutes":5,"seconds":2}}
{"Liszt":{"count":1,"hours":0,"minutes":10,"seconds":50}}
{"Kung Pao O'Malley":{"count":1,"hours":0,"minutes":1,"seconds":20}}
{"Kevin MacLeod, Syrinx Starr":{"count":1,"hours":0,"minutes":5,"seconds":10}}
{"John F. Kennedy":{"count":1,"hours":0,"minutes":15,"seconds":4}}
{"Jimmy Fontanez/Doug Maxwell/Media Right Productions":{"count":1,"hours":0,"minutes":1,"seconds":42}}
{"Handel":{"count":1,"hours":0,"minutes":3,"seconds":48}}
{"Charles Zimmerman":{"count":1,"hours":0,"minutes":3,"seconds":11}}
{"Air Force Band of Liberty":{"count":1,"hours":0,"minutes":0,"seconds":52}}
```
</details>

When it comes to number of tracks, Kevin MacLeod, king of CC BY music comes up on top. What is interesting is that SilentPartner and Audionautix who come in second and third have produced more music by length.

### Genres sorted by number of tracks
```javascript
// jq -Sc '.tracks | group_by(.genre) | map({genre:.[0].genre, len:([.[].len] | add), count:length}) | sort_by(.count) | reverse | map({(.genre):({len:.len,count:.count} | {count:.count, hours:(.len/60/60%24), minutes:(.len/60%60), seconds:(.len%60)})}) | .[]' music-1000.json
{"Dance & Electronic":{"count":811,"hours":16,"minutes":0,"seconds":49}}
...
{"None":{"count":1,"hours":0,"minutes":4,"seconds":39}}
{"Country Folk":{"count":1,"hours":0,"minutes":2,"seconds":32}}
```
<details>
  <summary>Show all</summary>

```javascript
{"Cinematic":{"count":737,"hours":5,"minutes":18,"seconds":38}}
{"Rock":{"count":491,"hours":20,"minutes":41,"seconds":45}}
{"Ambient":{"count":475,"hours":6,"minutes":32,"seconds":16}}
{"Hip Hop & Rap":{"count":473,"hours":19,"minutes":30,"seconds":9}}
{"Pop":{"count":414,"hours":17,"minutes":35,"seconds":36}}
{"Classical":{"count":412,"hours":18,"minutes":49,"seconds":21}}
{"Jazz & Blues":{"count":318,"hours":12,"minutes":50,"seconds":47}}
{"Country & Folk":{"count":313,"hours":12,"minutes":30,"seconds":13}}
{"R&B & Soul":{"count":233,"hours":9,"minutes":33,"seconds":27}}
{"Children's":{"count":94,"hours":3,"minutes":21,"seconds":10}}
{"Alternative & Punk":{"count":88,"hours":3,"minutes":26,"seconds":8}}
{"Reggae":{"count":69,"hours":2,"minutes":44,"seconds":34}}
{"Holiday":{"count":68,"hours":2,"minutes":44,"seconds":19}}
{"World":{"count":8,"hours":0,"minutes":21,"seconds":43}}
{"Hip Hop":{"count":3,"hours":0,"minutes":3,"seconds":37}}
{"Electronic":{"count":2,"hours":0,"minutes":7,"seconds":7}}
{"Country and Folk":{"count":2,"hours":0,"minutes":5,"seconds":53}}
```
</details>

As can be seen interestingly there is one song which has the genre of "None" - [Heading West](https://www.youtube.com/watch?v=wmvBMacUShI) ([mp3](https://www.youtube.com/audiolibrary_download?vid=acb5fd608ed48dfa)). Unfortuantly this song is missing a lot of its tags, and has the incorrect license type. As seen on the [youtube video's description](https://www.youtube.com/watch?v=wmvBMacUShI) was originally licensed under CC BY 3.0 and then upgraded via the [website](https://www.youtube.com/watch?v=wmvBMacUShI) to CC BY 4.0. 

<details>
  <summary>Show the track json</summary>

```javascript
// jq -S '.tracks | group_by(.genre) | map(select(.[0].genre == "None")) | .[][]' music-1000.json
{
  "album": "None",
  "artist": "None",
  "artist_channel_url": null,
  "artist_url": "",
  "category": "",
  "display_category": "",
  "display_genre": "",
  "display_mood": null,
  "download_url": "https://www.youtube.com/audiolibrary_download?vid=acb5fd608ed48dfa",
  "downloadable": true,
  "favorite": false,
  "fp_ref_id": "acb5fd608ed48dfa",
  "genre": "None",
  "instruments": [],
  "is_new_track": false,
  "len": 279.783,
  "license_type": 0,
  "mood": null,
  "popularity_percentile": 72,
  "reference_vid": "acb5fd608ed48dfa",
  "streamid": "3EuS08tqMNHl4kuqaRFM44zCyU6_pk7mJ9QQU_mlKbdi6kHYE_vvTrm8ABGKDplh",
  "title": "Heading West",
  "track_url": "",
  "vid": "acb5fd608ed48dfa",
  "waveform_url": "https://www.youtube.com/api/editor/waveform?expire=1587186000&if=0&scale=10&editlist=Cgh3YXZlZm9ybRocCNiDERIWChBhY2I1ZmQ2MDhlZDQ4ZGZhEAAYAg%3D%3D&sigh=T6XJ6jgPOkGumrCaBZM0gQ"
}
```
</details>

### Mood sorted by number of tracks

```javascript
// jq -Sc '.tracks | group_by(.mood) | map({mood:.[0].mood, len:([.[].len] | add), count:length}) | sort_by(.count) | reverse | map({(if .mood == null then "null" else .mood end):({len:.len,count:.count} | {count:.count, hours:(.len/60/60%24), minutes:(.len/60%60), seconds:(.len%60)})}) | .[]' music-1000.json
{"Dramatic":{"count":802,"hours":12,"minutes":12,"seconds":29}}
...
{"null":{"count":5,"hours":0,"minutes":10,"seconds":39}}
{"dramatic":{"count":1,"hours":0,"minutes":2,"seconds":13}}
{"bright":{"count":1,"hours":0,"minutes":2,"seconds":8}}
```
<details>
  <summary>Show all</summary>

```javascript
{"Happy":{"count":674,"hours":1,"minutes":55,"seconds":25}}
{"Dark":{"count":663,"hours":5,"minutes":32,"seconds":7}}
{"Funky":{"count":635,"hours":3,"minutes":41,"seconds":24}}
{"Calm":{"count":620,"hours":10,"minutes":47,"seconds":59}}
{"Bright":{"count":603,"hours":0,"minutes":51,"seconds":23}}
{"Inspirational":{"count":464,"hours":21,"minutes":24,"seconds":44}}
{"Sad":{"count":194,"hours":9,"minutes":10,"seconds":40}}
{"Angry":{"count":190,"hours":7,"minutes":22,"seconds":33}}
{"Romantic":{"count":161,"hours":7,"minutes":11,"seconds":1}}
```
</details>

As with before, the tagging in youtube's audio library is not infallible. Once again the api doesn't distinguish between upper and lowercase moods, but the UI blindly displays what it is given.

![youtube displaying lowercase dramatic in the UI](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABWoAAACSCAIAAABT1WT2AAAAA3NCSVQICAjb4U/gAAAgAElEQVR4nOzdfVxT5/0//reWQ0okyTRQowUrYSWT4IxDJtA20DKUbtDPhP7wIzz6FTsV6A12Y1BFqDIY7UA6RVvv6MQ+StqyIo9Pwc+4KROyFuWB1DhBBx2RGsQgiSyJn9BwqP7+CCJyF7zhpu3r+Q9wcs51vc/JOYdz3ue6rjPr5s2bBAAAAAAAAAAwttnTHQAAAAAAAAAAzHRIHwAAAAAAAACADUgfAAAAAAAAAIANdtMdAAAAAAAAfJ81NTVNdwgAP3ReXl73XwjSBwAAAAAAMLk8PT1nzZo13VEA/BDdvHnz/PnzD6QopA8AAAAAAGByzZo1C+kDgO86jH0AAAAAAAAAADYgfQAAAAAAAAAANiB9AAAAAAAAAAA2IH0AAAAAAAAAADZg6EQAAAAAAACAmaKtra2rq+v//u//5syZIxKJxGLxdEc0AK0PAAAAAABgWnUqYvxjS03DpuqKY/xji3V3U1DL3ojAlJoHF5hV3c7A1VmNE57dUvGqf1RB+4OOAn4Ient7P/vssy+//PLy5csmk+ny5cuNjY2fffZZb2/vdIdGNDnpA11xzIphYhSdd1VEY9Zq/9jSuzpVAAAATLampqaPPvroL3/5y6effqrTfS//TZlKX/VfsWLFihX+gWExOxXnhl/M37/OOkVBRYuFiHSlrwZG5J574DU8KCaT6dChQ1qtdoLznz59+j//+c+khmTV0tLS0dExBRVN0NmzZw8dOnTo0KH333//iy++6O/vv4dCTCbT6dOnv/32WyL67LPPGhsnfqc2g/zrX/86dOjQ4Mlh6Ep1dnZeuHBh2Pw6ne6DDz7o6+v7/PPP//d//9dm+YNffVNTU1lZ2YMOHyZZY1ZY2EAOor2ioHQSzq/wPfDFF1/09PS4uLiEhoaGh4eHhoa6uLj09PR88cUX0x0a0eR0XnAK3VseYKG+2vTncmnbJzsC7InDc5qEigAAAKbOV199VV9fL5fLnZ2dVSpVeXn5unXrHnroocmoq6Wlpba2dthEDw+PwMDAyahuGHu/HZ/s8DY1Fb+9M/bVPkVBzOIHWfqVmqOHrvAiVks4Tn6bdwp5HjaXKC0tTU9PHzYxNDR0586dDzKw+/bll186Ozv/6Ec/muyKWltbnZ2dXVxchk2fxt3m4YcfDg8PN5lMX3zxxWeffRYSEnK3JZhMpi+//HLZsmUPPfTQT3/604cffvjeIpneY6e1tXX27Nmtra1OTk5050p1dnZeunRpyZIlQ+f/0Y9+9OSTT9rb20+8fOtXv3jxYmsV92B6N9EPmlfMzp19XkRElpbKQx8uDQxbypvumGBmaWtrs+YO/Pz8rFMcHBz8/Pzq6uouX76sVqunvRfDpIx9wOE5cXhkcbS3JxIudHIiIl1x7NOHTB6One2SrIrN+jd3HqppukILvCN27nrVm0emxoKUrILGr/uE3hHb/pjof6ukzorEDelXVu09mPjYub3pbxafvNK3wCs0MSslcOFkBA4AADCmCxcuuLu7P/7440Tk6+t7+vTp3t5eR0fHCxcuNDY29vf3//jHP37iiSfa2trq6upcXV3b29udnJxCQkI0Gk1tba2zs/NDDz20evXqurq6r776imGYFStW/OQnPxm1LolEQkRDL/Gn9OLenrfQaSEFvrpjc+PzRwsa18Wc2xBVbL+U2jsD934S2pqefqim1WT/mN/mrKwoiak49rlD5Le48+Q5vdB7c4x3Y0FBo57jEbFjb6I/r7MmNz239NyVPp5X6LaslAUfRsQe0xOlr47t+/SPtC+l4LGDpSlLdTW523NLG/X0mHdMSlaM951X1GFhYUQ0NIMwxbmDf//738O+U4Zhmpqazpw58+2337q5uT311FPvv/8+EVVWVv7iF784ffr0ww8/rNfrn3322RMnTkil0qVLl3711Vf/+Mc/Xnzxxb/+9a98Pv/atWvffvutt7f3119/feXKFZFItGrVqoceesjm7vT3v//9ypUrV65cuXHjhr+//9A4p3G3mTVrlqOjo6Oj41NPPfU///M/PT09Op3uiy++iImJIaKPPvpoyZIlPB5v8ECQy+X/+Mc/tFrtww8/7O/vz+Vyjx8/TkQFBQUvvPBCfX29UCj09/e/fPlyXV2dyWQSiURyudzR0fHjjz92cnLq7u62WCz+/v7W43GGbASTyaTVan/+85//85//9PX1vXbt2uBK/exnP/vyyy+J6JNPPgkNDX3//fddXFyuXr26atWqysrK9evXE9H169eLi4tNJpOnp+fPf/7zr776atgG1Gq1g1+9vb19e3v7888/f/369Zqamq6uLoFA8MQTTyxYsGDU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)

<details>
  <summary>Show tracks where mood is null</summary>

```javascript
// jq -S '.tracks | group_by(.display_mood) | map(select(.[0].display_mood == null)) | .[][]' music-1000.json
{
  "album": "None",
  "artist": "Quincas Moreira",
  "artist_channel_url": "/channel/UCL1zFMJb0sthwdAlGjGbdyg",
  "artist_url": "",
  "category": "",
  "display_category": "",
  "display_genre": "Dance & Electronic",
  "display_mood": null,
  "download_url": "https://www.youtube.com/audiolibrary_download?vid=6cd570f9a95afcd5",
  "downloadable": true,
  "favorite": false,
  "fp_ref_id": "6cd570f9a95afcd5",
  "genre": "Dance & Electronic",
  "instruments": [],
  "is_new_track": false,
  "len": 143,
  "license_type": 0,
  "mood": null,
  "popularity_percentile": 99,
  "reference_vid": "6cd570f9a95afcd5",
  "streamid": "4jMGk6cZ1R1sav455QaljIQQg2BI7WQ2x1S6_p06eCpY0CgHMLm5gErxeT5y1zfq",
  "title": "Dragonfly",
  "track_url": "",
  "vid": "6cd570f9a95afcd5",
  "waveform_url": "https://www.youtube.com/api/editor/waveform?expire=1587186000&if=0&scale=10&editlist=Cgh3YXZlZm9ybRocCJjdCBIWChA2Y2Q1NzBmOWE5NWFmY2Q1EAAYAg%3D%3D&sigh=qKQKN0COQgXU610pNF_VlQ"
}
{
  "album": "None",
  "artist": "None",
  "artist_channel_url": null,
  "artist_url": "",
  "category": "",
  "display_category": "",
  "display_genre": "",
  "display_mood": null,
  "download_url": "https://www.youtube.com/audiolibrary_download?vid=acb5fd608ed48dfa",
  "downloadable": true,
  "favorite": false,
  "fp_ref_id": "acb5fd608ed48dfa",
  "genre": "None",
  "instruments": [],
  "is_new_track": false,
  "len": 279.783,
  "license_type": 0,
  "mood": null,
  "popularity_percentile": 72,
  "reference_vid": "acb5fd608ed48dfa",
  "streamid": "3EuS08tqMNHl4kuqaRFM44zCyU6_pk7mJ9QQU_mlKbdi6kHYE_vvTrm8ABGKDplh",
  "title": "Heading West",
  "track_url": "",
  "vid": "acb5fd608ed48dfa",
  "waveform_url": "https://www.youtube.com/api/editor/waveform?expire=1587186000&if=0&scale=10&editlist=Cgh3YXZlZm9ybRocCNiDERIWChBhY2I1ZmQ2MDhlZDQ4ZGZhEAAYAg%3D%3D&sigh=T6XJ6jgPOkGumrCaBZM0gQ"
}
{
  "album": "None",
  "artist": "Jingle Punks",
  "artist_channel_url": null,
  "artist_url": "",
  "category": "",
  "display_category": "",
  "display_genre": "Hip Hop",
  "display_mood": null,
  "download_url": "https://www.youtube.com/audiolibrary_download?vid=e88a3613bec491fe",
  "downloadable": true,
  "favorite": false,
  "fp_ref_id": "e88a3613bec491fe",
  "genre": "Hip Hop",
  "instruments": [],
  "is_new_track": false,
  "len": 71.816,
  "license_type": 0,
  "mood": null,
  "popularity_percentile": 92,
  "reference_vid": "e88a3613bec491fe",
  "streamid": "LhGrclO5MWbHExj34N12YAqUoxZeVg-aXf1lHuJWG85iVS5DEvFrlQK6IxQqD0_C",
  "title": "Working It",
  "track_url": "",
  "vid": "e88a3613bec491fe",
  "waveform_url": "https://www.youtube.com/api/editor/waveform?expire=1587186000&if=0&scale=10&editlist=Cgh3YXZlZm9ybRocCNiqBBIWChBlODhhMzYxM2JlYzQ5MWZlEAAYAg%3D%3D&sigh=M_ZWhvnqM9dPsQorJGHGcw"
}
{
  "album": "None",
  "artist": "Jingle Punks",
  "artist_channel_url": null,
  "artist_url": "",
  "category": "",
  "display_category": "",
  "display_genre": "Hip Hop",
  "display_mood": null,
  "download_url": "https://www.youtube.com/audiolibrary_download?vid=74b025d0ee7b920f",
  "downloadable": true,
  "favorite": false,
  "fp_ref_id": "74b025d0ee7b920f",
  "genre": "Hip Hop",
  "instruments": [],
  "is_new_track": false,
  "len": 72.65,
  "license_type": 0,
  "mood": null,
  "popularity_percentile": 46,
  "reference_vid": "74b025d0ee7b920f",
  "streamid": "oZm57pHdWiIrHpz9F41HH24zjshlAkDSfDcMfzSJKZu7RRoC-BXnSWM6o7EvZjb2",
  "title": "Red Nose Hose",
  "track_url": "",
  "vid": "74b025d0ee7b920f",
  "waveform_url": "https://www.youtube.com/api/editor/waveform?expire=1587186000&if=0&scale=10&editlist=Cgh3YXZlZm9ybRocCMCyBBIWChA3NGIwMjVkMGVlN2I5MjBmEAAYAg%3D%3D&sigh=XjZk0Gr3yPXOZEpmVQlmNA"
}
{
  "album": "None",
  "artist": "Jingle Punks",
  "artist_channel_url": null,
  "artist_url": "",
  "category": "",
  "display_category": "",
  "display_genre": "Hip Hop",
  "display_mood": null,
  "download_url": "https://www.youtube.com/audiolibrary_download?vid=71b7db4b4717cad7",
  "downloadable": true,
  "favorite": false,
  "fp_ref_id": "71b7db4b4717cad7",
  "genre": "Hip Hop",
  "instruments": [],
  "is_new_track": false,
  "len": 72.65,
  "license_type": 0,
  "mood": null,
  "popularity_percentile": 44,
  "reference_vid": "71b7db4b4717cad7",
  "streamid": "-2y3x_tUSDG4aI0H6bmT4eiOL5rBSyKDbbV2MKLj7yFC5t_C7__Ze-WYwIr9RNy0",
  "title": "You Keep Showing Up",
  "track_url": "",
  "vid": "71b7db4b4717cad7",
  "waveform_url": "https://www.youtube.com/api/editor/waveform?expire=1587186000&if=0&scale=10&editlist=Cgh3YXZlZm9ybRocCMCyBBIWChA3MWI3ZGI0YjQ3MTdjYWQ3EAAYAg%3D%3D&sigh=gDEVGAt6_QL2PetA1-quGQ"
}
```
</details>

<details>
  <summary>Show tracks where mood is lowercase</summary>

```javascript
// jq -S '.tracks | map(select(.display_mood == "dramatic" or .display_mood == "bright")) | .[]' music-1000.json
{
  "album": "None",
  "artist": "Max Surla/Media Right Productions",
  "artist_channel_url": null,
  "artist_url": "",
  "category": "",
  "display_category": "",
  "display_genre": "Cinematic",
  "display_mood": "dramatic",
  "download_url": "https://www.youtube.com/audiolibrary_download?vid=f1ceb8f29ae8528c",
  "downloadable": true,
  "favorite": false,
  "fp_ref_id": "f1ceb8f29ae8528c",
  "genre": "Cinematic",
  "instruments": [
    "Strings",
    "Bass",
    "Trumpet"
  ],
  "is_new_track": false,
  "len": 133.25,
  "license_type": 0,
  "mood": "dramatic",
  "popularity_percentile": 95,
  "reference_vid": "f1ceb8f29ae8528c",
  "streamid": "94k-pZl3OIdspZYzwRob6MgAIqF9XeO0TSfn-rVSsbOsFM7NjsmqVYuVGLne2gsI",
  "title": "Black and White",
  "track_url": "",
  "vid": "f1ceb8f29ae8528c",
  "waveform_url": "https://www.youtube.com/api/editor/waveform?expire=1587186000&if=0&scale=10&editlist=Cgh3YXZlZm9ybRocCIiPCBIWChBmMWNlYjhmMjlhZTg1MjhjEAAYAg%3D%3D&sigh=v5L_GKVJd4mI32LhFHTjKQ"
}
{
  "album": "None",
  "artist": "Max Surla/Media Right Productions",
  "artist_channel_url": null,
  "artist_url": "",
  "category": "",
  "display_category": "",
  "display_genre": "Rock",
  "display_mood": "bright",
  "download_url": "https://www.youtube.com/audiolibrary_download?vid=d57bd4dd7132ce74",
  "downloadable": true,
  "favorite": false,
  "fp_ref_id": "d57bd4dd7132ce74",
  "genre": "Rock",
  "instruments": [
    "Electric Guitar",
    "Drums",
    "Bass",
    "Synth"
  ],
  "is_new_track": false,
  "len": 128.15,
  "license_type": 0,
  "mood": "bright",
  "popularity_percentile": 83,
  "reference_vid": "d57bd4dd7132ce74",
  "streamid": "u_Di2qEAycOdr7kvPM7E6yLxhV-26isuAcDHTg1KftpDJAzz6S5clDVT2YPLLYn4",
  "title": "Animal",
  "track_url": "",
  "vid": "d57bd4dd7132ce74",
  "waveform_url": "https://www.youtube.com/api/editor/waveform?expire=1587186000&if=0&scale=10&editlist=Cgh3YXZlZm9ybRocCIDoBxIWChBkNTdiZDRkZDcxMzJjZTc0EAAYAg%3D%3D&sigh=VxV44xSkRMXeMMWT4Udv-g"
}
```
</details>

### Tracks by license 

[Tracks with license number 0 to 2 do not require attribution, whereas 3 to 6 are for CC BY 1.0 to 4.0.](./DEVELOPMENT.md) The website suggests that at some point there may have been a distinction between songs that can be monetized and songs that couldn't, but this does not explain why there are 3 values for no attribution required. At the moment the code seems to make no distinction between 0 to 2, yet tracks only have licences 0, 1 or 6. 

<details>
  <summary>Raw licence numbers</summary>

```javascript
jq -S '[{license: .tracks[].license_type}] | group_by(.license) | map({license: .[0].license, count:length}) | sort_by(.count) | reverse ' music-1000.json # tracks by attribution
[
  {
    "count": 2645,
    "license": 1
  },
  {
    "count": 1309,
    "license": 0
  },
  {
    "count": 1059,
    "license": 6
  }
]
```
</details>

```javascript
// jq -Sc '[{license: .tracks[].license_type}] | group_by(.license) | map({license: .[0].license, count:length}) | sort_by(.count) | reverse | group_by(.license <= 2) | map({(if .[0].license <= 2 then "No Attribution Required" else "CC BY" end):[.[].count] | add}) | .[]' music-1000.json
{"CC BY":1059}
{"No Attribution Required":3954}
```

## [Development, WIP and TODOs](./DEVELOPMENT.md)

See [DEVELOPMENT.md](./DEVELOPMENT.md) for more details. Currently working on tagging.
