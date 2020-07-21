'use strict';

// console.log('connected');

// ============================ global vars ============================

var productsArray = [];
var totalClicks = 0;
var roundsOfVote = 5;

// ============================ function definition ============================

function Product (productName, src){

  this.productName = productName;
  this.imageSrc = src;
  this.liveClicks = 0;
  this.numberOfTimesDisplayed = 0;
  productsArray.push(this);
}

Product.prototype.renderProducts = function() {
  var target = document.getElementById('ulDisplayProducts');
  var liProduct = document.createElement('li');

  var productImg = document.createElement('img');
  productImg.alt = this.productName;
  productImg.src = this.imageSrc;
  liProduct.appendChild(productImg);

  target.appendChild(liProduct);

};

function renderFinalResults() {

  for(var i = 0; i < productsArray.length; i++){

    var target = document.getElementById('product-vote');
    var liProduct = document.createElement('li');

    var pContent = document.createElement('p');
    pContent.textContent = 'Product name: ' + productsArray[i].productName + ' | ' + 'No. of times displayed: ' + productsArray[i].numberOfTimesDisplayed + ' | ' + 'Votes: ' + productsArray[i].liveClicks;

    liProduct.appendChild(pContent);

    var insertBreak = document.createElement('br');
    insertBreak.textContent = '<br>';

    liProduct.appendChild(insertBreak);


    target.appendChild(liProduct);

  }

}

var currentIndexOnPage = [0,1,2];
// [5,1,4]
function displayProducts() {

  var item1 = Math.floor(Math.random() * productsArray.length);
  var item2 = Math.floor(Math.random() * productsArray.length);
  var item3 = Math.floor(Math.random() * productsArray.length);

  // =========================

  // while(item1 === item2 || item1 === item3 || item2 === item3){
  //   item1 = Math.floor(Math.random() * productsArray.length);
  //   item2 = Math.floor(Math.random() * productsArray.length);

  //   console.log('2nd while triggered');
  // }

  // ==========================

  //make sure that none of the new 3 images is the same with the 3 old images
  while(item1 === currentIndexOnPage[0] ||
       item1 === currentIndexOnPage[1] ||
       item1 === currentIndexOnPage[2]){

    console.log('1st while triggered');
    item1 = Math.floor(Math.random() * productsArray.length);

  }

  while(item2 === currentIndexOnPage[0] ||
    item2 === currentIndexOnPage[1] ||
    item2 === currentIndexOnPage[2]){

    console.log('1st while triggered');
    item2 = Math.floor(Math.random() * productsArray.length);
  }

  while(item3 === currentIndexOnPage[0] ||
  item3 === currentIndexOnPage[1] ||
  item3 === currentIndexOnPage[2]){

    console.log('1st while triggered');
    item3 = Math.floor(Math.random() * productsArray.length);
  }


  //makes sure all numbers in the set are diff
  while(item1 === item2 || item1 === item3 || item2 === item3 || item1 === currentIndexOnPage[0] || item1 === currentIndexOnPage[1] || item1 === currentIndexOnPage[2] || item2 === currentIndexOnPage[0] || item2 === currentIndexOnPage[1] || item2 === currentIndexOnPage[2]){
    item1 = Math.floor(Math.random() * productsArray.length);
    item2 = Math.floor(Math.random() * productsArray.length);

    console.log('2nd while triggered');
  }

  productsArray[item1].numberOfTimesDisplayed++;
  var prod1 = productsArray[item1];

  productsArray[item2].numberOfTimesDisplayed++;
  var prod2 = productsArray[item2];

  productsArray[item3].numberOfTimesDisplayed++;
  var prod3 = productsArray[item3];

  var prodList = document.getElementById('ulDisplayProducts');
  prodList.innerHTML = '';


  prod1.renderProducts();

  prod2.renderProducts();

  prod3.renderProducts();

  currentIndexOnPage = [item1, item2, item3];
}

function handleClickOnProducts(event) {
  console.log(event.target);

  // with event delegation we can put an if conditional to only trigger the code inside the event handler if the right thing is clicked on
  if(event.target.tagName === 'IMG') {
    //increment total clicks
    totalClicks++;

    //increment product clicks
    for(var prodIndex = 0; prodIndex < productsArray.length; prodIndex++){

      if(productsArray[prodIndex].imageSrc === event.target.getAttribute('src')){
        console.log('matched');
        productsArray[prodIndex].liveClicks++;
      }

    }

    displayProducts();

    if(totalClicks === roundsOfVote){
      var productList = document.getElementById('ulDisplayProducts');
      productList.innerHTML = '';

      renderFinalResults();

      // for(var products = 0; products < productsArray.length; products++){
      //   productsArray[products].displayFinalResult();
      // }

      //remove listner
      // listOfProducts.removeEventListener('click, handleClickOnProducts');

    }

  } else {
    console.log('please click an image');
  }

}

// ============================ function calls ============================

var listOfProducts = document.getElementById('ulDisplayProducts');
listOfProducts.addEventListener('click', handleClickOnProducts);

new Product('bag', 'assets/bag.jpg');
new Product('banana', 'assets/banana.jpg');
new Product('bathroom', 'assets/bathroom.jpg');
new Product('boots', 'assets/boots.jpg');
new Product('breakfast', 'assets/breakfast.jpg');
new Product('bubblegum', 'assets/bubblegum.jpg');

productsArray[0].renderProducts();
productsArray[1].renderProducts();
productsArray[2].renderProducts();

// for(var products = 0; products < 3; products++){
//   productsArray[i].renderProducts();
// }






// for(var products = 0; products < productsArray.length; products++){
//   productsArray[products].displayFinalResult();
// }

