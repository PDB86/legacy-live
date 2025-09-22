import type { Song, Era } from "./types"

const rawSetlist = `🎉 Party Music / Top 40
All About That Bass - Meghan Trainor
Always Be My Baby - Mariah Carey
American Boy - Estelle
Attention - Charlie Puth
Bang Bang - Jessie J / Ariana Grande / Nicki Minaj
Baby One More Time - Britney Spears
Bad Habits - Ed Sheeran
Best Day of My Life - American Authors
Best Friend - Doja Cat
Better Now - Post Malone
Electric Feel - MGMT
Birds of a Feather - Billie Eilish
Blinding Lights - Weeknd
Blurred Lines - Robin Thicke
Break My Heart - Dua Lipa
Breathin - Ariana Grande
Bulletproof - La Roux
Cake by the Ocean - DNCE
California Gurls - Katy Perry
Call Me Maybe - Carly Rae Jepsen
Can't Feel My Face - Weeknd
Can't Stop the Feeling - Justin Timberlake
Cheap Thrills - Sia
Closer - Chainsmokers
Crazy in Love - Beyoncé
About Damn Time - Lizzo
Die with a Smile - Gaga, Bruno Mars
DJ Got Us Falling in Love Again - Usher
Domino - Jessie J
Don't Let Me Down - Chainsmokers
Don't Start Now - Dua Lipa
Shivers - Ed Sheeran
Done for Me - Charlie Puth
Dynamite - Taio Cruz
Edge of Glory - Lady Gaga
Empire State of Mind - Alicia Keys
Everybody Talks - Neon Trees
Good 4 U - Olivia Rodrigo
Exes and Ohs - Elle King
Fancy - Iggy Azalea
Feels so Close - Calvin Harris
Finesse - Bruno Mars
Fireball - Pitbull
Firework - Katy Perry
Forget U - CeeLo Green
Get Into the Groove - Madonna
Get Lucky - Daft Punk/Pharrell
Girls Like You - Maroon 5
Give Me Everything Tonight - Pitbull
Good Days - SZA
Good Luck Babe - Chapel Roan
Grenade - Bruno Mars
Happy - Pharrell Williams
Havana - Camila Cabello
Hey Ya - Outkast
Hideaway - Kiesza
Hold On - Justin Bieber
Hot n Cold - Katy Perry
How Deep Is Your Love - Calvin Harris
I Don't Care - Ed Sheeran
I Feel It Coming - The Weeknd
I Gotta Feeling - Black Eyed Peas
I Kissed a Girl - Katy Perry
In My Feelings - Drake
Intentions - Justin Bieber
I Like It - Cardi B
I Like Me Better - Lauv
We Don't Talk Anymore - Charlie Puth / Selena Gomez
I Wanna Dance with Somebody - Whitney Houston
I Want You Back - Jackson 5
Jealous - Nick Jonas
Juice - Lizzo
Just Dance - Lady Gaga
Latch - Sam Smith
Leave the Door Open - Bruno Mars
Levitating - Dua Lipa
Lights - Ellie Goulding
Like a Prayer - Madonna
Like I'm Gonna Lose You - Meghan Trainor
Lips Are Movin - Meghan Trainor
Locked Out of Heaven - Bruno Mars
Lose Control - Teddy Swims
Lost in Japan - Shawn Mendes
Love Never Felt So Good - JT/MJ
Love on Top - Beyoncé
Love Song - Sara Bareilles
Love Yourself - Justin Bieber
MIA - Drake, Bad Bunny
Moves Like Jagger - Maroon 5
New Rules - Dua Lipa
Nothing Holding Me Back - Shawn Mendes
Old Town Road - Lil Nas X ft. Billy Ray Cyrus
On the Floor - J Lo
One Dance - Drake
One Kiss - Dua Lipa
Only Girl in the World - Rihanna
Party in the USA - Miley Cyrus
Peaches - Justin Bieber
Poker Face - Lady Gaga
Price Tag - Jessie J
Problem - Ariana Grande
Raise Your Glass - Pink
Rather Be - Clean Bandit
Ride - 21 Pilots
Rolling in the Deep - Adele
Rude Boy - Rihanna
Say So - Doja Cat
Señorita - Shawn Mendes
Shake It Off - Taylor Swift
Shape of You - Ed Sheeran
Shut Up and Dance - Walk the Moon
Single Ladies - Beyoncé
Sorry - Justin Bieber
Starships - Nicki Minaj
Starboy - Weeknd
Stay - Justin Bieber
Sucker - Jonas Bros
Sugar - Maroon 5
Suit and Tie - Justin Timberlake
Summer - Calvin Harris
Talk Dirty - Jason Derulo
Flowers - Miley Cyrus
Teenage Dream - Katy Perry
Thank U, Next - Ariana Grande
That's What I Like - Bruno Mars
The Middle - Zedd, Maren Morris
The Way You Make Me Feel - MJ
This Love - Maroon 5
Toxic - Britney Spears
Treasure - Bruno Mars
Truth Hurts - Lizzo
Umbrella - Rihanna
Uptown Funk - Bruno Mars
Valerie - Amy Winehouse
Wake Me Up - Avicii
Want to Want Me - Jason Derulo
Watermelon Sugar - Harry Styles
We Found Love - Rihanna
As It Was - Harry Styles
Yummy - Justin Bieber
34 + 35 - Ariana Grande

🎸 80's / 90's / Rock
Africa - Toto
All Mixed Up - 311
All Night Long - Lionel Richie
American Girl - Tom Petty
Are You Gonna Go My Way - Lenny Kravitz
Basketcase - Green Day
Beat It - Michael Jackson
Billie Jean - Michael Jackson
Bittersweet Symphony - The Verve
Born in the USA - Bruce Springsteen
Come on Eileen - Dexys Midnight Runners
Crazy - Aerosmith
Creep - Radiohead
Dancing in the Dark - Bruce Springsteen
Don't Speak - No Doubt
Don't Stop Believin' - Journey
Down - 311
Enter Sandman - Metallica
Even Flow - Pearl Jam
Every Breath You Take - Police
Faith - George Michael
Footloose - Kenny Loggins
Girls Just Wanna Have Fun - Cyndi Lauper
Give It Away - RHCP
Hard to Handle - Black Crowes
Hit Me with Your Best Shot - Pat Benatar
Hungry Like the Wolf - Duran Duran
I Love Rock n Roll - Joan Jett
I'm So Excited - Pointer Sisters
Interstate Love Song - STP
Jessie's Girl - Rick Springfield
Jump - Van Halen
Kiss - Prince
Learn to Fly - Foo Fighters
Let's Dance - David Bowie
Living on a Prayer - Bon Jovi
Man in the Box - Alice in Chains
Material Girl - Madonna
Mr. Brightside - The Killers
My Own Worst Enemy - Lit
Paradise City - Guns n Roses
Panama - Van Halen
Plush - STP
Pour Some Sugar on Me - Def Leppard
Purple Rain - Prince
Raspberry Beret - Prince
Red Red Wine - UB40
Semi-Charmed Life - Third Eye Blind
Should I Stay or Should I Go - The Clash
Smells Like Teen Spirit - Nirvana
Start Me Up - Rolling Stones
Sugar We're Going Down - Fall Out Boy
Summer of 69 - Bryan Adams
Sweet Child o' Mine - Guns n Roses
Sweet Home Alabama - Lynyrd Skynyrd
Sweet Dreams - Eurythmics
Tainted Love - Soft Cell
Take on Me - A-ha
Take Me Home Tonight - Eddie Money
Talks to Angels - Black Crowes
Today - Smashing Pumpkins
Under the Bridge - RHCP
Uptown Girl - Billy Joel
Walk This Way - Aerosmith
Walking on Sunshine - Katrina & the Waves
Welcome to the Jungle - Guns n Roses
What I Got - Sublime
When I Come Around - Green Day
White Wedding - Billy Idol
Wonderwall - Oasis
You Shook Me All Night Long - ACDC
Your Love - The Outfield
1979 - Smashing Pumpkins

🎶 50's / 60's / Motown
Ain't No Mountain High Enough - Marvin Gaye
Ain't Too Proud to Beg - The Temptations
Baby I Need Your Loving - Four Tops
Blame It on the Boogie - Jackson 5
Build Me Up Buttercup - Foundations
Come Together - Beatles
Dancing in the Streets - Martha & the Vandellas
Do You Love Me - Contours
Fire and Rain - James Taylor
Get Ready - Temptations
Good Lovin - Young Rascals
Hard Day's Night - Beatles
Heard It Through the Grapevine - Marvin Gaye
I Feel Good - James Brown
I Saw Her Standing There - Beatles
I Want You Back - Jackson 5
I Wanna Hold Your Hand - Beatles
I Wish - Stevie Wonder
Jailhouse Rock - Elvis Presley
Knock on Wood - Eddie Floyd
Lean on Me - Bill Withers
Mustang Sally - Wilson Pickett
Oh Darling - Beatles
Please Mr. Postman - Marvelettes
Pretty Woman - Roy Orbison
Proud Mary - Ike & Tina Turner
Respect - Aretha Franklin
Satisfaction - Rolling Stones
Sex Machine - James Brown
Shout – Isley Brothers
Signed, Sealed, Delivered - Stevie Wonder
Sir Duke - Stevie Wonder
Sitting on the Dock of the Bay - Otis Redding
Something - Beatles
Soul Man - Sam & Dave
Sweet Caroline - Neil Diamond
This Magic Moment - The Drifters
What's Going On - Marvin Gaye
While My Guitar Gently Weeps - Beatles
Wild World - Cat Stevens
Yesterday - Beatles
Your Song - Elton John

🎷 Standards
All of Me - John Legend
All of Me - Sinatra
At Last - Etta James
Cheek to Cheek - Ella Fitzgerald
Come Fly with Me - Sinatra
Cry Me a River - Dinah Washington
Fly Me to the Moon - Sinatra
Georgia on My Mind - Ray Charles
Girl from Ipanema - Jobim
Have I Told You Lately - Rod Stewart
How Sweet It Is - James Taylor
I've Got the World on a String - Sinatra
L.O.V.E - Natalie Cole
Mack the Knife - Bobby Darin
Misty - Sarah Vaughn
My Way - Sinatra
New York, New York - Sinatra
Night and Day - Sinatra
Route 66 - Natalie Cole
Save the Last Dance for Me - Michael Bublé
Somewhere Over the Rainbow - Judy Garland
Summertime - Ella Fitzgerald
The Way You Look Tonight - Frank Sinatra
Unforgettable - Nat King Cole
What a Wonderful World - Louis Armstrong
Young at Heart - Tony Bennett

🌴 Latin
A Dios le Pido - Juanes
Ai Se Eu Te Pego - Michel Teló
A Pedir Su Mano - Juan Luis Guerra
Bailamos - Enrique Iglesias
Besame Mucho
Bidi Bidi Bom Bom - Selena
Brujería - El Gran Combo
Burbujas de Amor - Juan Luis Guerra
Cali Pachanguero - Grupo Niche
Con Los Años Que Me Quedan - Gloria Estefan
Despacito – Luis Fonsi, Daddy Yankee
El Cuarto de Tula - Buena Vista Social Club
El Perdón - Enrique Iglesias
Es Mentiroso - Olga Tañón
Fruta Fresca - Carlos Vives
Hips Don't Lie - Shakira
Isla Bella - Ricky Martin
La Bilirrubina - Juan Luis Guerra
La Camisa Negra - Juanes
La Cura - Frankie Ruiz
La Gota Fría - Carlos Vives
La Gozadera - Gente de Zona ft. Marc Anthony
La Rebelión - Joe Arroyo
La Negra Tiene Tumbao - Celia Cruz
La Vida Es un Carnaval - Celia Cruz
Las Avispas - Juan Luis Guerra
Livin' la Vida Loca - Ricky Martin
Llorarás - Oscar D'León
María - Ricky Martin
Mi Tierra - Gloria Estefan
Nadie Como Ella - Marc Anthony
Oye Cómo Va - Santana
Pa' Mayté - Carlos Vives
Quimbara - Celia Cruz
Rabiosa - Shakira
Tal Vez - Ricky Martin
Vivir Mi Vida - Marc Anthony
Vivir Sin Aire - Maná
Volver, Volver - Vicente Fernández
Vuelve - Ricky Martin
Yo No Sé Mañana - Luis Enrique

💖 Ballads
At Last - Etta James
Can't Help Falling in Love - Elvis Presley
Come Away with Me - Norah Jones
Crazy Love - Van Morrison
Diamonds - Rihanna
Don't Know Why - Norah Jones
Easy on Me - Adele
Hey Jude - Beatles
I Won't Give Up - Jason Mraz
If I Ain't Got You - Alicia Keys
I'm Yours - Jason Mraz
Into the Mystic - Van Morrison
Just the Way You Are - Bruno Mars
Landslide - Stevie Nicks
Let's Stay Together - Marvin Gaye
Like I'm Gonna Lose You - Meghan Trainor
Make You Feel My Love - Adele
My Girl - Temptations
Natural Woman - Aretha Franklin
Ordinary People - John Legend
Set Fire to the Rain - Adele
Shallow - Lady Gaga
Something - Beatles
Stay with Me - Sam Smith
Thinking Out Loud - Ed Sheeran
Unchained Melody - Righteous Brothers
Wonderful Tonight - Eric Clapton
You Are So Beautiful - Joe Cocker
Your Song - Elton John

🎷 Instrumentals / Jazz
Europa - Santana
Cantaloupe Island - Herbie Hancock
Breezin - George Benson
Impressions - John Coltrane
Sister Sadie - Horace Silver
All Blues – Miles Davis
Now's the Time - Charlie Parker
I Mean You – Thelonious Monk
All the Things You Are - Jerome Kern
Corcovado - Jobim
Cottontail – Duke Ellington
Freddie the Freeloader - Miles Davis
Four - Miles Davis
Footprints - Wayne Shorter
Equinox - John Coltrane
Donna Lee - Charlie Parker
Dolphin Dance - Herbie Hancock
Giant Steps - John Coltrane
I'll Remember April - Chet Baker
In a Sentimental Mood - Duke Ellington
Invitation - Bill Evans
Joy Spring - Clifford Brown
One Note Samba - Jobim
Seven Steps to Heaven – Miles Davis
Scrapple from the Apple - Charlie Parker
Song for My Father - Horace Silver
Take 5 – Dave Brubeck
Wave – Jobim

🤠 Country / Blues
Act Naturally - Buck Owens
American Kids - Kenny Chesney
Any Man of Mine - Shania Twain
Beers and Sunshine - Darius Rucker
Before You Accuse Me - Eric Clapton
Body Like a Back Road - Sam Hunt
Boot Scoot Boogie - Brooks & Dunn
Chicken Fried - Zac Brown Band
Crazy - Patsy Cline
Crossroads - Cream
Cruise - Florida Georgia Line
Devil Went Down to Georgia - Charlie Daniels
Dixieland Delight - Alabama
Fancy Like - Walker Hayes
Folsom Prison Blues - Johnny Cash
Forever and Ever, Amen - Randy Travis
Friends in Low Places - Garth Brooks
Gimme One Reason - Tracy Chapman
Half of My Hometown - Kelsea Ballerini
I Love This Bar - Toby Keith
Life Rolls On - Florida Georgia Line
Me and Bobby McGee - Janis Joplin
My Wish - Rascal Flatts
Pride and Joy - Stevie Ray Vaughan
Redneck Woman – Gretchen Wilson
She's Not Crying Anymore - Billy Ray Cyrus
Stand By Your Man - Tammy Wynette
Take Me Home, Country Roads - John Denver
Tennessee Whiskey - Chris Stapleton
Texas Flood - Stevie Ray Vaughan
Thank God I'm a Country Boy - John Denver
The Gambler - Kenny Rogers
Wagon Wheel - Darius Rucker
Want It Again - Thomas Rhett

🎉 Special Dances
Hora Traditional
Macarena – Los Del Rio
Locomotion - Little Eva
Cha Cha Slide – Mr. C the Slide Man
Cupid Shuffle - Cupid
The Wobble – VIC
Teach Me How to Dougie - Cali Swag
Conga - Miami Sound Machine
Mony Mony - Billy Idol
Shout - Isley Brothers
Twist and Shout - Beatles
We Are Family - Sister Sledge`

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

function inferEra(title: string, artist: string): Era | undefined {
  const eraMap: Record<string, Era> = {
    // 50s
    "jailhouse rock": "50s",
    "pretty woman": "50s",

    // 60s
    yesterday: "60s",
    satisfaction: "60s",
    respect: "60s",
    "come together": "60s",
    "hard day's night": "60s",
    "i wanna hold your hand": "60s",
    something: "60s",
    "while my guitar gently weeps": "60s",
    "sweet caroline": "60s",

    // 70s
    "your song": "70s",
    "fire and rain": "70s",
    "lean on me": "70s",
    "wild world": "70s",
    "dancing in the streets": "70s",

    // 80s
    "billie jean": "80s",
    "beat it": "80s",
    "material girl": "80s",
    "like a prayer": "80s",
    "girls just wanna have fun": "80s",
    footloose: "80s",
    jump: "80s",
    "purple rain": "80s",
    "take on me": "80s",
    "sweet dreams": "80s",
    "tainted love": "80s",
    "hungry like the wolf": "80s",
    faith: "80s",
    "let's dance": "80s",
    "walking on sunshine": "80s",

    // 90s
    "smells like teen spirit": "90s",
    creep: "90s",
    "don't speak": "90s",
    wonderwall: "90s",
    "semi-charmed life": "90s",
    basketcase: "90s",
    "my own worst enemy": "90s",
    "bittersweet symphony": "90s",

    // 2000s
    "hey ya": "2000s",
    "crazy in love": "2000s",
    "single ladies": "2000s",
    "hips don't lie": "2000s",
    toxic: "2000s",
    "since u been gone": "2000s",
    "mr. brightside": "2000s",

    // 2010s
    "uptown funk": "2010s",
    "shape of you": "2010s",
    "rolling in the deep": "2010s",
    happy: "2010s",
    "can't stop the feeling": "2010s",
    "shake it off": "2010s",
    "thinking out loud": "2010s",

    // 2020s
    "blinding lights": "2020s",
    "watermelon sugar": "2020s",
    levitating: "2020s",
    "good 4 u": "2020s",
    "as it was": "2020s",
    flowers: "2020s",
    "about damn time": "2020s",
  }

  return eraMap[title.toLowerCase()]
}

function inferPopularity(title: string, artist: string): number {
  const iconicSongs = [
    "billie jean",
    "beat it",
    "uptown funk",
    "happy",
    "shape of you",
    "rolling in the deep",
    "hey ya",
    "crazy in love",
    "single ladies",
    "don't stop believin'",
    "sweet caroline",
    "respect",
    "satisfaction",
    "yesterday",
    "something",
    "purple rain",
    "smells like teen spirit",
    "wonderwall",
    "mr. brightside",
    "blinding lights",
    "watermelon sugar",
  ]

  return iconicSongs.includes(title.toLowerCase()) ? 5 : 3
}

export function parseSetlist(): Song[] {
  const songs: Song[] = []
  const sections = rawSetlist.split(/(?=🎉|🎸|🎶|🎷|🌴|💖|🤠)/)

  sections.forEach((section) => {
    if (!section.trim()) return

    const lines = section.trim().split("\n")
    const headerLine = lines[0]
    const songLines = lines.slice(1).filter((line) => line.trim() && line.includes(" - "))

    // Determine section defaults
    let sectionDefaults: Partial<Song> = {}

    if (headerLine.includes("Party Music / Top 40")) {
      sectionDefaults = {
        genres: ["Pop", "Top 40"],
        moments: ["Party"],
        tempo: "High",
      }
    } else if (headerLine.includes("80's / 90's / Rock")) {
      sectionDefaults = {
        genres: ["Rock"],
        moments: ["Party"],
        tempo: "High",
      }
    } else if (headerLine.includes("50's / 60's / Motown")) {
      sectionDefaults = {
        genres: ["Motown", "Oldies", "Soul"],
        moments: ["Party", "Dinner"],
        tempo: "Mid",
      }
    } else if (headerLine.includes("Standards")) {
      sectionDefaults = {
        genres: ["Jazz Standards"],
        moments: ["Ceremony", "Cocktail Hour", "Dinner"],
        tempo: "Chill",
      }
    } else if (headerLine.includes("Latin")) {
      sectionDefaults = {
        genres: ["Latin"],
        moments: ["Party", "Dinner"],
        language: "Spanish",
        tempo: "High",
      }
    } else if (headerLine.includes("Ballads")) {
      sectionDefaults = {
        genres: ["Ballad", "Pop"],
        moments: ["First Dance", "Parent Dance", "Dinner"],
        tempo: "Chill",
      }
    } else if (headerLine.includes("Instrumentals / Jazz")) {
      sectionDefaults = {
        genres: ["Jazz", "Instrumental"],
        moments: ["Cocktail Hour", "Dinner"],
        tempo: "Chill",
      }
    } else if (headerLine.includes("Country / Blues")) {
      sectionDefaults = {
        genres: ["Country", "Blues"],
        moments: ["Party", "Dinner"],
        tempo: "Mid",
      }
    } else if (headerLine.includes("Special Dances")) {
      sectionDefaults = {
        genres: ["Participation"],
        moments: ["Party"],
        tempo: "High",
      }
    }

    songLines.forEach((line) => {
      const match = line.match(/^(.+?)\s*[-–—]\s*(.+)$/)
      if (!match) return

      const [, title, artist] = match
      const cleanTitle = title.trim()
      const cleanArtist = artist.trim()

      const song: Song = {
        id: createSlug(cleanTitle),
        title: cleanTitle,
        artist: cleanArtist,
        era: inferEra(cleanTitle, cleanArtist),
        genres: sectionDefaults.genres || ["Pop"],
        moments: sectionDefaults.moments || ["Party"],
        tempo: sectionDefaults.tempo,
        language: sectionDefaults.language,
        popularity: inferPopularity(cleanTitle, cleanArtist),
      }

      songs.push(song)
    })
  })

  // Deduplicate by id
  const uniqueSongs = songs.filter((song, index, self) => index === self.findIndex((s) => s.id === song.id))

  return uniqueSongs
}
