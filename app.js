'use strict';

// console.log('connected');

// ============================ global vars ============================

// var productsArray = [];
Product.productsArray = [];
var totalClicks = 0;
var roundsOfVote = 25;

// ============================ function definition ============================

function Product (productName, src){

  this.productName = productName;
  this.imageSrc = src;
  this.liveClicks = 0;
  this.numberOfTimesDisplayed = 0;
  Product.productsArray.push(this);
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

  for(var i = 0; i < Product.productsArray.length; i++){

    var target = document.getElementById('product-vote');
    var liProduct = document.createElement('li');

    var pContent = document.createElement('p');
    pContent.textContent = 'Product name: ' + Product.productsArray[i].productName + ' | ' + 'No. of times displayed: ' + Product.productsArray[i].numberOfTimesDisplayed + ' | ' + 'Votes: ' + Product.productsArray[i].liveClicks;

    liProduct.appendChild(pContent);

    var insertBreak = document.createElement('br');
    insertBreak.textContent = '<br>';

    liProduct.appendChild(insertBreak);


    target.appendChild(liProduct);

  }

}

var currentIndexOnPage = [0,1,2];

function displayProducts() {

  var item1 = Math.floor(Math.random() * Product.productsArray.length);
  var item2 = Math.floor(Math.random() * Product.productsArray.length);
  var item3 = Math.floor(Math.random() * Product.productsArray.length);

  //make sure that none of the new 3 images is the same with the 3 old images
  while(item1 === currentIndexOnPage[0] ||
       item1 === currentIndexOnPage[1] ||
       item1 === currentIndexOnPage[2]){

    console.log('1st while triggered');
    item1 = Math.floor(Math.random() * Product.productsArray.length);

  }

  while(item2 === currentIndexOnPage[0] ||
    item2 === currentIndexOnPage[1] ||
    item2 === currentIndexOnPage[2]){

    console.log('1st while triggered');
    item2 = Math.floor(Math.random() * Product.productsArray.length);
  }

  while(item3 === currentIndexOnPage[0] ||
  item3 === currentIndexOnPage[1] ||
  item3 === currentIndexOnPage[2]){

    console.log('1st while triggered');
    item3 = Math.floor(Math.random() * Product.productsArray.length);
  }


  //makes sure all numbers in the set are diff
  while(item1 === item2 || item1 === item3 || item2 === item3 || item1 === currentIndexOnPage[0] || item1 === currentIndexOnPage[1] || item1 === currentIndexOnPage[2] || item2 === currentIndexOnPage[0] || item2 === currentIndexOnPage[1] || item2 === currentIndexOnPage[2]){
    item1 = Math.floor(Math.random() * Product.productsArray.length);
    item2 = Math.floor(Math.random() * Product.productsArray.length);

    console.log('2nd while triggered');
  }

  // Product.productsArray[item1].numberOfTimesDisplayed++;
  var prod1 = Product.productsArray[item1];

  // Product.productsArray[item2].numberOfTimesDisplayed++;
  var prod2 =Product.productsArray[item2];

  // Product.productsArray[item3].numberOfTimesDisplayed++;
  var prod3 = Product.productsArray[item3];

  var prodList = document.getElementById('ulDisplayProducts');
  prodList.innerHTML = '';


  prod1.renderProducts();

  prod2.renderProducts();

  prod3.renderProducts();

  currentIndexOnPage = [item1, item2, item3];

  if(totalClicks < roundsOfVote){
    Product.productsArray[item1].numberOfTimesDisplayed++;
    Product.productsArray[item2].numberOfTimesDisplayed++;
    Product.productsArray[item3].numberOfTimesDisplayed++;
  }

}

function handleClickOnProducts(event) {
  console.log(event.target);

  // with event delegation we can put an if conditional to only trigger the code inside the event handler if the right thing is clicked on
  if(event.target.tagName === 'IMG') {
    //increment total clicks
    totalClicks++;

    //increment product clicks
    for(var prodIndex = 0; prodIndex < Product.productsArray.length; prodIndex++){

      if(Product.productsArray[prodIndex].imageSrc === event.target.getAttribute('src')){
        console.log('matched');
        Product.productsArray[prodIndex].liveClicks++;

        //live results for votes
        var resultList = document.getElementById('product-vote');
        resultList.innerHTML = '';
        renderFinalResults();
      }

    }

    displayProducts();

    //live results for no. of times displayed
    var resultList = document.getElementById('product-vote');
    resultList.innerHTML = '';
    renderFinalResults();

    if(totalClicks === roundsOfVote){
      var productList = document.getElementById('ulDisplayProducts');
      productList.innerHTML = '';

      var resultList = document.getElementById('product-vote');
      resultList.innerHTML = '';
      renderFinalResults();

      //remove listner
      listOfProducts.removeEventListener('click', handleClickOnProducts);

      // renderFinalResults();


    }

  } else {
    console.log('please click an image');
  }

  // var resultList = document.getElementById('product-vote');
  // resultList.innerHTML = '';
  // renderFinalResults();

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
new Product('chair', 'assets/chair.jpg');
new Product('cthulhu', 'assets/cthulhu.jpg');
new Product('dog-duck', 'assets/dog-duck.jpg');
new Product('dragon', 'assets/dragon.jpg');
new Product('pen', 'assets/pen.jpg');
new Product('pet-sweep', 'assets/pet-sweep.jpg');
new Product('scissors', 'assets/scissors.jpg');
new Product('shark', 'assets/shark.jpg');
new Product('sweep', 'assets/sweep.png');
new Product('tauntaun', 'assets/tauntaun.jpg');
new Product('unicorn', 'assets/unicorn.jpg');
new Product('usb', 'assets/usb.gif');
new Product('water-can', 'assets/water-can.jpg');
new Product('wine-glass', 'assets/wine-glass.jpg');

Product.productsArray[0].numberOfTimesDisplayed = 1;
Product.productsArray[1].numberOfTimesDisplayed = 1;
Product.productsArray[2].numberOfTimesDisplayed = 1;

renderFinalResults();

Product.productsArray[0].renderProducts();
Product.productsArray[1].renderProducts();
Product.productsArray[2].renderProducts();

