# CinemaPlayer - playlist script for multiple sources of Movies and TV Show episodes

![CinemaPlayer screenshot](https://raw.githubusercontent.com/CinemaPlayer/CinemaPlayer.github.io/master/images/cinemaplayer.png)

- 🎬 Creating a playlist from multiple sources
- 📺 Creating a playlist for movies and TV shows
- 🎨 Setting fonts, colors and position of the tabs
- 📌 Memorizing episode when re-visits website
- 🔌 Formation of playlist in three different ways
- 🔮 Simple movie image slider
- 📰 List for displaying a series of content

### How do I use the CinemaPlayer?

```html
<div 
    id="cinemaplayer"
    data-cinemaplayer-api="https://CinemaPlayer.github.io/example/api-object.json"
></div>
<script src="https://CinemaPlayer.github.io/cinemaplayer.js"></script>
```
- Example Episodes Playlist: [CinemaPlayer.github.io/example/api-episodes.html](https://CinemaPlayer.github.io/example/api-episodes.html)
- Example Multiple Sources: [CinemaPlayer.github.io/example/api-trailer.html](https://CinemaPlayer.github.io/example/api-trailer.html)

### What advanced API format does the CinemaPlayer accept?

- ADVANCED API OBJECT `main`
  - API [/CinemaPress/CinemaPlayer/master/example/api-object.json](https://raw.githubusercontent.com/CinemaPress/CinemaPlayer/master/example/api-object.json)
  - DEMO [CinemaPlayer.github.io/example/api-object.html](https://CinemaPlayer.github.io/example/api-object.html)
- ADVANCED API ARRAY
  - API [/CinemaPress/CinemaPlayer/master/example/api-array.json](https://raw.githubusercontent.com/CinemaPress/CinemaPlayer/master/example/api-array.json)
  - DEMO [CinemaPlayer.github.io/example/api-array.html](https://CinemaPlayer.github.io/example/api-array.html)
- ADVANCED API HTML
  - API [/CinemaPress/CinemaPlayer/master/example/api-html.html](https://raw.githubusercontent.com/CinemaPress/CinemaPlayer/master/example/api-html.html)
  - DEMO [CinemaPlayer.github.io/example/api-html.html](https://CinemaPlayer.github.io/example/api-html.html)

### What simple API format does the CinemaPlayer accept?

- SIMPLE API ARRAY
  - API [/CinemaPress/CinemaPlayer/master/example/simple-api-array.json](https://raw.githubusercontent.com/CinemaPress/CinemaPlayer/master/example/simple-api-array.json)
  - DEMO [CinemaPlayer.github.io/example/simple-api-array.html](https://CinemaPlayer.github.io/example/simple-api-array.html)

### What parameters does the CinemaPlayer have?

- #### `data-cinemaplayer-id`

Example: [CinemaPlayer.github.io/example/data-cinemaplayer-id.html](https://CinemaPlayer.github.io/example/data-cinemaplayer-id.html)

```html
<a 
    href="javascript:void(0)" 
    data-cinemaplayer-id="show-cobra-episodes"
    data-cinemaplayer-api="https://CinemaPlayer.github.io/example/api-episodes.json"
>
    Open episodes
</a>
|
<a 
    href="javascript:void(0)" 
    data-cinemaplayer-id="show-cobra-trailer"
    data-cinemaplayer-api="https://CinemaPlayer.github.io/example/api-trailer.json"
>
    Open trailer
</a>
<div id="show-cobra-episodes"></div>
<div id="show-cobra-trailer"></div>
<script src="https://CinemaPlayer.github.io/cinemaplayer.js"></script>
```

- #### `data-cinemaplayer-id-active`

Example: [CinemaPlayer.github.io/example/data-cinemaplayer-id-active.html](https://CinemaPlayer.github.io/example/data-cinemaplayer-id-active.html)

```html
<a 
    href="javascript:void(0)" 
    data-cinemaplayer-id="show-cobra-episodes"
    data-cinemaplayer-api="https://CinemaPlayer.github.io/example/api-episodes.json"
>
    Open episodes
</a>
|
<a 
    href="javascript:void(0)" 
    data-cinemaplayer-id="show-cobra-trailer"
    data-cinemaplayer-id-active="show-cobra-trailer"
    data-cinemaplayer-api="https://CinemaPlayer.github.io/example/api-trailer.json"
>
    Open trailer
</a>
<div id="show-cobra-episodes"></div>
<div id="show-cobra-trailer"></div>
<script src="https://CinemaPlayer.github.io/cinemaplayer.js"></script>
```

- #### `data-cinemaplayer-loader-background-color`
- #### `data-cinemaplayer-loader-background-image`
- #### `data-cinemaplayer-loader-timeout`

Example: [CinemaPlayer.github.io/example/data-cinemaplayer-loader.html](https://CinemaPlayer.github.io/example/data-cinemaplayer-loader.html)

```html
<div 
    id="cinemaplayer"
    data-cinemaplayer-loader-background-color="black"
    data-cinemaplayer-loader-background-image="https://CinemaPlayer.github.io/images/loader.svg"
    data-cinemaplayer-loader-timeout="10"
    data-cinemaplayer-api="https://CinemaPlayer.github.io/example/api-object.json"
></div>
<script src="https://CinemaPlayer.github.io/cinemaplayer.js"></script>
```

- #### `data-cinemaplayer-play-color`

Example: [CinemaPlayer.github.io/example/data-cinemaplayer-play-color.html](https://CinemaPlayer.github.io/example/data-cinemaplayer-play-color.html)

```html
<div 
    id="cinemaplayer"
    data-cinemaplayer-play-color="red"
    data-cinemaplayer-api="https://CinemaPlayer.github.io/example/api-object.json"
></div>
<script src="https://CinemaPlayer.github.io/cinemaplayer.js"></script>
```

- #### `data-cinemaplayer-tabs-border-width`
- #### `data-cinemaplayer-tabs-border-color`
- #### `data-cinemaplayer-tabs-border-style`

Example: [CinemaPlayer.github.io/example/data-cinemaplayer-tabs-border.html](https://CinemaPlayer.github.io/example/data-cinemaplayer-tabs-border.html)

```html
<div 
    id="cinemaplayer"
    data-cinemaplayer-tabs-border-width="1"
    data-cinemaplayer-tabs-border-color="white"
    data-cinemaplayer-tabs-border-style="dotted"
    data-cinemaplayer-api="https://CinemaPlayer.github.io/example/api-object.json"
></div>
<script src="https://CinemaPlayer.github.io/cinemaplayer.js"></script>
```

- #### `data-cinemaplayer-tabs-event`

Example: [CinemaPlayer.github.io/example/data-cinemaplayer-tabs-event.html](https://CinemaPlayer.github.io/example/data-cinemaplayer-tabs-event.html)

```html
<div 
    id="cinemaplayer"
    data-cinemaplayer-tabs-event="click"
    data-cinemaplayer-api="https://CinemaPlayer.github.io/example/api-object.json"
></div>
<script src="https://CinemaPlayer.github.io/cinemaplayer.js"></script>
```

- #### `data-cinemaplayer-tabs-top`
- #### `data-cinemaplayer-tabs-right`
- #### `data-cinemaplayer-tabs-left`

Example: [CinemaPlayer.github.io/example/data-cinemaplayer-tabs-left.html](https://CinemaPlayer.github.io/example/data-cinemaplayer-tabs-left.html)

```html
<div 
    id="cinemaplayer"
    data-cinemaplayer-tabs-top="15px"
    data-cinemaplayer-tabs-left="15px"
    data-cinemaplayer-tabs-right=""
    data-cinemaplayer-api="https://CinemaPlayer.github.io/example/api-object.json"
></div>
<script src="https://CinemaPlayer.github.io/cinemaplayer.js"></script>
```

- #### `data-cinemaplayer-tabs-font-size`
- #### `data-cinemaplayer-tabs-width`
- #### `data-cinemaplayer-tabs-height`
- #### `data-cinemaplayer-tabs-color`
- #### `data-cinemaplayer-tabs-background`
- #### `data-cinemaplayer-tabs-item-background`
- #### `data-cinemaplayer-tabs-item-hover-background`
- #### `data-cinemaplayer-tabs-border-radius`
- #### `data-cinemaplayer-tabs-scrollbar-color`
- #### `data-cinemaplayer-tabs-arrow-close-color`
- #### `data-cinemaplayer-tabs-arrow-open-color`

Example: [CinemaPlayer.github.io/example/data-cinemaplayer-tabs.html](https://CinemaPlayer.github.io/example/data-cinemaplayer-tabs.html)

```html
<div 
    id="cinemaplayer"
    data-cinemaplayer-tabs-font-size="14px"
    data-cinemaplayer-tabs-width="150px"
    data-cinemaplayer-tabs-height="100px"
    data-cinemaplayer-tabs-color="#FFF"
    data-cinemaplayer-tabs-shadow="0 2px 2px rgba(0, 0, 0, .5)"
    data-cinemaplayer-tabs-background="teal"
    data-cinemaplayer-tabs-item-background="rgb(100,149,237)"
    data-cinemaplayer-tabs-item-hover-background="darkslategray"
    data-cinemaplayer-tabs-border-radius="0px"
    data-cinemaplayer-tabs-scrollbar-color="yellow"
    data-cinemaplayer-tabs-arrow-close-color="red"
    data-cinemaplayer-tabs-arrow-open-color="blue"
    data-cinemaplayer-api="https://CinemaPlayer.github.io/example/api-object.json"
></div>
<script src="https://CinemaPlayer.github.io/cinemaplayer.js"></script>
```

- #### `data-cinemaplayer-tabs-open-last`

Example: [CinemaPlayer.github.io/example/data-cinemaplayer-tabs-open-last.html](https://CinemaPlayer.github.io/example/data-cinemaplayer-tabs-open-last.html)

```html
<div 
    id="cinemaplayer"
    data-cinemaplayer-tabs-open-last="0"
    data-cinemaplayer-api="https://CinemaPlayer.github.io/example/api-object.json"
></div>
<script src="https://CinemaPlayer.github.io/cinemaplayer.js"></script>
```

- #### `data-cinemaplayer-tabs-google-font`

Example: [CinemaPlayer.github.io/example/data-cinemaplayer-tabs-google-font.html](https://CinemaPlayer.github.io/example/data-cinemaplayer-tabs-google-font.html)

Default: [fonts.google.com/specimen/Play](https://fonts.google.com/specimen/Play)

```html
<div 
    id="cinemaplayer"
    data-cinemaplayer-tabs-google-font="Balsamiq Sans"
    data-cinemaplayer-api="https://CinemaPlayer.github.io/example/api-object.json"
></div>
<script src="https://CinemaPlayer.github.io/cinemaplayer.js"></script>
```

- #### `data-cinemaplayer-background-color`
- #### `data-cinemaplayer-background-image`

```html
<div 
    id="cinemaplayer"
    data-cinemaplayer-background-color="#1a2035"
    data-cinemaplayer-background-image=""
    data-cinemaplayer-api="https://CinemaPlayer.github.io/example/api-object.json"
></div>
<script src="https://CinemaPlayer.github.io/cinemaplayer.js"></script>
```

- #### `data-cinemaplayer-tabs-unique`

```html
<div 
    id="cinemaplayer"
    data-cinemaplayer-tabs-unique="tt7221388"
    data-cinemaplayer-api="https://CinemaPlayer.github.io/example/api-object.json"
></div>
<script src="https://CinemaPlayer.github.io/cinemaplayer.js"></script>
```

- #### `data-cinemaplayer-query-api-*`

Add query to API: `https://CinemaPlayer.github.io/example/api-object.json?imdb_id=tt7221388`

```html
<div 
    id="cinemaplayer"
    data-cinemaplayer-query-api-imdb_id="tt7221388"
    data-cinemaplayer-api="https://CinemaPlayer.github.io/example/api-object.json"
></div>
<script src="https://CinemaPlayer.github.io/cinemaplayer.js"></script>
```

### What advanced API format for CinemaPlayer?

- #### Object API `main`

```json
{
  "api":{
    "tabs":[
      "trailers"
    ],
    "tab":{
      "trailers":{
        "selectors":[
          "t"
        ],
        "selector":{
          "t":{
            "options":[
              "en",
              "es",
              "ru",
              "it"
            ],
            "option":{
              "en":{
                "name":"English",
                "action": "LcDQqGJG8pA",
                "type": "youtube"
              },
              "es":{
                "name":"Español",
                "thumbnail": "https://img.youtube.com/vi/UzQGVBMkNaI/maxresdefault.jpg",
                "action": "https://www.youtube.com/embed/UzQGVBMkNaI?autoplay=1&rel=0",
                "type": "iframe"
              },
              "ru":{
                "name":"Русский",
                "action": "r5EOmNXGUCY",
                "type": "youtube"
              },
              "it":{
                "name":"Italiano",
                "action": "pqv-xSLRvFo",
                "type": "youtube"
              }
            }
          }
        }
      }
    }
  }
}
```

- #### Html API

```html
    <div
            id="cinemaplayer"

            data-api-tabs="trailers"

            data-api-tab-trailers-selectors="t"

            data-api-tab-trailers-selector-t-options="en es ru it"

            data-api-tab-trailers-selector-t-option-en-name="English"
            data-api-tab-trailers-selector-t-option-en-action="LcDQqGJG8pA"
            data-api-tab-trailers-selector-t-option-en-type="youtube"

            data-api-tab-trailers-selector-t-option-es-name="Español"
            data-api-tab-trailers-selector-t-option-es-thumbnail="https://img.youtube.com/vi/UzQGVBMkNaI/maxresdefault.jpg"
            data-api-tab-trailers-selector-t-option-es-action="https://www.youtube.com/embed/UzQGVBMkNaI?autoplay=1&rel=0"
            data-api-tab-trailers-selector-t-option-es-type="iframe"

            data-api-tab-trailers-selector-t-option-ru-name="Русский"
            data-api-tab-trailers-selector-t-option-ru-action="r5EOmNXGUCY"
            data-api-tab-trailers-selector-t-option-ru-type="youtube"

            data-api-tab-trailers-selector-t-option-it-name="Italiano"
            data-api-tab-trailers-selector-t-option-it-action="pqv-xSLRvFo"
            data-api-tab-trailers-selector-t-option-it-type="youtube"
    ></div>
```

- #### Array API

```json
{
  "api":[
    {
      "tab":"trailers",
      "selector":"t",
      "option":"en",
      "name":"English",
      "action":"LcDQqGJG8pA",
      "type":"youtube"
    },
    {
      "tab":"trailers",
      "selector":"t",
      "option":"es",
      "name":"Español",
      "thumbnail": "https://img.youtube.com/vi/UzQGVBMkNaI/maxresdefault.jpg",
      "action": "https://www.youtube.com/embed/UzQGVBMkNaI?autoplay=1&rel=0",
      "type": "iframe"
    },
    {
      "tab":"trailers",
      "selector":"t",
      "option":"ru",
      "name":"Русский",
      "action":"r5EOmNXGUCY",
      "type":"youtube"
    },
    {
      "tab":"trailers",
      "selector":"t",
      "option":"it",
      "name":"Italiano",
      "action":"pqv-xSLRvFo",
      "type":"youtube"
    }
  ]
}
```

- `tab` - unique tab key
- `selector` - unique selector key
- `option` - unique option key
- `name` - option name
- `action` - option action `youtube key`, `url`
- `type` - option type `youtube`, `iframe`, `link`
- `thumbnail` - option thumbnail `image url`

### What simple API format for CinemaPlayer?

- #### Simple API for episodes playlist

Example: [CinemaPlayer.github.io/example/simple-api-episodes.html](https://CinemaPlayer.github.io/example/simple-api-episodes.html)

```json
{
  "simple-api":[
    {
      "name":"YouTube",
      "season":"1",
      "episode":"1",
      "iframe":"https://www.youtube.com/embed/_rB36UGoP4Y?autoplay=1&rel=0",
      "image":"https://img.youtube.com/vi/_rB36UGoP4Y/maxresdefault.jpg"
    },
    {
      "name":"YouTube",
      "season":"1",
      "episode":"2",
      "iframe":"https://www.youtube.com/embed/1Aoc-cd9eYs?autoplay=1&rel=0",
      "image":"https://img.youtube.com/vi/1Aoc-cd9eYs/maxresdefault.jpg"
    },
    {
      "name":"YouTube",
      "season":"1",
      "episode":"3",
      "iframe":"https://www.youtube.com/embed/9z1nTwP2n0w?autoplay=1&rel=0",
      "image":"https://img.youtube.com/vi/9z1nTwP2n0w/maxresdefault.jpg"
    }
  ]
}
```

- #### Simple API for multiple sources

Example: [CinemaPlayer.github.io/example/simple-api-trailer.html](https://CinemaPlayer.github.io/example/simple-api-trailer.html)

```json
{
  "simple-api":[
    {
      "name":"English",
      "iframe":"https://www.youtube.com/embed/LcDQqGJG8pA?autoplay=1&rel=0",
      "image":"https://img.youtube.com/vi/LcDQqGJG8pA/maxresdefault.jpg"
    },
    {
      "name":"Español",
      "iframe":"https://www.youtube.com/embed/UzQGVBMkNaI?autoplay=1&rel=0",
      "image":"https://img.youtube.com/vi/UzQGVBMkNaI/maxresdefault.jpg"
    },
    {
      "name":"Русский",
      "iframe":"https://www.youtube.com/embed/r5EOmNXGUCY?autoplay=1&rel=0",
      "image":"https://img.youtube.com/vi/r5EOmNXGUCY/maxresdefault.jpg"
    },
    {
      "name":"Italiano",
      "iframe":"https://www.youtube.com/embed/pqv-xSLRvFo?autoplay=1&rel=0",
      "image":"https://img.youtube.com/vi/pqv-xSLRvFo/maxresdefault.jpg"
    }
  ]
}
```

- `name` - option name `string`
- `season` - option season `number`
- `episode` - option episode `number`
- `image` - option image `url`
- `iframe` - option iframe `url`
- `link` - option link `url`
- `youtube` - option youtube `youtube key`

## What other features does the CinemaPlayer have?

- ### Slider

  - API [/CinemaPress/CinemaPlayer/master/example/api-slider.json](https://raw.githubusercontent.com/CinemaPress/CinemaPlayer/master/example/api-slider.json)
  - DEMO [CinemaPlayer.github.io/example/api-slider.html](https://CinemaPlayer.github.io/example/api-slider.html)

```html
<div 
    id="cinemaplayer"
    data-cinemaplayer-slider-api="https://CinemaPlayer.github.io/example/api-slider.json"
></div>
<script src="https://CinemaPlayer.github.io/cinemaplayer.js"></script>
```

- ### List

  - API [/CinemaPress/CinemaPlayer/master/example/api-list.json](https://raw.githubusercontent.com/CinemaPress/CinemaPlayer/master/example/api-list.json)
  - DEMO [CinemaPlayer.github.io/example/api-list.html](https://CinemaPlayer.github.io/example/api-list.html)

```html
<div 
    id="cinemaplayer"
    data-cinemaplayer-list-background="#000"
    data-cinemaplayer-list-hover-background="#000"
    data-cinemaplayer-list-color="#fff"
    data-cinemaplayer-list-max="5"
    data-cinemaplayer-list-blank="true"
    data-cinemaplayer-list-google-font="Play"
    data-cinemaplayer-list-api="https://CinemaPlayer.github.io/example/api-list.json"
></div>
<script src="https://CinemaPlayer.github.io/cinemaplayer.js"></script>
```