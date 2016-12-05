const choo = require('choo');
const html = require('choo/html');
const cardView = require('./card.js');

const listView = (cards) => {
  if (typeof cards !== undefined && cards.length > 0) {
    const cardList = cards.map((card) => {
      return cardView(card);
    });

    return html`
    <ul>
        ${cardList}
    </ul>
  `

  } else {
    return html`<ul></ul>`
  
  }
}

module.exports = listView;
