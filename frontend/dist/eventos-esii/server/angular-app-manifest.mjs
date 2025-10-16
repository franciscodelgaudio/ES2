
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/home"
  },
  {
    "renderMode": 2,
    "route": "/registration"
  },
  {
    "renderMode": 2,
    "route": "/login"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 719, hash: 'b18661b801e9d3e625a13ea91138049b725ea533caa94f71321da2c2db7ff973', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 959, hash: '16971ade3077b199259e8080610b7712cd904229899cfc1fbf2a0ac1817a3777', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 12746, hash: 'c00bd4a601fc932355cb5cce6c2e39491cda1279fcda1403a55ad58671ab46a7', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'home/index.html': {size: 12746, hash: 'c00bd4a601fc932355cb5cce6c2e39491cda1279fcda1403a55ad58671ab46a7', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 10350, hash: '686ebf863ba291ce369a85d3ced1534e8da642db15abf736bb7a2dc070932010', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'registration/index.html': {size: 12644, hash: '033f02d0ee879036bfbaef73aa9053704350d5265e807f06917748af05ea59a4', text: () => import('./assets-chunks/registration_index_html.mjs').then(m => m.default)},
    'styles-TXFOVIYN.css': {size: 148, hash: 'WBIZGul+/fc', text: () => import('./assets-chunks/styles-TXFOVIYN_css.mjs').then(m => m.default)}
  },
};
