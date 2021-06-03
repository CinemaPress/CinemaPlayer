var cinemaPlayerData = {};
var cinemaPlayerTimeout = 0;
var cinemaPlayerSave = (window && window.localStorage) || null;

function cinemaPlayerInit(elem) {
  var h, a, w, i, l, t, c, s, d = cinemaPlayerData;

  var cinemaPlayerId =
      elem && elem.getAttribute('data-cinemaplayer-id') ?
          elem.getAttribute('data-cinemaplayer-id') :
          'cinemaplayer';

  c = document.getElementById(cinemaPlayerId);
  if (!c) {
    return false;
  } else {
    c.innerHTML = '';
  }

  cinemaPlayerData.id = cinemaPlayerId;

  if (
      c.parentNode &&
      c.parentNode.tagName &&
      c.parentNode.tagName.toLowerCase() === 'body'
  ) {
    var body_head = document.head || document.getElementsByTagName('head')[0];
    var body_css = 'body{margin:0;padding:0;overflow:hidden}';
    var body_style = document.createElement('style');
    if (body_style.styleSheet) {
      body_style.type = 'text/css';
      body_style.styleSheet.cssText = body_css;
    } else {
      body_style.appendChild(document.createTextNode(body_css));
    }
    body_head.appendChild(body_style);
  }

  window.addEventListener('orientationchange', cinemaPlayerOrientation, false);
  window.addEventListener('resize', cinemaPlayerOrientation, false);

  cinemaPlayerAttr([
    {
      "name":"data-cinemaplayer-id",
      "value":"cinemaplayer"
    },
    {
      "name":"data-cinemaplayer-loader-background-color",
      "value":"#1a2035"
    },
    {
      "name":"data-cinemaplayer-loader-background-image",
      "value":"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBzdHlsZT0ibWFyZ2luOiBhdXRvOyBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDApIG5vbmUgcmVwZWF0IHNjcm9sbCAwJSAwJTsgZGlzcGxheTogYmxvY2s7IHNoYXBlLXJlbmRlcmluZzogYXV0bzsiIHdpZHRoPSIyMDBweCIgaGVpZ2h0PSIyMDBweCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIj4KPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTAgNTApIj4KICA8ZyB0cmFuc2Zvcm09InNjYWxlKDAuOCkiPgogICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTUwIC01MCkiPgogICAgICA8Zz4KICAgICAgICA8YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InRyYW5zbGF0ZSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGR1cj0iMXMiIHZhbHVlcz0iLTIwIC0yMDsyMCAtMjA7MCAyMDstMjAgLTIwIiBrZXlUaW1lcz0iMDswLjMzOzAuNjY7MSI+PC9hbmltYXRlVHJhbnNmb3JtPgogICAgICAgIDxwYXRoIGZpbGw9IiMzMDcxN2QiIGQ9Ik00NC4xOSAyNi4xNThjLTQuODE3IDAtOS4zNDUgMS44NzYtMTIuNzUxIDUuMjgyYy0zLjQwNiAzLjQwNi01LjI4MiA3LjkzNC01LjI4MiAxMi43NTEgYzAgNC44MTcgMS44NzYgOS4zNDUgNS4yODIgMTIuNzUxYzMuNDA2IDMuNDA2IDcuOTM0IDUuMjgyIDEyLjc1MSA1LjI4MnM5LjM0NS0xLjg3NiAxMi43NTEtNS4yODIgYzMuNDA2LTMuNDA2IDUuMjgyLTcuOTM0IDUuMjgyLTEyLjc1MWMwLTQuODE3LTEuODc2LTkuMzQ1LTUuMjgyLTEyLjc1MUM1My41MzYgMjguMDMzIDQ5LjAwNyAyNi4xNTggNDQuMTkgMjYuMTU4eiI+PC9wYXRoPgogICAgICAgIDxwYXRoIGZpbGw9IiMwODQ4NTUiIGQ9Ik03OC43MTIgNzIuNDkyTDY3LjU5MyA2MS4zNzNsLTMuNDc1LTMuNDc1YzEuNjIxLTIuMzUyIDIuNzc5LTQuOTI2IDMuNDc1LTcuNTk2YzEuMDQ0LTQuMDA4IDEuMDQ0LTguMjMgMC0xMi4yMzggYy0xLjA0OC00LjAyMi0zLjE0Ni03LjgyNy02LjI5Ny0xMC45NzlDNTYuNTcyIDIyLjM2MiA1MC4zODEgMjAgNDQuMTkgMjBDMzggMjAgMzEuODA5IDIyLjM2MiAyNy4wODUgMjcuMDg1IGMtOS40NDcgOS40NDctOS40NDcgMjQuNzYzIDAgMzQuMjFDMzEuODA5IDY2LjAxOSAzOCA2OC4zODEgNDQuMTkgNjguMzgxYzQuNzk4IDAgOS41OTMtMS40MjUgMTMuNzA4LTQuMjYybDkuNjk1IDkuNjk1IGw0Ljg5OSA0Ljg5OUM3My4zNTEgNzkuNTcxIDc0LjQ3NiA4MCA3NS42MDIgODBzMi4yNTEtMC40MjkgMy4xMS0xLjI4OEM4MC40MjkgNzYuOTk0IDgwLjQyOSA3NC4yMDkgNzguNzEyIDcyLjQ5MnogTTU2Ljk0MiA1Ni45NDIgYy0zLjQwNiAzLjQwNi03LjkzNCA1LjI4Mi0xMi43NTEgNS4yODJzLTkuMzQ1LTEuODc2LTEyLjc1MS01LjI4MmMtMy40MDYtMy40MDYtNS4yODItNy45MzQtNS4yODItMTIuNzUxIGMwLTQuODE3IDEuODc2LTkuMzQ1IDUuMjgyLTEyLjc1MWMzLjQwNi0zLjQwNiA3LjkzNC01LjI4MiAxMi43NTEtNS4yODJjNC44MTcgMCA5LjM0NSAxLjg3NiAxMi43NTEgNS4yODIgYzMuNDA2IDMuNDA2IDUuMjgyIDcuOTM0IDUuMjgyIDEyLjc1MUM2Mi4yMjMgNDkuMDA3IDYwLjM0NyA1My41MzYgNTYuOTQyIDU2Ljk0MnoiPjwvcGF0aD4KICAgICAgPC9nPgogICAgPC9nPgogIDwvZz4KPC9nPgo8IS0tIFtsZGlvXSBnZW5lcmF0ZWQgYnkgaHR0cHM6Ly9sb2FkaW5nLmlvLyAtLT48L3N2Zz4="
    },
    {
      "name":"data-cinemaplayer-loader-timeout",
      "value":"0"
    },
    {
      "name":"data-cinemaplayer-loader-display",
      "value":"block"
    },
    {
      "name":"data-cinemaplayer-play-color",
      "value":"#1a2035"
    },
    {
      "name":"data-cinemaplayer-play-border-radius",
      "value":"10px"
    },
    {
      "name":"data-cinemaplayer-play-padding",
      "value":"25px 50px"
    },
    {
      "name":"data-cinemaplayer-tabs-unique",
      "value":((window && window.location && window.location.pathname) || "") + cinemaPlayerData.id
    },
    {
      "name":"data-cinemaplayer-tabs-google-font",
      "value":"Play"
    },
    {
      "name":"data-cinemaplayer-tabs-border-width",
      "value":"0"
    },
    {
      "name":"data-cinemaplayer-tabs-border-color",
      "value":"#1a2035"
    },
    {
      "name":"data-cinemaplayer-tabs-border-style",
      "value":"dotted"
    },
    {
      "name":"data-cinemaplayer-tabs-event",
      "value":"click"
    },
    {
      "name":"data-cinemaplayer-tabs-top",
      "value":"15px"
    },
    {
      "name":"data-cinemaplayer-tabs-right",
      "value":"15px"
    },
    {
      "name":"data-cinemaplayer-tabs-left",
      "value":""
    },
    {
      "name":"data-cinemaplayer-tabs-color",
      "value":"#FFF"
    },
    {
      "name":"data-cinemaplayer-tabs-shadow",
      "value":"0 2px 2px rgba(0, 0, 0, .5)"
    },
    {
      "name":"data-cinemaplayer-tabs-font-size",
      "value":"14px"
    },
    {
      "name":"data-cinemaplayer-tabs-scrollbar-color",
      "value":"#000"
    },
    {
      "name":"data-cinemaplayer-tabs-background",
      "value":"rgba(26, 32, 53, .9)"
    },
    {
      "name":"data-cinemaplayer-tabs-item-background",
      "value":"rgba(26, 32, 53, .8)"
    },
    {
      "name":"data-cinemaplayer-tabs-item-hover-background",
      "value":"rgba(26, 32, 53, .7)"
    },
    {
      "name":"data-cinemaplayer-tabs-border-radius",
      "value":"5px"
    },
    {
      "name":"data-cinemaplayer-tabs-open-last",
      "value":"5"
    },
    {
      "name":"data-cinemaplayer-tabs-width",
      "value":"130px"
    },
    {
      "name":"data-cinemaplayer-tabs-height",
      "value":"250px"
    },
    {
      "name":"data-cinemaplayer-tabs-arrow-close-color",
      "value":"#FFF"
    },
    {
      "name":"data-cinemaplayer-tabs-arrow-open-color",
      "value":"#CCC"
    },
    {
      "name":"data-cinemaplayer-tabs-mobile-width",
      "value":"33px"
    },
    {
      "name":"data-cinemaplayer-iframe-mobile-width",
      "value":"480px"
    },
    {
      "name":"data-cinemaplayer-background-color",
      "value":"#000"
    },
    {
      "name":"data-cinemaplayer-select-season",
      "value":""
    },
    {
      "name":"data-cinemaplayer-select-episode",
      "value":""
    }
  ]);

  var cinemaplayer = document.createElement('div');
  var attr = Array.prototype.slice.call(c.attributes);
  while ((a = attr.pop())) {
    cinemaplayer.setAttribute(a.nodeName, a.nodeValue);
  }
  cinemaplayer.innerHTML = c.innerHTML;
  c.parentNode.replaceChild(cinemaplayer, c);

  if (cinemaplayer && cinemaplayer.attributes) {
    cinemaPlayerAttr(cinemaplayer);
  }

  if (elem && elem.attributes) {
    cinemaPlayerAttr(elem);
  }

  var cinemaplayer_loader = document.querySelector('#cinemaplayer-loader');
  if (cinemaplayer_loader) {
    cinemaplayer_loader.parentNode.removeChild(cinemaplayer_loader);
  }
  var cinemaplayer_iframe = document.querySelector('#cinemaplayer-iframe');
  if (cinemaplayer_iframe) {
    cinemaplayer_iframe.parentNode.removeChild(cinemaplayer_iframe);
  }
  var cinemaplayerId = document.querySelectorAll('[data-cinemaplayer-id]');
  for (var ci in cinemaplayerId) {
    if (cinemaplayerId.hasOwnProperty(ci) && cinemaplayerId[ci]) {
      var cinemaplayerSelector = document.querySelector(
          '#' + cinemaplayerId[ci].getAttribute('data-cinemaplayer-id')
      );
      if (cinemaplayerSelector) {
        cinemaplayerSelector.removeAttribute('style');
      }
    }
  }

  var cinemaPlayerCss = '';
  var head = document.head || document.getElementsByTagName('head')[0];
  var simplebarJs = document.createElement('script');
  simplebarJs.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/simplebar/5.3.0/simplebar.min.js');
  head.appendChild(simplebarJs);
  var simplebarCss = document.createElement('link');
  simplebarCss.setAttribute('rel', 'stylesheet');
  simplebarCss.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/simplebar/5.3.0/simplebar.min.css');
  head.appendChild(simplebarCss);
  if (d['cinemaplayer']['tabs']['google']['font']) {
    var link1 = document.createElement('link');
    link1.setAttribute('rel', 'preconnect');
    link1.setAttribute('href', 'https://fonts.gstatic.com');
    var link2 = document.createElement('link');
    link2.setAttribute('rel', 'stylesheet');
    link2.setAttribute('href', 'https://fonts.googleapis.com/css2?family=' + d['cinemaplayer']['tabs']['google']['font'] + '&display=swap');
    head.appendChild(link1);
    head.appendChild(link2);
    cinemaPlayerCss += '' +
        '    #' + cinemaPlayerData.id + ' * {' +
        '        font-family: "' + d['cinemaplayer']['tabs']['google']['font'] + '", sans-serif;' +
        '    }';
  }
  cinemaPlayerCss += '' +
      '    #cinemaplayer-iframe {' +
      (d['cinemaplayer']['background']['color'] ? 'background-color: ' + d['cinemaplayer']['background']['color'] + ';' : '') +
      (d['cinemaplayer']['background']['image'] ? 'background-image: ' + d['cinemaplayer']['background']['image'] + ';' : '') +
      '        background-position: center;' +
      '        background-repeat: no-repeat;' +
      '        background-size: cover;' +
      '    }' +
      '' +
      '    #cinemaplayer-tabs {' +
      (d['cinemaplayer']['tabs']['top'] ? 'top: ' + d['cinemaplayer']['tabs']['top'] + ';' : '') +
      (d['cinemaplayer']['tabs']['right'] ? 'right: ' + d['cinemaplayer']['tabs']['right'] + ';' : '') +
      (d['cinemaplayer']['tabs']['left'] ? 'left: ' + d['cinemaplayer']['tabs']['left'] + ';' : '') +
      '        position: absolute;' +
      '        z-index: 1;' +
      '    }' +
      '' +
      '    #cinemaplayer-tabs>div {' +
      '        float: left;' +
      '        position: relative;' +
      '    }' +
      '' +
      '    .cinemaplayer-select {' +
      '        position: relative;' +
      '        margin-left: 5px;' +
      '        border-width: ' + d['cinemaplayer']['tabs']['border']['width'] + ';' +
      '        border-color: ' + d['cinemaplayer']['tabs']['border']['color'] + ';' +
      '        border-style: ' + d['cinemaplayer']['tabs']['border']['style'] + ';' +
      '        background: ' + d['cinemaplayer']['tabs']['background'] + ';' +
      '        border-radius: ' + d['cinemaplayer']['tabs']['border']['radius'] + ';' +
      '        color: ' + d['cinemaplayer']['tabs']['color'] + ';' +
      '        width: ' + d['cinemaplayer']['tabs']['width'] + ';' +
      '        max-width: ' + d['cinemaplayer']['tabs']['width'] + ';' +
      '        font-size: ' + d['cinemaplayer']['tabs']['font']['size'] + ';' +
      '        text-shadow: ' + d['cinemaplayer']['tabs']['shadow'] + ';' +
      '    }' +
      '' +
      '    .cinemaplayer-select select {' +
      '        display: none;' +
      '    }' +
      '' +
      '    .cinemaplayer-selected {' +
      '        background: 0 0;' +
      '    }' +
      '' +
      '    .cinemaplayer-selected:after {' +
      '        position: absolute;' +
      '        content: "";' +
      '        top: 14px;' +
      '        right: 0;' +
      '        width: 0;' +
      '        height: 0;' +
      '        border: 6px solid transparent;' +
      '        border-color: ' + d['cinemaplayer']['tabs']['arrow']['close']['color'] + ' transparent transparent transparent;' +
      '        margin-right: 10px;' +
      '    }' +
      '' +
      '    .cinemaplayer-selected.select-arrow-active:after {' +
      '        border-color: transparent transparent ' + d['cinemaplayer']['tabs']['arrow']['open']['color'] + ' transparent;' +
      '        top: 7px;' +
      '    }' +
      '' +
      '    .cinemaplayer-items .cinemaplayer-item-select,' +
      '    .cinemaplayer-selected {' +
      '        color: ' + d['cinemaplayer']['tabs']['color'] + ';' +
      '        padding: 8px;' +
      '        border: 1px solid transparent;' +
      '        cursor: pointer;' +
      '        font-size: 14px;' +
      '        user-select: none;' +
      '        text-align: center;' +
      '        line-height: normal;' +
      '    }' +
      '' +
      '    .cinemaplayer-selected {' +
      '        padding: 8px 20px 8px 8px;' +
      '    }' +
      '' +
      '    .cinemaplayer-items {' +
      '        position: absolute;' +
      '        background: 0 0;' +
      '        color: ' + d['cinemaplayer']['tabs']['color'] + ';' +
      '        top: 100%;' +
      '        left: 0;' +
      '        right: 0;' +
      '        max-height: ' + d['cinemaplayer']['tabs']['height'] + ';' +
      '        overflow-y: auto;' +
      '        z-index: 2;' +
      '        margin-top: 5px;' +
      '    }' +
      '' +
      '    .cinemaplayer-select-hide {' +
      '        display: none;' +
      '    }' +
      '' +
      '    .cinemaplayer-items {' +
      '        border-radius: ' + d['cinemaplayer']['tabs']['border']['radius'] + ';' +
      '        background-color: ' + d['cinemaplayer']['tabs']['item']['background'] + ';' +
      '    }' +
      '' +
      '    .cinemaplayer-items .cinemaplayer-item-select {' +
      '        color: ' + d['cinemaplayer']['tabs']['color'] + ';' +
      '        font-size: 12px;' +
      '        white-space: nowrap;' +
      '        text-overflow: ellipsis;' +
      '        overflow: hidden;' +
      '        text-align: left;' +
      '    }' +
      '' +
      '    .same-as-selected,' +
      '    .cinemaplayer-items .cinemaplayer-item-select:hover {' +
      '        opacity: 1;' +
      '        background-color: ' + d['cinemaplayer']['tabs']['item']['hover']['background'] + ';' +
      '    }' +
      '' +
      '    .cinemaplayer-selected {' +
      '        white-space: nowrap;' +
      '        text-overflow: ellipsis;' +
      '        overflow: hidden;' +
      '    }' +
      '' +
      '    #cinemaplayer-loader {' +
      '        z-index: 3;' +
      '        position: absolute;' +
      '        left: 0;' +
      '        top: 0;' +
      '        width: 100%;' +
      '        height: 100%;' +
      '        background-image: url("' + d['cinemaplayer']['loader']['background']['image'] + '");' +
      '        background-color: ' + d['cinemaplayer']['loader']['background']['color'] + ';' +
      '        background-repeat: no-repeat;' +
      '        background-position: 50% 50%;' +
      '    }' +
      '' +
      '    #cinemaplayer-thumbnail {' +
      '        display: none;' +
      '        background-position: center;' +
      '        background-repeat: no-repeat;' +
      '        background-size: cover;' +
      '        background-color: ' + d['cinemaplayer']['background']['color'] + ';' +
      '    }' +
      '    .cinemaplayer-thumbnail {' +
      '        position: absolute;' +
      '        z-index: 1;' +
      '        width: 100%;' +
      '        height: 100%;' +
      '    }' +
      '' +
      '    .cinemaplayer-thumbnail span {' +
      '        background: ' + d['cinemaplayer']['play']['color'] + ';' +
      '        display: inline-block;' +
      '        padding: ' + d['cinemaplayer']['play']['padding'] + ';' +
      '        position: absolute;' +
      '        border-radius: ' + d['cinemaplayer']['play']['border']['radius'] + ';' +
      '        opacity: .8;' +
      '        top: 50%;' +
      '        left: 50%;' +
      '        transform: translate(-50%, -50%);' +
      '    }' +
      '' +
      '    .cinemaplayer-thumbnail span:hover {' +
      '        opacity: 1;' +
      '        cursor: pointer;' +
      '    }' +
      '' +
      '    .cinemaplayer-thumbnail span:after {' +
      '        content: "";' +
      '        display: block;' +
      '        position: relative;' +
      '        left: 2px;' +
      '        width: 0;' +
      '        height: 0;' +
      '        opacity: .9;' +
      '        border-style: solid;' +
      '        border-width: 10px 0 10px 20px;' +
      '        border-color: transparent transparent transparent white;' +
      '    }' +
      '    .simplebar-scrollbar::before {' +
      '        background-color: ' + d['cinemaplayer']['tabs']['scrollbar']['color'] + ';' +
      '    }';
  s = document.createElement('style');
  if (s.styleSheet) {
    s.type = 'text/css';
    s.styleSheet.cssText = cinemaPlayerCss;
  } else {
    s.setAttribute('type', 'text/css');
    s.appendChild(document.createTextNode(cinemaPlayerCss));
  }
  head.appendChild(s);

  l = document.createElement('div');
  l.setAttribute('id', 'cinemaplayer-loader');
  if (d['cinemaplayer']['loader']['display'] && d['cinemaplayer']['loader']['display'] !== 'block') {
    l.style.display = d['cinemaplayer']['loader']['display'];
  }
  cinemaplayer.innerHTML = '';
  cinemaplayer.appendChild(l);

  t = document.createElement('div');
  t.setAttribute('id', 'cinemaplayer-thumbnail');
  t.setAttribute('class', 'cinemaplayer-thumbnail');
  var t_play = document.createElement('span');
  t.appendChild(t_play);
  cinemaplayer.appendChild(t);

  i = document.createElement('iframe');
  i.setAttribute('id', 'cinemaplayer-iframe');
  i.setAttribute('frameborder', '0');
  i.setAttribute('allowfullscreen', 'allowfullscreen');
  i.setAttribute('webkitallowfullscreen', 'webkitallowfullscreen');
  i.setAttribute('mozallowfullscreen', 'mozallowfullscreen');
  i.setAttribute('scrolling', 'no');
  cinemaplayer.appendChild(i);

  if (parseInt(cinemaplayer.offsetWidth || '0')) {
    w = parseInt(cinemaplayer.offsetWidth || '0');
  } else if (
      cinemaplayer.parentNode &&
      parseInt(cinemaplayer.parentNode.offsetWidth || '0')
  ) {
    w = parseInt(cinemaplayer.parentNode.offsetWidth || '0');
  } else {
    w = 610;
  }

  if (
      cinemaplayer.parentNode &&
      cinemaplayer.parentNode.tagName &&
      cinemaplayer.parentNode.tagName.toLowerCase() === 'body'
  ) {
    h = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
    );
  } else if (
      parseInt(cinemaplayer.offsetHeight || '0') &&
      parseInt(cinemaplayer.offsetHeight || '0') < 370
  ) {
    if (
        cinemaplayer.parentNode &&
        parseInt(cinemaplayer.parentNode.offsetHeight || '0') &&
        parseInt(cinemaplayer.parentNode.offsetHeight || '0') >= 370
    ) {
      h = parseInt(cinemaplayer.parentNode.offsetHeight || '0');
    } else {
      h = 370;
    }
  } else if (
      parseInt(cinemaplayer.offsetHeight || '0') &&
      w / 3 < parseInt(cinemaplayer.offsetHeight || '0')
  ) {
    h = parseInt(cinemaplayer.offsetHeight || '0');
  } else if (
      cinemaplayer.parentNode &&
      parseInt(cinemaplayer.parentNode.offsetHeight || '0') &&
      w / 3 < parseInt(cinemaplayer.parentNode.offsetHeight || '0')
  ) {
    h = parseInt(cinemaplayer.parentNode.offsetHeight || '0');
  } else {
    h = w / 2;
  }

  cinemaPlayerData['width'] = w;
  cinemaPlayerData['height'] = h;

  var styles = [];
  styles.push('width:' + w + 'px');
  styles.push('height:' + h + 'px');
  styles.push('border:0');
  styles.push('padding:0');
  styles.push('overflow:hidden');
  styles.push('position:relative');
  i.setAttribute('style', styles.join(';'));
  i.setAttribute('width', w);
  i.setAttribute('height', h);

  cinemaplayer.setAttribute('style', styles.join(';'));

  var selected = cinemaPlayerSave && d['cinemaplayer']['tabs']['unique']
      ? JSON.parse(cinemaPlayerSave.getItem(d['cinemaplayer']['tabs']['unique']) || '{}')
      : {};

  if (
      d['cinemaplayer']['select'] &&
      d['cinemaplayer']['select']['season'] &&
      d['cinemaplayer']['select']['episode'] &&
      d['cinemaplayer']['select']['season'].replace(/[^0-9]/i, '') &&
      d['cinemaplayer']['select']['episode'].replace(/[^0-9]/i, '')
  ) {
    selected = {
      tab: 'episodes',
      active: 's' + d['cinemaplayer']['select']['season'].replace(/[^0-9]/i, ''),
      selected: 's' + d['cinemaplayer']['select']['season'].replace(/[^0-9]/i, '') +
          'e' + d['cinemaplayer']['select']['episode'].replace(/[^0-9]/i, '')
    };
  }

  if (d['cinemaplayer']['api']) {
    if (
        d['cinemaplayer']['query'] &&
        d['cinemaplayer']['query']['api'] &&
        Object.keys(d['cinemaplayer']['query']['api']) &&
        Object.keys(d['cinemaplayer']['query']['api']).length
    ) {
      Object.keys(d['cinemaplayer']['query']['api']).forEach(function(k) {
        d['cinemaplayer']['api'] += (d['cinemaplayer']['api'].indexOf('?') + 1 ? '&' : '?') +
            k.replace(/~/g,'-') + '=' + encodeURIComponent(d['cinemaplayer']['query']['api'][k]);
      });
    }
    cinemaPlayerRequest(d['cinemaplayer']['api'], function(response) {
      cinemaPlayerApiFormat(response);
      if (cinemaPlayerData && cinemaPlayerData.api) {
        cinemaPlayerTab(selected);
        setTimeout(function () {
          l.style.display = 'none';
        }, parseInt(d['cinemaplayer']['loader']['timeout']||'0')*1000);
      }
    });
  } else {
    cinemaPlayerApiFormat();
    if (cinemaPlayerData && cinemaPlayerData.api) {
      cinemaPlayerTab(selected);
      setTimeout(function () {
        l.style.display = 'none';
      }, parseInt(d['cinemaplayer']['loader']['timeout']||'0')*1000);
    }
  }
}

function cinemaPlayerTab(selected) {
  var cinemaplayer = document.getElementById(cinemaPlayerData.id);
  if (!cinemaPlayerData.api) return;
  if (!cinemaPlayerData.api.tab) return;
  if (!cinemaPlayerData.api.tabs) {
    cinemaPlayerData.api.tabs = Object.keys(cinemaPlayerData.api.tab).filter(function(item, pos, self) {
      return self.indexOf(item) === pos;
    }).sort(function(a, b) {
      return Object.keys(cinemaPlayerData.api.tab[a].selector).length > Object.keys(cinemaPlayerData.api.tab[b].selector).length ? 1 : -1;
    });
  }
  var prev_selector = '';
  var next_selector = '';
  var tabs = cinemaPlayerKeys(cinemaPlayerData.api.tabs);
  if (selected && selected.tab && selected.selected) {
    if (cinemaPlayerSave && cinemaPlayerData['cinemaplayer']['tabs']['unique']) {
      cinemaPlayerSave.setItem(cinemaPlayerData['cinemaplayer']['tabs']['unique'], JSON.stringify(selected));
    }
    var t = false;
    tabs.forEach(function(tab) {
      if (selected.tab === tab) {
        t = true;
      }
      if (t && cinemaPlayerData.api.tab[tab]) {
        delete cinemaPlayerData.api.tab[tab].active;
        delete cinemaPlayerData.api.tab[tab].selected;
      }
    });
    if (
        cinemaPlayerData.api.tab[selected.tab] &&
        cinemaPlayerData.api.tab[selected.tab].selector &&
        cinemaPlayerData.api.tab[selected.tab].selector[selected.active] &&
        cinemaPlayerData.api.tab[selected.tab].selector[selected.active].option &&
        cinemaPlayerData.api.tab[selected.tab].selector[selected.active].option[selected.selected]
    ) {
      cinemaPlayerData.api.tab[selected.tab].active = selected.active;
      cinemaPlayerData.api.tab[selected.tab].selected = selected.selected;
    }
  }
  tabs.forEach(function(tab) {
    if (
        !cinemaPlayerData.api.tab[tab] ||
        !cinemaPlayerData.api.tab[tab].selector
    ) {
      return;
    }
    if (cinemaPlayerData.api.tab[tab].selected) {
      next_selector = cinemaPlayerData.api.tab[tab].selected.toLowerCase();
    }
    delete cinemaPlayerData.api.tab[tab].active;
    delete cinemaPlayerData.api.tab[tab].selected;
    if (
        next_selector
    ) {
      if (
          cinemaPlayerData.api.tab[tab].selector[next_selector] &&
          cinemaPlayerData.api.tab[tab].selector[next_selector].options
      ) {
        var options = cinemaPlayerKeys(cinemaPlayerData.api.tab[tab].selector[next_selector].options);
        next_selector = options[0];
      }
      cinemaPlayerData.api.tab[tab].selected = next_selector.toLowerCase();
    }
  });
  tabs.slice().reverse().forEach(function(tab) {
    if (
        !cinemaPlayerData.api.tab[tab] ||
        !cinemaPlayerData.api.tab[tab].selector
    ) {
      return;
    } else if (!cinemaPlayerData.api.tab[tab].selectors) {
      cinemaPlayerData.api.tab[tab].selectors = Object.keys(cinemaPlayerData.api.tab[tab].selector).filter(function(item, pos, self) {
        return self.indexOf(item) === pos;
      });
    }
    var rev_selectors = cinemaPlayerKeys(cinemaPlayerData.api.tab[tab].selectors).sort();
    rev_selectors.forEach(function(selector) {
      if (
          !cinemaPlayerData.api.tab[tab].selector[selector] ||
          !cinemaPlayerData.api.tab[tab].selector[selector].options
      ) {
        return;
      }
      var options = tab === 'names'
          ? cinemaPlayerKeys(cinemaPlayerData.api.tab[tab].selector[selector].options)
          : cinemaPlayerKeys(cinemaPlayerData.api.tab[tab].selector[selector].options).sort();
      options.forEach(function(option) {
        if (!cinemaPlayerData.api.tab[tab].selected) {
          cinemaPlayerData.api.tab[tab].selected = prev_selector || option;
          if (!cinemaPlayerData.api.tab[tab].active) {
            cinemaPlayerData.api.tab[tab].active = selector;
          }
        }
        if (cinemaPlayerData.api.tab[tab].selected.toLowerCase() === option) {
          if (!cinemaPlayerData.api.tab[tab].active) {
            cinemaPlayerData.api.tab[tab].active = selector;
          }
          if (cinemaPlayerData.api.tab[tab].active.toLowerCase() === selector) {
            prev_selector = selector;
          }
        }
      });
    });
  });
  var tabs_element = document.createElement('div');
  tabs_element.setAttribute('id', 'cinemaplayer-tabs');
  tabs.forEach(function(tab) {
    var tab_element = document.createElement('div');
    tab_element.setAttribute('id', 'api-tab-' + tab);
    var selectors = cinemaPlayerKeys(cinemaPlayerData.api.tab[tab].selectors);
    selectors.forEach(function(selector) {
      if (
          cinemaPlayerData.api.tab[tab] && cinemaPlayerData.api.tab[tab].active &&
          cinemaPlayerData.api.tab[tab].active.toLowerCase() !== selector
      ) {
        return;
      }
      var custom_select = document.createElement('div');
      custom_select.setAttribute('class', 'cinemaplayer-select');
      var selector_element = document.createElement('select');
      selector_element.setAttribute('id', 'api-tab-' + tab + '-selector-' + selector);
      var options = cinemaPlayerKeys(cinemaPlayerData.api.tab[tab].selector[selector].options);
      options.forEach(function(option) {
        var opt = cinemaPlayerData.api.tab[tab].selector[selector].option || {};
        if (!opt[option]) opt[option] = {};
        if (!opt[option].action) opt[option].action = '';
        if (!opt[option].type) opt[option].type = '';
        if (!opt[option].thumbnail) opt[option].thumbnail = '';
        if (!opt[option].name) opt[option].name = option.toUpperCase();
        if (!cinemaPlayerData.api.tab[tab].selected) cinemaPlayerData.api.tab[tab].selected = option;
        var option_element = document.createElement('option');
        option_element.setAttribute('id', 'api-tab-' + tab + '-selector-' + selector + '-option-' + option);
        option_element.setAttribute('data-action', opt[option].action);
        option_element.setAttribute('data-type', opt[option].type);
        option_element.setAttribute('data-thumbnail', opt[option].thumbnail);
        option_element.setAttribute('data-tab', tab);
        option_element.setAttribute('data-active', selector);
        option_element.setAttribute('data-selected', option);
        option_element.appendChild(document.createTextNode(opt[option].name));
        if (
            cinemaPlayerData.api.tab[tab] && cinemaPlayerData.api.tab[tab].active &&
            cinemaPlayerData.api.tab[tab].active.toLowerCase() === selector &&
            cinemaPlayerData.api.tab[tab] && cinemaPlayerData.api.tab[tab].selected &&
            cinemaPlayerData.api.tab[tab].selected.toLowerCase() === option
        ) {
          option_element.setAttribute('selected', 'selected');
          cinemaPlayerAction(opt[option]);
        }
        if (opt[option].name.toUpperCase() !== 'HIDE') {
          selector_element.appendChild(option_element);
        }
      });
      selector_element.addEventListener('change', cinemaPlayerEvent, false);
      custom_select.appendChild(selector_element);
      tab_element.appendChild(custom_select);
    });
    tabs_element.appendChild(tab_element);
  });
  var elem = document.getElementById('cinemaplayer-tabs');
  if (elem) elem.parentNode.removeChild(elem);
  cinemaplayer.appendChild(tabs_element);
  cinemaPlayerSelect();
  document.addEventListener('click', cinemaPlayerCloseAllSelect);
}

function cinemaPlayerApiFormat(raw) {
  var cinemaPlayerObj = {};
  cinemaPlayerObj.api = {};
  try {
    var cinemaPlayerRaw = raw ? (typeof raw === 'object' ?
        Object.assign({}, raw) :
        JSON.parse(raw)) : (typeof cinemaPlayerData === 'object' ? cinemaPlayerData : {});
    if (typeof cinemaPlayerRaw === 'object' && typeof cinemaPlayerRaw.api === 'object') {
      if (Array.isArray(cinemaPlayerRaw.api)) {
        cinemaPlayerRaw.api.forEach(function(obj) {
          if (obj.tab) {
            obj.tab = obj.tab.toLowerCase();
          }
          if (obj.selector) {
            obj.selector = obj.selector.toLowerCase();
          }
          if (obj.option) {
            obj.option = obj.option.toLowerCase();
          }
          if (
              !cinemaPlayerObj.api.tab
          ) {
            cinemaPlayerObj.api.tab = {};
          }
          if (
              !cinemaPlayerObj.api.tabs && obj.tabs
          ) {
            cinemaPlayerObj.api.tabs = obj.tabs;
          }
          if (
              obj.tab &&
              !cinemaPlayerObj.api.tab[obj.tab]
          ) {
            cinemaPlayerObj.api.tab[obj.tab] = {};
          }
          if (
              obj.tab &&
              obj.selector
          ) {
            if (!cinemaPlayerObj.api.tab[obj.tab].selector) {
              cinemaPlayerObj.api.tab[obj.tab].selector = {};
            }
            if (!cinemaPlayerObj.api.tab[obj.tab].selector[obj.selector]) {
              cinemaPlayerObj.api.tab[obj.tab].selector[obj.selector] = {};
            }
          }
          if (
              obj.tab &&
              obj.selector &&
              obj.option
          ) {
            if (!cinemaPlayerObj.api.tab[obj.tab].selector[obj.selector].option) {
              cinemaPlayerObj.api.tab[obj.tab].selector[obj.selector].option = {};
            }
            if (!cinemaPlayerObj.api.tab[obj.tab].selector[obj.selector].option[obj.option]) {
              cinemaPlayerObj.api.tab[obj.tab].selector[obj.selector].option[obj.option] = {};
            }
            if (obj.name) {
              cinemaPlayerObj.api.tab[obj.tab].selector[obj.selector].option[obj.option].name = obj.name;
            }
            if (obj.action) {
              cinemaPlayerObj.api.tab[obj.tab].selector[obj.selector].option[obj.option].action = obj.action;
            }
            if (obj.type) {
              cinemaPlayerObj.api.tab[obj.tab].selector[obj.selector].option[obj.option].type = obj.type;
            }
          }
          if (
              obj.tab &&
              obj.selector &&
              obj.options
          ) {
            cinemaPlayerObj.api.tab[obj.tab].selector[obj.selector].options = obj.options;
          } else {
            cinemaPlayerObj.api.tab[obj.tab].selector[obj.selector].options = Object.keys(cinemaPlayerObj.api.tab[obj.tab].selector[obj.selector].option);
          }
        });
      } else {
        Object.keys(cinemaPlayerRaw.api.tab).forEach(function(tab) {
          var tab_low = tab.toLowerCase();
          if (!cinemaPlayerObj.api.tabs) {
            cinemaPlayerObj.api.tabs = [];
          }
          if (cinemaPlayerRaw.api.tabs) {
            cinemaPlayerObj.api.tabs = cinemaPlayerRaw.api.tabs;
          } else {
            cinemaPlayerObj.api.tabs.push(tab);
          }
          if (!cinemaPlayerObj.api.tab) {
            cinemaPlayerObj.api.tab = {};
          }
          if (!cinemaPlayerObj.api.tab[tab_low]) {
            cinemaPlayerObj.api.tab[tab_low] = {};
          }
          Object.keys(cinemaPlayerRaw.api.tab[tab].selector).forEach(function(selector) {
            var selector_low = selector.toLowerCase();
            if (!cinemaPlayerObj.api.tab[tab_low].selector) {
              cinemaPlayerObj.api.tab[tab_low].selector = {};
            }
            if (!cinemaPlayerObj.api.tab[tab_low].selector[selector_low]) {
              cinemaPlayerObj.api.tab[tab_low].selector[selector_low] = {};
            }
            Object.keys(cinemaPlayerRaw.api.tab[tab].selector[selector].option).forEach(function(option) {
              var option_low = option.toLowerCase();
              if (!cinemaPlayerObj.api.tab[tab_low].selector[selector_low].option) {
                cinemaPlayerObj.api.tab[tab_low].selector[selector_low].option = {};
              }
              if (!cinemaPlayerObj.api.tab[tab_low].selector[selector_low].option[option_low]) {
                cinemaPlayerObj.api.tab[tab_low].selector[selector_low].option[option_low] = cinemaPlayerRaw.api.tab[tab].selector[selector].option[option];
              }
              if (!cinemaPlayerObj.api.tab[tab_low].selector[selector_low].options) {
                cinemaPlayerObj.api.tab[tab_low].selector[selector_low].options = cinemaPlayerRaw.api.tab[tab].selector[selector].options || Object.keys(cinemaPlayerObj.api.tab[tab_low].selector[selector_low].option);
              }
            });
          });
        });
      }
    } else if (
        typeof cinemaPlayerRaw === 'object' &&
        typeof cinemaPlayerRaw['simple-api'] === 'object' &&
        Array.isArray(cinemaPlayerRaw['simple-api'])
    ) {
      cinemaPlayerObj.api.tabs = [];
      cinemaPlayerObj.api.tab = {};
      cinemaPlayerRaw['simple-api'].forEach(function(obj) {
        var tab, selector, option, param = {};
        var season = '', episode = '', name = '';
        if (obj['season'] && (obj['season'] + '').replace(/[^0-9]/g, '')) {
          season = (obj['season'] + '').replace(/[^0-9]/g, '');
        }
        if (obj['episode'] && (obj['episode'] + '').replace(/[^0-9]/g, '')) {
          episode = (obj['episode'] + '').replace(/[^0-9]/g, '');
        }
        if (obj['name']) {
          name = (obj['name'] + '');
        }
        if (!name) {
          if (cinemaPlayerRaw['simple-api'].length === 1) {
            name = 'hide';
          } else if (obj['iframe']) {
            var matches = obj['iframe'].match(/^https?:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
            name = (matches && matches[1]) || '';
          }
        }
        if (season) {
          param = {};
          param.name = obj['season-name'] ? obj['season-name'].replace('[N]', season) : 'Season ' + season;
          tab = 'seasons';
          selector = 's';
          option = selector + season;
          cinemaPlayerApiFormatStructure(cinemaPlayerObj, tab, selector, option, param);
        }
        if (episode) {
          param = {};
          param.name = obj['episode-name'] ? obj['episode-name'].replace('[N]', episode) : 'Episode ' + episode;
          tab = 'episodes';
          selector = 's' + season;
          option = selector + 'e' + episode;
          cinemaPlayerApiFormatStructure(cinemaPlayerObj, tab, selector, option, param);
        }
        if (name) {
          param = {};
          param.name = (name + '');
          if (obj['iframe']) {
            param.action = obj['iframe'];
            param.type = 'iframe';
          }
          else if (obj['link']) {
            param.action = obj['link'];
            param.type = 'link';
          }
          else if (obj['youtube']) {
            param.action = obj['youtube'];
            param.type = 'youtube';
          }
          if (obj['image']) {
            param.thumbnail = obj['image'];
          }
          tab = 'names';
          selector = 's' + season + 'e' + episode;
          option = selector + 'n' + cinemaPlayerHashCode(name);
          cinemaPlayerApiFormatStructure(cinemaPlayerObj, tab, selector, option, param);
        }
      });
    }
  } catch (e) {
    console.error(e);
  }
  cinemaPlayerData = Object.assign({}, cinemaPlayerData, cinemaPlayerObj);
  cinemaPlayerTimeout = parseInt(cinemaPlayerData['cinemaplayer']['tabs']['open']['last']);
}

function cinemaPlayerApiFormatStructure(cinemaPlayerObj, tab, selector, option, param) {
  if (cinemaPlayerObj.api.tabs.indexOf(tab) === -1) {
    cinemaPlayerObj.api.tabs.push(tab);
  }
  if (typeof cinemaPlayerObj.api.tab[tab] === 'undefined') {
    cinemaPlayerObj.api.tab[tab] = {};
  }
  if (typeof cinemaPlayerObj.api.tab[tab].selectors === 'undefined') {
    cinemaPlayerObj.api.tab[tab].selectors = [];
  }
  if (cinemaPlayerObj.api.tab[tab].selectors.indexOf(selector) === -1) {
    cinemaPlayerObj.api.tab[tab].selectors.push(selector);
  }
  if (typeof cinemaPlayerObj.api.tab[tab].selector === 'undefined') {
    cinemaPlayerObj.api.tab[tab].selector = {};
  }
  if (typeof cinemaPlayerObj.api.tab[tab].selector[selector] === 'undefined') {
    cinemaPlayerObj.api.tab[tab].selector[selector] = {};
  }
  if (typeof cinemaPlayerObj.api.tab[tab].selector[selector].options === 'undefined') {
    cinemaPlayerObj.api.tab[tab].selector[selector].options = [];
  }
  if (cinemaPlayerObj.api.tab[tab].selector[selector].options.indexOf(option) === -1) {
    cinemaPlayerObj.api.tab[tab].selector[selector].options.push(option);
  }
  if (typeof cinemaPlayerObj.api.tab[tab].selector[selector].option === 'undefined') {
    cinemaPlayerObj.api.tab[tab].selector[selector].option = {};
  }
  if (typeof cinemaPlayerObj.api.tab[tab].selector[selector].option[option] === 'undefined') {
    cinemaPlayerObj.api.tab[tab].selector[selector].option[option] = param;
  }
}

function cinemaPlayerAttr(elem) {
  [].slice.call(elem && elem.attributes || elem).reduce(function(o, a) {
    if (/^data-/i.test(a.name)) {
      var a_name = a.name + '';
      if (/^data-cinemaplayer-query-api-[a-z0-9_\-]+/i.test(a_name)) {
        a_name = 'data-cinemaplayer-query-api-' +
            a_name.replace(/^data-cinemaplayer-query-api-/i, '').replace(/-/g, '~');
      }
      cinemaPlayerPath(
          cinemaPlayerData,
          a_name
              .substr(5)
              .replace(/-/g, '.')
              .toLowerCase(),
          decodeURIComponent(a.value.replace(/%(?![0-9][0-9a-fA-F]+)/g, '%25'))
      );
    }
  }, {});
}

function cinemaPlayerKeys(keys) {
  if (typeof keys === 'string') {
    keys = keys.split(keys.indexOf(',') + 1 ? ',' : ' ');
  }
  return keys
      .map(function(key) {
        return key.trim().toLowerCase();
      })
      .filter(Boolean);
}

function cinemaPlayerEvent(self) {
  self = self || this;
  cinemaPlayerAction(self);
  cinemaPlayerTab(self.dataset);
}

function cinemaPlayerAction(self) {
  var opt = self.dataset || self;
  if (!opt) return;
  if (opt.action) {
    var iframe = document.getElementById('cinemaplayer-iframe');
    var thumbnail = document.querySelector('#cinemaplayer-thumbnail');
    if (opt.type && opt.type === 'youtube') {
      thumbnail.style.backgroundImage = 'url("https://img.youtube.com/vi/' + opt.action + '/maxresdefault.jpg")';
      thumbnail.style.display = 'block';
      if (iframe.src) iframe.src = '';
      thumbnail.addEventListener('click', function() {
        iframe.src = 'https://www.youtube-nocookie.com/embed/' + opt.action + '?autoplay=1&amp;rel=0';
        iframe.style.background = cinemaPlayerData['cinemaplayer']['background']['color'];
        thumbnail.style.display = 'none';
      });
    } else if (opt.thumbnail) {
      thumbnail.style.backgroundImage = 'url("' + opt.thumbnail + '")';
      thumbnail.style.display = 'block';
      if (iframe.src) iframe.src = '';
      thumbnail.addEventListener('click', function() {
        iframe.src = opt.action;
        iframe.style.background = cinemaPlayerData['cinemaplayer']['background']['color'];
        thumbnail.style.display = 'none';
      });
    } else if (opt.type && opt.type === 'link') {
      window.top.location.href = opt.action;
    } else {
      iframe.src = opt.action;
      iframe.style.background = cinemaPlayerData['cinemaplayer']['background']['color'];
      thumbnail.style.display = 'none';
    }
    cinemaPlayerCloseAllSelect();
  }
}

function cinemaPlayerSelect() {
  var x, i, j, l, ll, selElement, a, b, c;
  x = document.getElementsByClassName('cinemaplayer-select');
  l = x.length;
  for (i = 0; i < l; i++) {
    selElement = x[i].getElementsByTagName('select')[0];
    if (
        !selElement ||
        !selElement.options ||
        !selElement.options[selElement.selectedIndex] ||
        selElement.style.display === 'none'
    ) continue;
    ll = selElement.length;
    a = document.createElement('div');
    a.setAttribute('class', 'cinemaplayer-selected');
    a.innerHTML = selElement.options[selElement.selectedIndex].innerHTML;
    x[i].appendChild(a);
    b = document.createElement('div');
    b.setAttribute('class', 'cinemaplayer-items cinemaplayer-select-hide');
    b.setAttribute('data-simplebar', '');
    b.setAttribute('data-simplebar-auto-hide', 'false');
    for (j = 0; j < ll; j++) {
      c = document.createElement('div');
      c.innerHTML = selElement.options[j].innerHTML;
      if (selElement.options[j].innerHTML.length > 13) {
        c.setAttribute('title', selElement.options[j].innerHTML);
      }
      if (selElement.options[j].selected) {
        c.setAttribute('class', 'cinemaplayer-item-select same-as-selected');
      } else {
        c.removeAttribute('class');
        c.setAttribute('class', 'cinemaplayer-item-select');
      }
      [].slice.call(selElement.options[j].attributes).forEach(function(a) {
        if (/^data-/i.test(a.name)) {
          c.setAttribute(a.name, a.value);
        }
      });
      if (cinemaPlayerTimeout) {
        c.addEventListener('mouseover', function(e) {
          cinemaPlayerTimeout = 0;
        });
      }
      c.addEventListener('click', function(e) {
        var y, i, k, s, h, sl, yl, d;
        var self = this;
        s = self.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByTagName('select')[0];
        sl = s.length;
        h = self.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML === self.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = self.innerHTML;
            y = self.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('same-as-selected');
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute('class');
            }
            this.setAttribute('class', 'same-as-selected');
            cinemaPlayerEvent(this);
            break;
          }
        }
        h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    function tabsEvent(e) {
      cinemaPlayerTimeout = 0;
      e.stopPropagation();
      cinemaPlayerCloseAllSelect(this);
      this.nextSibling.classList.toggle('cinemaplayer-select-hide');
      this.classList.toggle('select-arrow-active');
      this.style.color = cinemaPlayerData['cinemaplayer']['tabs']['color'];
      this.parentNode.style.width = cinemaPlayerData['cinemaplayer']['tabs']['width'];
    }
    [cinemaPlayerData['cinemaplayer']['tabs']['event'] === 'click'
        ? ''
        : cinemaPlayerData['cinemaplayer']['tabs']['event'],
      'click'
    ].filter(Boolean).forEach( function(evt) {
      a.addEventListener(evt, tabsEvent, false);
    });
    if (i === l - 1 && ll <= 1) {
      cinemaPlayerTimeout = 0;
    }
    if (i === l - 1 && cinemaPlayerTimeout) {
      cinemaPlayerCloseAllSelect(a);
      a.nextSibling.classList.toggle('cinemaplayer-select-hide');
      a.classList.toggle('select-arrow-active');
      setTimeout(function() {
        if (cinemaPlayerTimeout) {
          cinemaPlayerCloseAllSelect();
        }
      }, parseInt(cinemaPlayerData['cinemaplayer']['tabs']['open']['last']) * 1000);
    } else {
      cinemaPlayerCloseAllSelect();
    }
  }
}

function cinemaPlayerCloseAllSelect(e) {
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName('cinemaplayer-items');
  y = document.getElementsByClassName('cinemaplayer-selected');
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (e && e === y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove('select-arrow-active');
      if (cinemaPlayerData['cinemaplayer']['tabs']['mobile']['width']) {
        if (cinemaPlayerData['width'] && cinemaPlayerData['width'] < parseInt(cinemaPlayerData['cinemaplayer']['iframe']['mobile']['width'])) {
          y[i].style.color = cinemaPlayerData['cinemaplayer']['tabs']['background'];
          y[i].parentNode.style.width = cinemaPlayerData['cinemaplayer']['tabs']['mobile']['width'];
        } else {
          y[i].style.color = cinemaPlayerData['cinemaplayer']['tabs']['color'];
          y[i].parentNode.style.width = cinemaPlayerData['cinemaplayer']['tabs']['width'];
        }
      }
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add('cinemaplayer-select-hide');
    }
  }
}

function cinemaPlayerOrientation() {
  var ci = document.querySelector('#cinemaplayer-iframe');
  if (
      !ci ||
      !ci.parentNode ||
      !ci.parentNode.parentNode ||
      !ci.parentNode.parentNode.offsetWidth
  ) {
    return;
  }
  var w = parseInt(ci.parentNode.parentNode.offsetWidth);
  if (ci.style) {
    ci.style.width = w + 'px';
  }
  if (ci.setAttribute) {
    ci.setAttribute('width', w.toString());
  }
  if (ci.parentNode && ci.parentNode.style) {
    ci.parentNode.style.width = w + 'px';
  }
  cinemaPlayerData['width'] = w;
  cinemaPlayerCloseAllSelect();
}

function cinemaPlayerRequest(url, callback) {
  var cinemaPlayerXMLHttpRequest = new XMLHttpRequest();
  cinemaPlayerXMLHttpRequest.open('GET', url);
  cinemaPlayerXMLHttpRequest.responseType = 'text';
  cinemaPlayerXMLHttpRequest.onload = function() {
    if (cinemaPlayerXMLHttpRequest.status === 200) {
      return callback(cinemaPlayerXMLHttpRequest.response);
    }
    callback();
  };
  cinemaPlayerXMLHttpRequest.send();
}

function cinemaPlayerPath(obj, is, value) {
  if (typeof is === 'string') {
    return cinemaPlayerPath(obj, is.split('.'), value);
  } else if (is.length === 1 && value !== undefined) {
    return obj[is[0]] = value;
  } else if (is.length === 0) {
    return obj;
  } else {
    if (!obj[is[0]]) {
      obj[is[0]] = {};
    }
    return cinemaPlayerPath(obj[is[0]], is.slice(1), value);
  }
}

function cinemaPlayerSliderInit(sliderContainer) {
  if (sliderContainer && sliderContainer.attributes && sliderContainer.getAttribute('data-cinemaplayer-slider-api')) {
    var dataCinemaplayerSliderApi = sliderContainer.getAttribute('data-cinemaplayer-slider-api');
    [].slice.call(sliderContainer.attributes).reduce(function(o, a) {
      if (/^data-cinemaplayer-slider-query-api-[a-z0-9_\-]+/i.test(a.name)) {
        dataCinemaplayerSliderApi += (dataCinemaplayerSliderApi.indexOf('?') + 1 ? '&' : '?') +
            a.name.replace('data-cinemaplayer-slider-query-api-', '') + '=' + encodeURIComponent(a.value);
      }
    }, {});
    sliderContainer.setAttribute('data-cinemaplayer-slider-api', dataCinemaplayerSliderApi);
  }
  var slideIndex = 1;
  cinemaPlayerRequest(sliderContainer.getAttribute('data-cinemaplayer-slider-api'), function(response) {
    var items = [];
    if (response) {
      try {
        items = (JSON.parse(response)).slider.items;
      } catch (e) {
        console.error(e);
      }
      if (items && items.length) {
        var head = document.head || document.getElementsByTagName('head')[0];
        var css = '' +
            '.cinemaplayer-slider-container {' +
            '  max-width: 100%;' +
            '  position: relative;' +
            '  margin: auto;' +
            '}' +
            '' +
            '.cinemaplayer-slider-container .cinemaplayer-slider-item img {' +
            '  object-fit: cover;' +
            '  width: 100%;' +
            '}' +
            '' +
            '.cinemaplayer-slider-prev,' +
            '.cinemaplayer-slider-next {' +
            '  cursor: pointer;' +
            '  position: absolute;' +
            '  top: 50%;' +
            '  width: auto;' +
            '  margin-top: -22px;' +
            '  padding: 16px;' +
            '  color: white;' +
            '  font-weight: bold;' +
            '  font-size: 18px;' +
            '  transition: 0.6s ease;' +
            '  border-radius: 0 3px 3px 0;' +
            '}' +
            '' +
            '.cinemaplayer-slider-prev {' +
            '  left: 0;' +
            '}' +
            '.cinemaplayer-slider-next {' +
            '  right: 0;' +
            '  border-radius: 3px 0 0 3px;' +
            '}' +
            '' +
            '.cinemaplayer-slider-prev:hover,' +
            '.cinemaplayer-slider-next:hover {' +
            '  background-color: rgba(0, 0, 0, 0.8);' +
            '}' +
            '' +
            '.cinemaplayer-slider-fade {' +
            '  -webkit-animation-name: fade;' +
            '  -webkit-animation-duration: 1.5s;' +
            '  animation-name: fade;' +
            '  animation-duration: 1.5s;' +
            '}' +
            '' +
            '@-webkit-keyframes fade {' +
            '  from {' +
            '    opacity: 0.4;' +
            '  }' +
            '  to {' +
            '    opacity: 1;' +
            '  }' +
            '}' +
            '' +
            '@keyframes fade {' +
            '  from {' +
            '    opacity: 0.4;' +
            '  }' +
            '  to {' +
            '    opacity: 1;' +
            '  }' +
            '}';
        var div = document.createElement('div');
        div.setAttribute('id', 'cinemaplayer-slider');
        div.setAttribute('class', 'cinemaplayer-slider-container');
        items.forEach(function (item) {
          var divItem = document.createElement('div');
          divItem.setAttribute('class', 'cinemaplayer-slider-item cinemaplayer-slider-item-fade');
          var divItemImg = document.createElement('img');
          divItemImg.src = item.image;
          divItem.appendChild(divItemImg);
          div.appendChild(divItem);
        });
        var aPrev = document.createElement('a');
        aPrev.setAttribute('class', 'cinemaplayer-slider-prev');
        aPrev.innerHTML = '&#10094;';
        aPrev.addEventListener('click', function () {
          plusSlides(-1);
        });
        div.appendChild(aPrev);
        var aNext = document.createElement('a');
        aNext.setAttribute('class', 'cinemaplayer-slider-next');
        aNext.innerHTML = '&#10095;';
        aNext.addEventListener('click', function () {
          plusSlides(1);
        });
        div.appendChild(aNext);
        sliderContainer.appendChild(div);
        var style = document.createElement('style');
        if (style.styleSheet) {
          style.type = 'text/css';
          style.styleSheet.cssText = css;
        } else {
          style.setAttribute('type', 'text/css');
          style.appendChild(document.createTextNode(css));
        }
        head.appendChild(style);
        showSlides(slideIndex);
      }
    }
  });
  function plusSlides(n) {
    showSlides(slideIndex += n);
  }
  function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName('cinemaplayer-slider-item');
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    slides[slideIndex - 1].style.display = 'block';
  }
}

function cinemaPlayerListInit(listContainer) {
  if (listContainer && listContainer.attributes && listContainer.getAttribute('data-cinemaplayer-list-api')) {
    var dataCinemaplayerListApi = listContainer.getAttribute('data-cinemaplayer-list-api');
    [].slice.call(listContainer.attributes).reduce(function(o, a) {
      if (/^data-cinemaplayer-list-query-api-[a-z0-9_\-]+/i.test(a.name)) {
        dataCinemaplayerListApi += (dataCinemaplayerListApi.indexOf('?') + 1 ? '&' : '?') +
            a.name.replace('data-cinemaplayer-list-query-api-', '') + '=' + encodeURIComponent(a.value);
      }
    }, {});
    listContainer.setAttribute('data-cinemaplayer-list-api', dataCinemaplayerListApi);
  }
  cinemaPlayerRequest(listContainer.getAttribute('data-cinemaplayer-list-api'), function(response) {
    var items = [];
    if (response) {
      try {
        items = (JSON.parse(response)).list.items;
      } catch (e) {
        console.error(e);
      }
      if (items && items.length) {
        var listBackground = listContainer.getAttribute('data-cinemaplayer-list-background') || '#000';
        var listHoverBackground = listContainer.getAttribute('data-cinemaplayer-list-hover-background') || '#000';
        var listColor = listContainer.getAttribute('data-cinemaplayer-list-color') || '#FFF';
        var listBtnColor = listContainer.getAttribute('data-cinemaplayer-list-btn-color') || '#111f05';
        var listGoogleFont = listContainer.getAttribute('data-cinemaplayer-list-google-font') || 'Play';
        var listMax = listContainer.getAttribute('data-cinemaplayer-list-max');
        var listBlank = listContainer.getAttribute('data-cinemaplayer-list-blank');
        if (listMax && parseInt(listMax)) {
          items = items.slice(0, parseInt(listMax));
        }
        var head = document.head || document.getElementsByTagName('head')[0];
        var css = '';
        if (listGoogleFont) {
          var link1 = document.createElement('link');
          link1.setAttribute('rel', 'preconnect');
          link1.setAttribute('href', 'https://fonts.gstatic.com');
          var link2 = document.createElement('link');
          link2.setAttribute('rel', 'stylesheet');
          link2.setAttribute('href', 'https://fonts.googleapis.com/css2?family=' + listGoogleFont + '&display=swap');
          head.appendChild(link1);
          head.appendChild(link2);
          css += '' +
              '    #cinemaplayer-list * {' +
              '        font-family: "' + listGoogleFont + '", sans-serif;' +
              '    }';
        }
        css += '' +
            '.cinemaplayer-list-container {' +
            '  background: ' + listBackground + ';' +
            '  color: ' + listColor + ';' +
            '  width: 100%;' +
            '  table-layout: fixed;' +
            '}' +
            '' +
            '.cinemaplayer-list-item {' +
            '  border: 0;' +
            '  opacity: .9;' +
            '}' +
            '.cinemaplayer-list-item:hover {' +
            '  border: 0;' +
            '  opacity: 1;' +
            '  background: ' + listHoverBackground + ';' +
            '}' +
            '.cinemaplayer-list-item-image {' +
            '  width: 50px;' +
            '}' +
            '.cinemaplayer-list-item-left {' +
            '  display: table-cell;' +
            '  vertical-align: middle;' +
            '  border: 0;' +
            '  width: 70px;' +
            '  text-align: left;' +
            '  line-height: 0;' +
            '}' +
            '.cinemaplayer-list-item-center {' +
            '  display: table-cell;' +
            '  vertical-align: middle;' +
            '  border: 0;' +
            '}' +
            '.cinemaplayer-list-item-right {' +
            '  display: table-cell;' +
            '  vertical-align: middle;' +
            '  border: 0;' +
            '  width: 25%;' +
            '  text-align: right;' +
            '  padding-right: 5px;' +
            '}' +
            '.cinemaplayer-list-item-title {' +
            '  display: block;' +
            '  text-align: left;' +
            '  white-space: nowrap;' +
            '  text-overflow: ellipsis;' +
            '  overflow: hidden;' +
            '}' +
            '.cinemaplayer-list-item-description {' +
            '  display: block;' +
            '  text-align: left;' +
            '  opacity: .7;' +
            '  margin: 5px 0;' +
            '  white-space: nowrap;' +
            '  text-overflow: ellipsis;' +
            '  overflow: hidden;' +
            '}' +
            '' +
            '.cinemaplayer-list-item-badge {' +
            '  cursor: pointer;' +
            '  outline: none;' +
            '  border: none;' +
            '  color: #fff;' +
            '  background-size: 100% 100%;' +
            '  padding: 10px;' +
            '  border-radius: 3px;' +
            '  text-decoration: none;' +
            '  background-image: linear-gradient( 145deg, transparent 10%, ' + listBtnColor + ' 10% 20%, transparent 20% 30%, ' + listBtnColor + ' 30% 40%, transparent 40% 50%, ' + listBtnColor + ' 50% 60%, transparent 60% 70%, ' + listBtnColor + ' 70% 80%, transparent 80% 90%, ' + listBtnColor + ' 90% 100% );' +
            '  font-weight: bold;' +
            '  opacity: .9;' +
            '  text-shadow: 0 2px 2px rgb(0, 0, 0);' +
            '}' +
            '.cinemaplayer-list-item-badge:hover {' +
            '  animation: background 10s linear infinite;' +
            '  opacity: 1;' +
            '}' +
            '@keyframes background {' +
            '  0% {' +
            '    background-position: 0 0;' +
            '  }' +
            '  100% {' +
            '    background-position: 400px 0;' +
            '  }' +
            '}';
        var style = document.createElement('style');
        if (style.styleSheet) {
          style.type = 'text/css';
          style.styleSheet.cssText = css;
        } else {
          style.setAttribute('type', 'text/css');
          style.appendChild(document.createTextNode(css));
        }
        head.appendChild(style);
        var table = document.createElement('table');
        table.setAttribute('id', 'cinemaplayer-list');
        table.setAttribute('class', 'cinemaplayer-list-container');
        table.setAttribute('cellspacing', '0');
        table.setAttribute('cellpadding', '0');
        items.forEach(function (item) {
          var trItem = document.createElement('tr');
          trItem.setAttribute('class', 'cinemaplayer-list-item');
          var tdLeft = document.createElement('td');
          tdLeft.setAttribute('class', 'cinemaplayer-list-item-left');
          var tdItemImg = document.createElement('img');
          tdItemImg.setAttribute('class', 'cinemaplayer-list-item-image');
          tdItemImg.src = item.image || '';
          tdLeft.appendChild(tdItemImg);
          trItem.appendChild(tdLeft);
          var tdCenter = document.createElement('td');
          tdCenter.setAttribute('class', 'cinemaplayer-list-item-center');
          var tdItemTitle = document.createElement('span');
          tdItemTitle.setAttribute('class', 'cinemaplayer-list-item-title');
          tdItemTitle.innerHTML = item.title || '';
          var tdItemDescription = document.createElement('small');
          tdItemDescription.setAttribute('class', 'cinemaplayer-list-item-description');
          tdItemDescription.innerHTML = item.description || '';
          tdCenter.appendChild(tdItemTitle);
          tdCenter.appendChild(tdItemDescription);
          trItem.appendChild(tdCenter);
          var tdRight = document.createElement('td');
          tdRight.setAttribute('class', 'cinemaplayer-list-item-right');
          var tdItemBadge = document.createElement('a');
          tdItemBadge.setAttribute('class', 'cinemaplayer-list-item-badge');
          tdItemBadge.href = item.link || '';
          tdItemBadge.innerHTML = item.badge || '';
          if (listBlank) { tdItemBadge.setAttribute('target', '_blank'); }
          tdRight.appendChild(tdItemBadge);
          trItem.appendChild(tdRight);
          table.appendChild(trItem);
        });
        listContainer.appendChild(table);
      }
    }
  });
}

function cinemaPlayerHashCode(str) {
  var hash = 0, i, char;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    char = str.charCodeAt(i);
    hash = ((hash<<5)-hash)+char;
    hash = hash & hash;
  }
  return hash;
}

(function() {
  var cinemaPlayerId = document.querySelectorAll('[data-cinemaplayer-id]');
  var cinemaPlayerIdActive = document.querySelector('[data-cinemaplayer-id-active]');
  if (cinemaPlayerId && cinemaPlayerId.length) {
    for (var i in cinemaPlayerId) {
      if (cinemaPlayerId.hasOwnProperty(i) && cinemaPlayerId[i]) {
        cinemaPlayerId[i].addEventListener('click', function() {
          cinemaPlayerData = {};
          cinemaPlayerTimeout = 0;
          cinemaPlayerSave = (window && window.localStorage) || null;
          for (var i in cinemaPlayerId) {
            if (cinemaPlayerId.hasOwnProperty(i) && cinemaPlayerId[i]) {
              document.getElementById(cinemaPlayerId[i].getAttribute('data-cinemaplayer-id')).innerHTML = '';
            }
          }
          cinemaPlayerInit(this);
        });
      }
    }
    if (cinemaPlayerIdActive) {
      cinemaPlayerData = {};
      cinemaPlayerTimeout = 0;
      cinemaPlayerSave = (window && window.localStorage) || null;
      cinemaPlayerInit(cinemaPlayerIdActive);
    }
  } else {
    var cinemaplayerSlider = document.querySelector('[data-cinemaplayer-slider-api]');
    var cinemaplayerList = document.querySelector('[data-cinemaplayer-list-api]');
    if (cinemaplayerSlider) {
      cinemaPlayerSliderInit(cinemaplayerSlider);
    } else if (cinemaplayerList) {
      cinemaPlayerListInit(cinemaplayerList);
    } else {
      cinemaPlayerInit();
    }
  }
})();