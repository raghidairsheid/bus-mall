'use secrit';

let attemps = 0;
let maxAttempts = 25;
let attempsEl = document.getElementById('attemps');
// let resultEl = document.getElementById('result');
let allProduct = [];
let mallImagesName = [];
let mallClick = [];
let mallViews = [];
let newAllProduct = [];

//constructor
function Product(name){
    this.name = name.split('.')[0];
    this.imgFilePath = 'img/' + name;
    this.click = 0;
    this.views = 0;
    allProduct.push(this);
    mallImagesName.push(this.name);
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

    while (leftImgIndex === centerImgIndex || centerImgIndex === rightImgIndex || leftImgIndex === rightImgIndex || newAllProduct.includes(leftImgIndex) || newAllProduct.includes(centerImgIndex) || newAllProduct.includes(rightImgIndex)) {
        leftImgIndex = generateImage();
        centerImgIndex = generateImage();
        rightImgIndex = generateImage();
    }

    newAllProduct[0] = leftImgIndex;
    newAllProduct[1] = centerImgIndex;
    newAllProduct[2] = rightImgIndex;

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
    
    attempsEl.textContent = attemps;
}
renderImg();

lImgIndex.addEventListener('click',uesrClick);
cImgIndex.addEventListener('click', uesrClick); 
rImgIndex.addEventListener('click', uesrClick); 

function uesrClick(event){
  attemps++;
  if(attemps <= maxAttempts){
    console.log(event.target.id)
    if(event.target.id === 'pic1'){
      allProduct[leftImgIndex].click++;
    }
    else if(event.target.id === 'pic2'){
      allProduct[centerImgIndex].click++;
    }
    else if(event.target.id === 'pic3')
    {
      allProduct[rightImgIndex].click++;
    }
    renderImg();
    // console.log(allProduct);
  }
  else{
    lImgIndex.removeEventListener('click', uesrClick);
    cImgIndex.removeEventListener('click', uesrClick);
    rImgIndex.removeEventListener('click', uesrClick);

    // let viewEl = document.getElementById('viewResults');
    let buttonEl = document.getElementById('button');

    // viewEl.appendChild(buttonEl);
    // buttonEl.textContent = 'View Results';
    buttonEl.addEventListener('click', function clicking()
    {
    
    let ulEl = document.getElementById('result');
    let listEl;
    for (let i = 0; i<allProduct.length; i++){
      listEl = document.createElement('li');
      ulEl.appendChild(listEl);
      listEl.textContent = `${allProduct[i].name} had ${allProduct[i].showTimes}  votes, and was seen ${allProduct[i].views} times.`;
      
      mallClick.push(allProduct[i].click);
      mallViews.push(allProduct[i].views);
    }
    
    chartRender();
    buttonEl.removeEventListener('click', clicking);
  }
    )

  }
}

function chartRender(){
  
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: mallImagesName,
          datasets: [{
              label: '# of click',
              data: mallClick,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
              ],
              borderWidth: 2
            }, {
              label: '# of views',
              data: mallViews,
              backgroundColor: [
                  'rgba(75, 192, 192, 0.2)',
              ],
              borderColor: [
                  'rgba(75, 192, 192, 1)',
              ],
              borderWidth: 2
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
  }