# youtube-audio-library-download-all

## Instuctions

1. Install [`aria2`](https://aria2.github.io/)
2. `cd music`
3. `aria2c  --auto-file-renaming=false --max-connection-per-server=8 --max-concurrent-downloads=16 --input-file=music-1000.txt`

Change `--max-connection-per-server` and `--max-concurrent-downloads` depending on your computer, internet and when youtube starts throttling you/putting up captchas. The current numbers have been tested once overnight and did not seem to produce any issues.

`wget --content-disposition -i music-1000.txt` or `curl` also works, but you'll have to manually parallelise it with `xargs` or `parallel`. `aria2` also has the benifit of being able to automatically continue if interupted.  

The overall download is ~30gb for both music and sound effects. Note that the current audio library at time of writing has the following songs with repeated titles, which may be overwritten when using the instructions. 

```bash
+ jq -Sc '[{title:.tracks[].title}] | group_by(.title) | map(select(length > 1)) | map({(.[0].title):length}) | .[]' music-1000.json 
```
```json
{"Amazing Grace":2}
{"Bar Crawl":2}
{"Bittersweet":2}
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

## Why?

This is an attempt to download and clean (apply metadata) music from youtube's audio library for listening. The goal is to produce a organised local playlist that can be ingested by a music player for listening in the background. The hope is that this will aid in music discovery for creative purposes where creative commons or royalty free music is required. 

### Scope

At the moment it is outside of the scope of the project to download music from [other sources](https://creativecommons.org/about/program-areas/arts-culture/arts-culture-resources/legalmusicforvideos/). It is also currently not within the scope of the project to filter the categories before downloading. 

## Intersting Statistics

```bash
+ jq '.tracks | length' music-1000.json # number of tracks
5013

++ jq '[.tracks[].len] | add' music-1000.json # total number of seconds
+ date -d@807892.5689999989 -u +%H:%M:%S # into hours minutes seconds
08:24:52

+ jq '[.tracks[].instruments[]] | unique | length' music-1000.json # unique instuments
321

+ jq '[.tracks[].artist] | unique | length' music-1000.json # unique artists
215

+ jq -Sc '[{artist: .tracks[].artist}] | group_by(.artist) | map({artist:.[0].artist, count:length}) | sort_by(.count) | reverse | map({(.artist):.count}) | .[]' music-1000.json # artists sorted by number of tracks
{"Kevin MacLeod":604}
{"Silent Partner":403}
{"Audionautix":301}
{"Jingle Punks":180}
{"Quincas Moreira":110}
{"TrackTribe":100}
{"Twin Musicom":84}
{"Chris Zabriskie":79}
{"Otis McDonald":74}
{"Sir Cubworth":70}
{"Doug Maxwell/Media Right Productions":62}
{"The 126ers":61}
{"E's Jammy Jams":60}
{"Dan Lebowitz":60}
{"Gunnar Olsen":55}
{"Unicorn Heads":50}
{"The Green Orbs":50}
{"Freedom Trail Studio":50}
{"Density & Time":50}
{"Aakash Gandhi":50}
{"Topher Mohr and Alex Elena":49}
{"Coyote Hearing":48}
{"MK2":46}
{"Riot":43}
{"John Deley and the 41 Players":42}
{"United States Marine Band":41}
{"The Whole Other":40}
{"The Mini Vandals":40}
{"Jesse Gallagher":40}
{"Asher Fulero":40}
{"Ethan Meixsell":34}
{"Max McFerren":31}
{"Vibe Tracks":30}
{"Verified Picasso":30}
{"Jeremy Blake":30}
{"Huma-Huma":30}
{"Geographer":30}
{"Chris Haugen":30}
{"Bad Snacks":30}
{"Dan Bodan":29}
{"Jimmy Fontanez/Media Right Productions":28}
{"Doug Maxwell":24}
{"Saidbysed":21}
{"William Rosati":20}
{"Wayne Jones":20}
{"Text Me Records / Bobby Renz":20}
{"Spazz Cardigan":20}
{"South London HiFi":20}
{"Rondo Brothers":20}
{"Reed Mathis":20}
{"RKVC":20}
{"Puddle of Infinity":20}
{"Patrick Patrikios":20}
{"Noir Et Blanc Vie":20}
{"Letter Box":20}
{"Konrad OldMoney":20}
{"Jeremy Korpas":20}
{"JR Tundra":20}
{"I Think I Can Help You":20}
{"Everet Almond":20}
{"ELPHNT":20}
{"Dyalla":20}
{"Diamond Ortiz":20}
{"DJ Williams":20}
{"Cxdy":20}
{"Cooper Cannell":20}
{"Biz Baz Studio":20}
{"Bird Creek":20}
{"Audio Hertz":20}
{"Anno Domini Beats":20}
{"Aaron Kenny":20}
{"ALBIS":20}
{"Eveningland":19}
{"Max Surla/Media Right Productions":18}
{"Aaron Lieberman":18}
{"Text Me Records / Leviathe":17}
{"Text Me Records / Jorge Hernandez":17}
{"The U.S. Army Band":16}
{"Josh Kirsch/Media Right Productions":16}
{"roljui":10}
{"pATCHES":10}
{"ann annie":10}
{"Yung Logos":10}
{"White Hex":10}
{"Wes Hutchinson":10}
{"Vibe Mountain":10}
{"VYEN":10}
{"Underbelly":10}
{"Ugonna Onyekwe":10}
{"True Cuckoo":10}
{"The Tower of Light":10}
{"The Grand Affair":10}
{"The Brothers Records":10}
{"The 129ers":10}
{"Text Me Records":10}
{"Stayloose":10}
{"Spence":10}
{"Slenderbeats":10}
{"Single Friend":10}
{"Sextile":10}
{"Sarah, The Illstrumentalist":10}
{"SYBS":10}
{"Rick Steel":10}
{"Ramzoid":10}
{"RalphReal":10}
{"Rachel K Collier":10}
{"RW Smith":10}
{"RAGE":10}
{"R.LUM.R":10}
{"Public Memory":10}
{"Odonis Odonis":10}
{"Norma Rockwell":10}
{"Nate Blaze":10}
{"Nat Keefe with The Bow Ties":10}
{"Nana Kwabena":10}
{"Myuu":10}
{"Mylar Melodies":10}
{"Mini Vandals":10}
{"Mikos Da Gawd":10}
{"Mike Relm":10}
{"Midnight North":10}
{"Media Right Productions":10}
{"Matt Harris":10}
{"Magic In The Other":10}
{"Loopop":10}
{"Lish Grooves":10}
{"Lauren Duski":10}
{"Late Night Feeler":10}
{"LATASHÁ":10}
{"Josh Lippi & The Overtimers":10}
{"John Deley":10}
{"Joey Pecoraro":10}
{"Joe Bagale":10}
{"JVNA":10}
{"JHS Pedals":10}
{"JAde Wii":10}
{"Houses of Heaven":10}
{"Hanu Dixit":10}
{"Hainbach":10}
{"HOVATOFF":10}
{"Francis Preve":10}
{"Endless Love":10}
{"Emily A. Sprague":10}
{"Drew Banga":10}
{"Dougie Wood":10}
{"DivKid":10}
{"Devon Church":10}
{"Dan Henig":10}
{"Craig MacArthur":10}
{"Chasms":10}
{"Causmic":10}
{"Bruno E.":10}
{"Birocratic":10}
{"Au.Ra":10}
{"Ashley Shadow":10}
{"Andrew Langdon":10}
{"Andrew Huang":10}
{"Amulets":10}
{"Slynk":9}
{"Jason Farnham":9}
{"Text Me Records / Social Work":8}
{"Text Me Records / GrandBankss":8}
{"The U.S. Marine Corps Band":7}
{"Text Me Records / Grandbankss":7}
{"Doug Maxwell, Jimmy Fontanez":7}
{"United States Naval Academy Band":6}
{"Doug Maxwell/Jimmy Fontanez":6}
{"Nat Keefe & Hot Buttered Rum":5}
{"Nat Keefe & BeatMower":5}
{"Alge":5}
{"The Midshipmen Glee Club":4}
{"Text Me Records / Jordan Blackmon":4}
{"Text Me Records / Hii.de":4}
{"Ron Meixsell and Wahneta Meixsell":4}
{"Jimmy Fontanez/Doug Maxwell":4}
{"Doug Maxwell/ Zac Zinger":4}
{"Beethoven":4}
{"Wahneta Meixsell":3}
{"Unites States Marine Band ":3}
{"Tchaikovsky":3}
{"Ron Meixsell":3}
{"United States Army Herald Trumpets":2}
{"Network 415":2}
{"Grieg":2}
{"Danny Kean/Doug Maxwell":2}
{"Chopin":2}
{"Bizet":2}
{"Bach":2}
{"Windows of Ken":1}
{"Wagner":1}
{"United States Naval Academy ":1}
{"United States Marine Band and Arthur S.Witcomb":1}
{"United States Marine Band ":1}
{"USAF Heritage of America Band ":1}
{"US Navy Academy Men's Glee Club ":1}
{"US NavalAcademy":1}
{"U.S. Navy Band":1}
{"U.S. Coast Guard Band":1}
{"U.S. Army Band":1}
{"Strauss":1}
{"Slynk & Kermode":1}
{"Satie":1}
{"Rossini":1}
{"Offenbach":1}
{"None":1}
{"Mozart":1}
{"Mendelssohn":1}
{"Liszt":1}
{"Kung Pao O'Malley":1}
{"Kevin MacLeod, Syrinx Starr":1}
{"John F. Kennedy":1}
{"Jimmy Fontanez/Doug Maxwell/Media Right Productions":1}
{"Handel":1}
{"Charles Zimmerman":1}
{"Air Force Band of Liberty":1}

+ jq -Scr '[{genre: .tracks[].genre}] | group_by(.genre) | map({genre: .[0].genre, count:length}) | sort_by(.count) | reverse | map({(.genre):.count}) | .[]' music-1000.json # genres sorted by number of tracks
{"Dance & Electronic":811}
{"Cinematic":737}
{"Rock":491}
{"Ambient":475}
{"Hip Hop & Rap":473}
{"Pop":414}
{"Classical":412}
{"Jazz & Blues":318}
{"Country & Folk":313}
{"R&B & Soul":233}
{"Children's":94}
{"Alternative & Punk":88}
{"Reggae":69}
{"Holiday":68}
{"World":8}
{"Hip Hop":3}
{"Electronic":2}
{"Country and Folk":2}
{"None":1}
{"Country Folk":1}

+ jq -Sc '[{display_mood: .tracks[].display_mood}] | group_by(.display_mood) | map({mood: .[0].display_mood, count: length}) | sort_by(.count) | reverse | map({(if .mood == null then "null" else .mood end):(.count)}) | .[]' music-1000.json # moods sorted by number of tracks
{"Dramatic":802}
{"Happy":674}
{"Dark":663}
{"Funky":635}
{"Calm":620}
{"Bright":603}
{"Inspirational":464}
{"Sad":194}
{"Angry":190}
{"Romantic":161}
{"null":5} # interestingly there are 5 tracks without a mood tag
{"dramatic":1} # two songs were tagged with lowercase whereas the rest are tagged with uppercase
{"bright":1}

+ jq -Sc '.tracks | group_by(.display_mood) | map(select(.[0].display_mood == null)) | .[] | map({title:.title, artist:.artist}) | .[]' music-1000.json # tracks without a mood tag
{"artist":"Quincas Moreira","title":"Dragonfly"}
{"artist":"None","title":"Heading West"}
{"artist":"Jingle Punks","title":"Working It"}
{"artist":"Jingle Punks","title":"Red Nose Hose"}
{"artist":"Jingle Punks","title":"You Keep Showing Up"}

+ jq -Sc '.tracks | map(select(.display_mood == "dramatic" or .display_mood == "bright")) | map({title:.title, artist:.artist}) | .[]' music-1000.json # tracks that were tagged with lowercase moods 
{"artist":"Max Surla/Media Right Productions","title":"Black and White"}
{"artist":"Max Surla/Media Right Productions","title":"Animal"}

+ jq -Sc '[{license: .tracks[].license_type}] | group_by(.license) | map({license: .[0].license, count:length}) | sort_by(.count) | reverse | group_by(.license <= 2) | map({(if .[0].license <= 2 then "No Attribution Required" else "CC BY" end):[.[].count] | add}) | .[]' music-1000.json # tracks by attribution
{"CC BY":1059}
{"No Attribution Required":3954}
```

## [Development, WIP and TODOs](./DEVELOPMENT.md)

See [DEVELOPMENT.md](./DEVELOPMENT.md). Currently working on tagging.