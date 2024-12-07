const name=document.querySelector("#courseName");
const category=document.querySelector("#courseCategory");
const price=document.querySelector("#coursePrice");
const capacity=document.querySelector("#courseCapacity");
const description=document.querySelector("#courseDescription");
const button=document.querySelector("#click");
const invalidName=document.querySelector(".invalid-name");
const invalidDesc=document.querySelector(".invalid-Description");
const invalidCategory=document.querySelector(".invalid-Category");
const search = document.querySelector("#search");

let courses=[];

    if(localStorage.getItem("courses")!=null){
        courses=JSON.parse(localStorage.getItem("courses"));
        displayCourses(courses);
    }


button.addEventListener("click", function(event){
    event.preventDefault();
    addCourse();
});

function checkDescription(){
    const descriptionPattern=/^.{20,}$/;

    if(!descriptionPattern.test(description.value)){
        Swal.fire({
            title: "Error!",
            text: "Description must be at least 20 character!",
            icon: "error"
        });
        return false;
    }else{
        return true;
    }

}

function checkCategory(){
    const categoryPattern=/^[A-Z][a-z]+$/;//start with a capital letter followed by one or more lowercase letters.
    if(!categoryPattern.test(category.value.trim())){
        Swal.fire({
            title: "Error!",
            text: "Category must start with capital letter and contain only lowercase letters",
            icon: "error"
        });
        return false;
    }else{
        return true;
    }
}

function checkCapacityAndPrice(){
    if(parseInt(capacity.value.trim())<=0 || isNaN(parseInt(capacity.value.trim())) || parseInt(price.value.trim())<=0 || isNaN(price.value.trim()) ){
        Swal.fire({
            title: "Error!",
            text: "Capacity & Price must be a positive Integer!",
            icon: "error"
        });
        return false;
    }else{
        return true;
    }
}

function isFieldsEmpty(){
    if(name.value.trim()==="" || description.value.trim()==="" || price.value.trim()==="" || description.value.trim()==="" || capacity.value.trim()===""){
        Swal.fire({
            title: "Error!",
            text: "FILL ALL FIELDS!",
            icon: "error"
        });
        return true;
    }else{
        return false;
    }
}
/*....................................TO DISPLAY LATEST ADDED COURSE TO THE TABLE..............................................*/
function addToTable(course){  

    document.querySelector("#data").innerHTML +=`<tr>
            <td>${courses.length}</td>
            <td>${course.name}</td>
            <td>${course.category}</td>
            <td>${course.price}</td>
            <td>${course.description}</td>
            <td>${course.capacity}</td>
            <td>
                <button class="btn btn-danger" onclick="updateCourse(${course.length})">Update</button>
            </td>
            <td>
                <button class="btn btn-danger" onclick="deleteCourse(${course.length})">Delete</button>
            </td>
        </tr>`;       
}
/*................................DISPLAY COURSES METHOD................................ */
function displayCourses(courses){

    const result=[];

    for(let i=0;i<courses.length;i++){
        result.push(`<tr>
            <td>${i}</td>
            <td>${courses[i].name}</td>
            <td>${courses[i].category}</td>
            <td>${courses[i].price}</td>
            <td>${courses[i].description}</td>
            <td>${courses[i].capacity}</td>
            <td>
                <button class="btn btn-danger" onclick="updateCourse(${i})">Update</button>
            </td>
            <td>
                <button class="btn btn-danger" onclick="deleteCourse(${i})">Delete</button>
            </td>
        </tr>`);
    }

    document.querySelector("#data").innerHTML = result.join('');
}

/*.....................DELETE METHOD..........................*/
function deleteCourse(index){

    Swal.fire({
        title: "Are you sure to delete this course?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(index,1);
            localStorage.setItem("courses", JSON.stringify(courses));
            displayCourses(courses);

            Swal.fire({
                title: "Deleted!",
                text: "Course deleted successfully",
                icon: "success"
            });
        }
      });
}

/*.........................DELETE ALL METHOD......................... */

document.querySelector("#deleteBtn").addEventListener("click", function(){
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            courses=[];
            localStorage.removeItem("courses");
            displayCourses(courses);

            Swal.fire({
                title: "Deleted!",
                text: "ALL COURSES DELETED SUCCESSFULLY!",
                icon: "success"
            });
        }
      });
});

/*.........................UPDATE METHOD......................... */

function updateCourse(index){

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it!"
          }).then((result) => {
            if (result.isConfirmed) {
                course=courses[index];
                course.name=name.value.trim();
                course.category=category.value.trim();
                course.price=price.value.trim();
                course.description=description.value.trim();
                course.capacity=capacity.value.trim();
                displayCourses(courses);
    
                Swal.fire({
                    title: "Updated!",
                    text: "COURSE UPDATED SUCCESSFULLY!",
                    icon: "success"
                });
            }
          });
}


/*.............................ADD METHOD..................................*/
function addCourse(){
    const namePattern = /^[A-Z][a-z]{2,10}$/;

    console.log(namePattern.test(name.value));

    if(isFieldsEmpty()){
        return;
    }
    if(!namePattern.test(name.value.trim())){
        // Swal.fire({
        //     title: "Invalid Name!",
        //     text: "Course name should start with an uppercase letter and contain only lowercase letters and numbers. with a length between 3 and 10",
        //     icon: "error"
        // });
        invalidName.innerHTML="Course name should start with an uppercase letter and contain only lowercase letters and numbers. with a length between 3 and 10";
    }else if(namePattern.test(name.value.trim())){
        invalidName.innerHTML="";
    }if(checkDescription()==false){
        invalidDesc.innerHTML="Please enter a Description with at least 20 characters.";
    }else if(checkDescription()==true){
        invalidCategory.innerHTML="";
    }if(checkCategory()==false){
        invalidCategory.innerHTML="Please enter a category starts with an capitalize letter and contain only lowercase letters";
    }else if(checkCategory()==true){
        invalidCategory.innerHTML="";
    }
    
    if(checkCategory()==true && checkDescription()==true && namePattern.test(name.value.trim()) && checkCapacityAndPrice()==true){

        const course={  //create an object with the inserted data to the fields
            name: name.value.trim(),
            category: category.value.trim(),
            price: price.value.trim(),
            capacity: capacity.value.trim(),
            description: description.value.trim()
        }

        courses.push(course);
        console.log(courses);

        Swal.fire({
            title: "Added Successfully!",
            text: "Course has been added sucessfully!",
            icon: "success"
        });

        localStorage.setItem("courses", JSON.stringify(courses));
        displayCourses(courses);

        invalidName.innerHTML="";
        invalidDesc.innerHTML="";
        invalidCategory.innerHTML="";
    }
}

/*........................................Search Method................................................*/

function filterCourses(event) {
    const input = event.target.value.trim().toLowerCase();
    if (input !== "") { // Check if the input is not empty
        const filteredCourses = courses.filter(course =>
            course.name.toLowerCase().includes(input)
        );
        displayCourses(filteredCourses);
    } else {
        // If the search bar is empty, display all courses
        displayCourses(courses);
    }
}

// add event listener for the search bar
search.addEventListener("input", filterCourses);