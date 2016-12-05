const choo = require('choo');
const html = require('choo/html');

const Map = require('./map')();

const app = choo();

app.model({
  state: {
    coords: [33.888629, 35.495479]
  },
  reducers: {
    setCoords: (data, state) => {
      return { coords: data }
    }
  }
});

const View = (state, prev, send) => {
  return html`
  <main>
    ${Map(state.coords)}
  </main>
  `
}

app.router((route) => [ 
	route('/', View)
])

const tree = app.start();
document.getElementById('map').appendChild(tree);
