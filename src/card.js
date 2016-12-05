const choo = require('choo');
const html = require('choo/html');

module.exports = function (cardData) {
  console.log(cardData)
  return html`
     <li class="w-30 dib list v-top ma3 pa3 br3 bg-white ba b--black-10">
       <div class="tc w-100 db">
         <img src="/images/${cardData.id}.jpg" />
         <h1 class="f4 ttu">${cardData.name}</h1>
         <h4 class="center mw3 bb bw1 b--black-10">
       </div>
     <p class="lh-copy"><strong>Category:</strong> ${cardData.category}</p>
     <p class="lh-copy i">"${cardData.quote}"</p>
     <p class="lh-copy"><strong>Bio: </strong>${cardData.bio}</p>
     <p class="lh-copy"><strong>Region of Influence: </strong> ${cardData.region}</p>
     </li>
  `
}
