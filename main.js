//Global selects - import all the items that needs to selected once and used globally
const slider = document.querySelector('.slider'); //slider wrapper
const sliderItems = slider.querySelectorAll('.item') //slider items

//Setting the data-count attribute to each slide - this would be used to track the slide change
let sliderItemsCount = 0;
sliderItems.forEach(item => {
  item.setAttribute('data-count', sliderItemsCount);
  sliderItemsCount++;
})

//Function to set active class on the slides based on the type of arrow clicked i.e., left or right
const setActive = (currentSlideNumber, arrowType) => {
  sliderItems.forEach(item => {
    item.classList.remove('active')
  })
  if (arrowType === 'left') {
    if (currentSlideNumber === 0) {
      sliderItems[sliderItems.length - 1].classList.add('active')
    } else {
      const tobeActive = slider.querySelector('.item[data-count="' + (currentSlideNumber - 1) + '"]')
      tobeActive.classList.add('active')
    }
  }
  else if (arrowType === 'right') {
    if (currentSlideNumber === sliderItems.length - 1) {
      sliderItems[0].classList.add('active')
    } else {
      const tobeActive = slider.querySelector('.item[data-count="' + (currentSlideNumber + 1) + '"]')
      tobeActive.classList.add('active')
    }
  }
}

//Function to create and insert arrows in the slider's html
const createArrow = (type) => {
  const arrowWrapper = document.createElement('button');
  arrowWrapper.classList.add('arrow');
  arrowWrapper.classList.add(type.toLowerCase());

  const arrow = document.createElement('span');
  const arrowText = document.createTextNode(type);

  arrow.append(arrowText);
  arrowWrapper.append(arrow);

  if (type.toLowerCase() === 'left') {
    slider.prepend(arrowWrapper);
  } else {
    slider.append(arrowWrapper)
  }
}

createArrow('Left');
createArrow('Right')

//Handling the click of the arrows - left click means previous slide and right arrow click means next slide
const arrows = slider.querySelectorAll('.arrow')
arrows.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const currentActive = slider.querySelector('.active')
    if (currentActive) {
      let arrowType;
      if (item.classList.contains('left')) {
        arrowType = 'left';
      } else {
        arrowType = 'right'
      }
      setActive(Number(currentActive.getAttribute('data-count')), arrowType)
    }

  })
})
