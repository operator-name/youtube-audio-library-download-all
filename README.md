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