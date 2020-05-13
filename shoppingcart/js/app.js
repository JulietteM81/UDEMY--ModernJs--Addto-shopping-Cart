//Variables
const courses = document.querySelector('#courses-list'),
        shoppingCartContent = document.querySelector('#cart-content tbody'),
        clearCartBtn = document.querySelector('#clear-cart');
 
//Listeners
loadEventListeners();

function loadEventListeners(){
    courses.addEventListener('click', buyCourse);
    shoppingCartContent.addEventListener('click', removeCourse);
    clearCartBtn.addEventListener('click', clearCart);
    //Document Ready
    document.addEventListener('DOMContentLoaded', getFromLocalStorage);
   

}

function buyCourse(e){
    e.preventDefault();
    if(e.target.classList.contains('add-to-cart')){
        const course = e.target.parentElement.parentElement; 
        getCourseInfo(course);
    }
}
 
function getCourseInfo(course){
    const courseInfo = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.price span').textContent, //want the price in the span
        id: course.querySelector('a').getAttribute('data-id')
    }
    addIntoCart(courseInfo);
}

function addIntoCart(course){
    const row = document.createElement('tr');
    row.innerHTML = `
        <tr>
            <td>
                <img src="${course.image}" width=100px>
            </td>
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>
                <a href="#" class="remove" data-id="${course.id}">X</a>
            </td>

        </tr>
    `;
    shoppingCartContent.appendChild(row);

    //Add course into a storage
    saveIntoStorage(course);
}
//add the courses into local storage
function saveIntoStorage(course){
    let courses;
    courses =Array.from(getCoursesFromStorage());
    
    //add the course into the array
    courses.push(course);
    //since the storage only saves strin we need to convert JSOn into String
    localStorage.setItem('courses', JSON.stringify(courses));

}

//get the content from the storage
function getCoursesFromStorage(){
    let courses;
    //if something exists in the storage we get the value, otehrwise create an empty array
    if(localStorage.getItem('courses') === null){
        courses = [];
    }else{
        courses = JSON.parse(localStorage.getItem('courses'));
    }
    return courses;
}





function removeCourse(e){//e neede to work with delegation
    let course, courseId;
    //Remove from the DOM
    if(e.target.classList.contains('remove')){
    e.target.parentElement.parentElement.remove();
    course = e.target.parentElement.parentElement;
    courseId = course.querySelector('a').getAttribute('data-id');
   }
   console.log(courseId);
   //Remove from local storage==> looking for an id insteand of a title
   removeCourseLocalStorage(courseId);

}

//remove from local storage
function  removeCourseLocalStorage(id){
    // get the local storage data
    let coursesLS = getCoursesFromStorage();
    //loop through the ARRay and find the index to remove
    coursesLS.forEach(function(courseLS, index){
        if(courseLS.id === id){
            coursesLS.splice(index, 1);//1=remove only 1 item
        }
    });
    // add the rest of the array
    localStorage.setItem('courses',JSON.stringify(coursesLS));
}

function clearCart(e){
    //the first way 
    //shoppingCartContent.innerHTML = ' ';//goiing to over all the html inside the tbody
    //the second way ==> recommended
    while(shoppingCartContent.firstChild){
        shoppingCartContent.removeChild(shoppingCartContent.firstChild);
    } 

    //clear from Local Storage
    clearLocalStorage();
}

//Clear the whole local Storage
function clearLocalStorage(){
    localStorage.clear();
}

//loads when document is ready and print courses into shopping cart
function getFromLocalStorage() {
    let coursesLS = getCoursesFromStorage();

    // LOOP throught the courses and print into the cart
    coursesLS.forEach(function(course) {
         // create the <tr>
         const row = document.createElement('tr');

         // print the content
         row.innerHTML = `
              <tr>
                   <td>
                        <img src="${course.image}" width=100>
                   </td>
                   <td>${course.title}</td>
                   <td>${course.price}</td>
                   <td>
                        <a href="#" class="remove" data-id="${course.id}">X</a>
                   </td>
              </tr>
         `;
         shoppingCartContent.appendChild(row);
    });





}