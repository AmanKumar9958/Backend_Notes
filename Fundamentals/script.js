// ForEach is a method that executes a provided function once for each array element.
// It does not return a new array, it just executes the function for each element.
function forEach(){
    var numbers = [1, 2, 3, 4, 5];
    numbers.forEach((val) => {
        console.log(val * 2)
    })
}
// forEach()

// Map gives a new array with the results of calling a provided function on every element in the calling array.
function map(){
    var numbers = [1, 2, 3, 4, 5];
    var newNumbers = numbers.map((val) => {
        return val + 10;
    })
    console.log(newNumbers)
}
// map()

// Filter creates a new array with all elements that pass the test implemented by the provided function.
// It needs to return true or false for each element.
function filter(){
    var numbers = [1, 2, 3, 4, 5];
    filteredNums = numbers.filter((val) => {
        if(val > 12){
            return true;
        } else{
            return false;
        }
    })
    console.log(filteredNums)
}
// filter()

// find() returns the value of the first element in the provided array that satisfies the provided testing function.
function find(){
    var numbers = [1, 2, 3, 4, 5];
    var foundNum = numbers.find((val) => {
        return val > 3;
    })
    console.log(foundNum)
}
// find()

// indexof() returns the index of the first occurrence of a specified value in an array, or -1 if it is not present.
function indexOf(){
    var numbers = [1, 2, 3, 4, 5];
    var index = numbers.indexOf(12);
    console.log(index)
}
// indexOf()

// ----------------------------------------

// Objects are a collection of properties, and a property is an association between a name (or key) and a value.
var obj = {
    name: "Aman",
    age: 20,
    isStudent: true,
    subjects: ["Java", "Python", "Node"],
    address: {
        city: "New Delhi",
        state: "Delhi"
    },
}

// console.log(obj.name)   // Accessing a property of an object
obj.name = "Aman Kumar"   // Changing the value of a property
// console.log(obj.name)

Object.freeze(obj)   // Freezes the object, preventing any changes to it
// obj.age = 19;  // Attempting to change a property of a frozen object will not work
// console.log(obj.age)   // The age will not change because the object is frozen


// Asynchronous Functions
async function fetchUser(){
    var response =  await fetch(`https://randomuser.me/api/`)
    var data = await response.json()
    console.log(data.results[0].name.first)
}
// fetchUser();