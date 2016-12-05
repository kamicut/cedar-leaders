const choo = require('choo');
const html = require('choo/html');
const xhr = require('xhr');

const Map = require('./map')();
const List = require('./list')

const app = choo();

app.model({
  state: {
    coords: [33.888629, 35.495479],
    bios: []
  },
  effects: {
    getBios: (data, state, send, done) => {
      xhr({
        uri: 'leaders-bio.geojson',
        headers: {
          'Content-Type': 'application/json'
        }
      }, function (err, resp, body) {
        if (err) {
          throw new Error(err);
        }
        if (resp.statusCode >= 200 && resp.statusCode < 400) {
          send('receiveBios', JSON.parse(resp.body), done);
        } else {
          console.error(resp)
        }
      });
    }
  },
  reducers: {
    setCoords: (data, state) => {
      return { coords: data }
    },
    receiveBios: (data, state) => {
      return { bios: data }
    }
  }
});

const View = (state, prev, send) => {
  return html`
  <main onload=${() => send('getBios')}>
    ${List(state.bios)}
  </main>
  `
}

app.router((route) => [ 
	route('/', View)
])

const tree = app.start();
document.getElementById('map').appendChild(tree);
