'use secrit';

let attemps = 0;
// let count = 0;
let maxAttempts = 25;
let attempsEl = document.getElementById('attemps');
// let resultEl = document.getElementById('result');
let allProduct = [];

//constructor
function Product(name){
    this.name = name.split('.')[0];
    this.imgFilePath = 'img/' + name;
    this.click = 0;
    this.views = 0;
    allProduct.push(this);
}

let mallImages= ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg','water-can.jpg', 'wine-glass.jpg'];

for(let i = 0; i < mallImages.length; i++){
    new Product(mallImages[i]);
}
// console.log(allProduct);

function generateImage(){
    return Math.floor(Math.random() * allProduct.length);
  // console.log(Math.floor(Math.random() * allProduct.length));
}
// console.log(allProduct);
// generateImage();

let lImgIndex = document.getElementById('pic1');
let cImgIndex = document.getElementById('pic2');
let rImgIndex = document.getElementById('pic3');


let leftImgIndex;
let centerImgIndex;
let rightImgIndex;

function renderImg(){
    leftImgIndex = generateImage();
    rightImgIndex = generateImage();
    centerImgIndex = generateImage();

    while (leftImgIndex === centerImgIndex || centerImgIndex === rightImgIndex || leftImgIndex === rightImgIndex) {
        leftImgIndex = generateImage();
        // centerImgIndex = generateImage();
        rightImgIndex = generateImage();
    }
    lImgIndex.setAttribute('src',allProduct[leftImgIndex].imgFilePath);
    lImgIndex.setAttribute('title',allProduct[leftImgIndex].imgFilePath);
    allProduct[leftImgIndex].views++;
    // console.log(allProduct[leftImgIndex].name);

    cImgIndex.setAttribute('src',allProduct[centerImgIndex].imgFilePath);
    cImgIndex.setAttribute('title',allProduct[centerImgIndex].imgFilePath);
    allProduct[centerImgIndex].views++;
    // console.log(allProduct[centerImgIndex].name);

    rImgIndex.setAttribute('src',allProduct[rightImgIndex].imgFilePath);
    rImgIndex.setAttribute('title',allProduct[rightImgIndex].imgFilePath);
    allProduct[rightImgIndex].views++;
    // console.log(allProduct[rightImgIndex].name);
    
}
renderImg();

lImgIndex.addEventListener('click',uesrClick);
cImgIndex.addEventListener('click', uesrClick); 
rImgIndex.addEventListener('click', uesrClick); 

function uesrClick(event){
  attemps++;
  if(attemps <= maxAttempts){
    if(event.target.id === 'pic1'){
      allProduct[leftImgIndex].click++;
      //allProduct[leftImgIndex].showTimes = allProduct[leftImgIndex].showTimes+1;
    }
    else if(event.target.id == 'pic2'){
      allProduct[centerImgIndex].click++;
      //allProduct[centerImgIndex].showTimes = allProduct[centerImgIndex].showTimes+1;
    }
    else
    {
      allProduct[rightImgIndex].click++;
      //allProduct[rightImgIndex].showTimes = allProduct[rightImgIndex].showTimes+1;
    }
    renderImg();
    // console.log(allProduct);
  }
  else{
    let listShow = document.getElementById('result');
    let listEl;
    for (let i = 0; i<allProduct.length; i++){
      listEl = document.createElement('li');
      listShow.appendChild(listEl);
      listEl.textContent = `${allProduct[i].name} had ${allProduct[i].showTimes}  votes, and was seen ${allProduct[i].views} times.`;
    }
  
    lImgIndex.removeEventListener('click', uesrClick);
    cImgIndex.removeEventListener('click', uesrClick);
    rImgIndex.removeEventListener('click', uesrClick);
  }
}