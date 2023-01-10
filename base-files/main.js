/*
When the page loads
    Get list of pokemon types.
    render type list out (need type name and url to get all pokemon of that type)
    attach a listener to respond to a click on the type.
        when clicked it should pull the type url and retrieve the data
        render the list of pokemon
        style the clicked type as active
        filter out types with no pokemon (shadow and unknown)
        test change


*/

// we have to convert the response fetch sends back into the appropriate type. In this case the API sends back json...so we process it as json and send it back
function convertToJson(response){
    if(response.ok){
        return response.json();
    }
        else{
            throw new Error("bad response");
        }
}

// once we have the data, we need to do something with it. This won't always be the same thing though. With a callback (function passed into a function) we can change the behavior as needed.
function getData(url,callback){
    fetch(url) 
        .then(convertToJson)
        .then((data) => {
            console.log(data);
            //notice : this is where we execute the function that passed in
            if (callback){
                callback(data);
            }
        }
        )
}
//getData("https://pokeapi.co/api/v2/type");

// keep things from happening until the DOM is ready
// another alternative would be to add 'defer' to our script element
window.addEventListener("load",function (){
    //get and display the list of types
    getData("https://pokeapi.co/api/v2/type", renderTypeList);
    
    document.getElementById("typeList").addEventListener("click",typeClickedHandler);
})

// create simple html markup to display a list
function renderTypeList(list){
    const element = document.getElementById("typeList");
    const cleanList = cleanTypeList(list.results);
    cleanList.forEach((item)=>{

        const li=document.createElement("li");
        li.innerHTML = '${item.name}';

        li.setAttribute("data-url",item.url);
        element.appendChild(li);
    })
}

function typeClickedHandler (event){
    //note difference between 2 consoles below
    console.log(event.target);
    console.log(event.currentTarget);

    const selectedType = event.target;
    const url = selectedType.dataset.url;

    setActive(url);

    getData(url,renderPokeList);
}

function renderPokeList(list){
    const element = document.getElementById("pokeList");
    element.innerHTML = "";
    list.pokeman.forEach((item)=> {
        const li = documnet.createElement("li");
        li.innerHTML = '${item.pokemon.name}';
        li.setAttribute("data-url", item.pokeman.url);
        element.appendChild(li);
    })
}

function setActive(type){
    const allTypes = document.querySelectorAll(".types>li");
    allTypes.forEach((item) =>{
        if(item.dataset.url === type){
            item.classList.add("active");
        }
        else{
            item.classList.remove("active");
        }
    })
}
// create click handler

// render the list

// set active item

// there are no pokemon in unknown and shadow. Let's remove them from the list.

function cleanTypeList(list){
    return list.filter((item)=>item.name != "shadow" && item.name != "unknown");
}
