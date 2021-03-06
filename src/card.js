const choo = require('choo');
const html = require('choo/html');

module.exports = function (cardData) {
  let quote = null;
  if (cardData.quote.length > 0) {
    quote = `"${cardData.quote}"`;
  }
  return html`
     <li class="w-30-ns w-80-m w-100 dib list v-top ma2 pa3 br3 bg-white ba b--black-10">
       <div class="tc w-100 db">
         <img src="/assets/images/${cardData.id}.jpg" />
         <h1 class="f4 ttu">${cardData.name}</h1>
         <h4 class="center mw3 bb bw1 b--black-10">
       </div>
     <p class="lh-copy"><strong>Category:</strong> ${cardData.category}</p>
     <p class="lh-copy i">${quote}</p>
     <p class="lh-copy"><strong>Bio: </strong>${cardData.bio}</p>
     <p class="lh-copy"><strong>Region of Influence: </strong> ${cardData.region}</p>
     </li>
  `
}
