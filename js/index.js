//sends get request to endpoint at given path using fetch
const getData = async (path) =>{
let endpoint = `https://jsonplaceholder.typicode.com/${path}`

let get = await fetch(endpoint).catch(e=>console.log(e))

let data = await get.json()

return data
}

const mapUsersIntoTable = async () =>{

let data = await getData("users");

var table = document.createElement('table');

//append table into table container
document.getElementById('table-container').appendChild(table); 

//for each user, create a row, and then for each property of user, create a cell.
data.forEach(function(row) {   
    
//build head if first row
if(table.rows.length === 0){    
    var tr = table.insertRow(); //new row
    for(let prop in row){ //cycle props of each user            
        if(typeof row[prop] === "object"){ //check if prop value is object
            for(let innerProp in row[prop]){       //repeat -> cycle, check   (possible recursion here)             
                if(typeof row[prop][innerProp] === "object"){
                    for(let p2 in row[prop][innerProp]){
                        var th = tr.insertCell();
                        th.innerText = p2.toUpperCase(); 
                    }
                }else{

                var th = tr.insertCell();
                th.innerText = innerProp.toUpperCase();
                }
            }
        }else {    
        var th = tr.insertCell();
        th.innerText = prop.toUpperCase();
        }
    }

    

}

//build body on every iteration
var tr = table.insertRow();// new row

for(let prop in row){    //cycle
    if(typeof row[prop] == "object" ){ //check 
        for(let innerProp in row[prop]){       //repeat     
            if(typeof row[prop][innerProp] === "object"){
                for(let p2 in row[prop][innerProp]){
                    var th = tr.insertCell();
                    th.innerText = row[prop][innerProp][p2]; 
                }
            }else{
            var th = tr.insertCell();
            th.innerText = row[prop][innerProp]; 
            }
        }
    }else {

    var td = tr.insertCell();
    td.innerText = row[prop];
    }

}  

//add onclick functionality to rows
tr.addEventListener("click", (e)=>{
        mapPostsIntoContainer(e.target.parentElement.children[0].innerText)

})
});
}



const mapPostsIntoContainer = async (id) =>{

let staleContent = document.getElementsByClassName('all-post-container')[0]
if(staleContent !== undefined) staleContent.remove()

let data = await getData("posts")
        


var allPostContainer = document.createElement('div')
allPostContainer.setAttribute('class', 'all-post-container')
document.getElementById("posts-container").appendChild(allPostContainer)

for(let posts of data){
    
    if(id !== 0 && posts.userId != id) continue;
    
    let postContainer = document.createElement('div')    
    postContainer.setAttribute("class", "post-style")

    for(let p in posts){
        let div = document.createElement('div')
        div.setAttribute("class",`post-ele`)
        div.innerText = p[0].toUpperCase()+ p.substring(1) + ": "+ posts[p]
        postContainer.appendChild(div)
    }
    allPostContainer.appendChild(postContainer)
}


}