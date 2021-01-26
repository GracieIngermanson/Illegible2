import * as d3 from 'd3';
import $ from 'jquery';

async function loadWithCallback(url, callback, delay = 0) {
  await $('#box').load(url, function () {
    const content = document.getElementById('box').innerHTML;
    document.getElementById('box').innerHTML = '';
    d3.select('#box')
      .html(content)
      .transition()
      .delay(delay)
      .on('end', callback);
    console.log('leaving loadText callback');
  });
}

/* d3.select('#box');
d3.select('#button-bar')
  .append('button')
  .attr('id', 'fadeParagraphs')
  .text('Fade Paragraphs'); */

async function fadeParagraphs() {
  d3.select('#box')
    .selectAll('p')
    .on('click', function () {
      d3.select(this).style('opacity', '1');
    })
    .transition()
    .duration(1000)
    .delay(function (d, i) {
      return i * 750;
    })
    .style('opacity', '0');
}

loadWithCallback('/kasyananddreammaiden.html', shuffleParagraphs, 10000);

function catOnDemand() {
  d3.select('#box')
    .selectAll('p')
    .on('click', function () {
      d3.select(this).html('<img src="/frieda.jpg"/>');
    });
}

function toggleableCat() {
  d3.select('#box')
    .selectAll('p')
    .each(function () {
      d3.select(this).append('div').attr('class', 'cat-box');
    })
    .on('click', function () {
      if (!this.classList.contains('hide-text')) {
        console.log('Inside');
        d3.select(this).select('.cat-box').html('<img src="/frieda.jpg" />');
      } else {
        d3.select(this).select('.cat-box').html('');
      }
      this.classList.toggle('hide-text');
    });
}
// Shuffle words in each paragraph, and change the font to Comic Sans MS
function shuffleWords() {
  d3.select('#box')
    .selectAll('p')
    .transition()
    .duration(1000)
    .delay(function (d, i) {
      return i * 750;
    })
    .text(function () {
      let innerText = this.innerText;
      return d3.shuffle(innerText.split(' ')).join(' ');
    })
    .style('font-family', 'Comic Sans MS')
    .on('end', shuffleWords);
}
// Once every second, color paragraphs in gradient with probability 0.25
function repeatingGradient() {
  d3.select('#box')
    .selectAll('p')
    .transition()
    .delay(1000)
    .attr('class', function () {
      return Math.random() < 0.25 ? 'gradient' : '';
    })
    .on('end', repeatingGradient);
}
//repeatingGradient();

function shuffleParagraphs() {
  let paragraphSelection = d3.select('#box').selectAll('p');
  const paragraphs = new Array(paragraphSelection.length);
  paragraphSelection.each(function (d, i) {
    paragraphs[i] = this.innerText;
  });
  d3.shuffle(paragraphs);
  paragraphSelection
    .each(function (d, i) {
      d3.select(this).text(paragraphs[i]);
    })
    .transition()
    .delay(1000)
    .on('end', shuffleParagraphs);
}

/* function fadeParagraphs(box, interval) {
  d3.select(box)
    .selectAll('p')
    .transition()
    .duration(1000)
    .delay(function (d, i) {
      return i * interval;
    })
    .style('opacity', 0);
}



const catParagraphs = (box, interval) => {
  d3.select(box)
    .selectAll('p')
    .transition()
    .delay(function (d, i) {
      return i * interval;
    })
    .html('<img src="/frieda.jpg" />');
};

const scrambleParagraphOrder = (box) => {}; */
