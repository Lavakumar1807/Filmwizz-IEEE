let searchmovie = document.querySelector("#search");
let sbtn=document.querySelector("#sbtn");
let movieimage = document.querySelector(".image");

let apikey1 = "55d36ea5";
let apikey2 = "f3244cb3";
const open=async (moviename)=>{
   try{ let promise=await fetch(`https://www.omdbapi.com/?t=${moviename}&apikey=f3244cb3`);
    let data=await promise.json();
     console.log(data);
    document.querySelector(".main").innerHTML="";
    let movie=data.Title;
    let movietitle=movie.toUpperCase();
    let movieheader=moviename.toUpperCase();
    
    if(movietitle.includes(movieheader)==true)
    {
    let div1=document.createElement("div");
     div1.classList.add("image");
     document.querySelector(".main").append(div1);   
     if(data.Poster=="N/A"){
      div1.innerHTML=`<img src=poster.png>`;
     }
     else{ div1.innerHTML=`<img src=${data.Poster} >`;}

    // ${} : These are string templates literals.
    
    let div2=document.createElement("div");
    div2.classList.add("info");
    document.querySelector(".main").append(div2);
    div2.innerHTML=`
    <p id="name">${data.Title}</p></br>
    <p id="year" >${data.Year}</p>
    <p id="imdb">imdb : ${data.imdbRating}</p>
    <p id="time">${data.Runtime}</p>
    <p id="about">${data.Genre}</p>
    <p id="lang">${data.Language}</p>
    <p id="cast" >${data.Actors}</p>
    <p id="glance" >${data.Plot}</p>
    `;
   
    }
    else {
      document.querySelector(".main").innerHTML=`<p>Enter movie title PROPERLY...</p>`
    }
  }
  catch(error){
    document.querySelector(".main").innerHTML=`<p>Movie not found!</p>`
 }
   
};

sbtn.addEventListener("click",()=>{
    let name = searchmovie.value;
     open(name);
});
/*-------------------------Recommeded movies--------------------------------*/
let text = document.querySelector("#search");

const search =async (moviename)=>{
    let promise=await fetch(`https://www.omdbapi.com/?s=${moviename}&apikey=f3244cb3`);
     let data=await promise.json();
      document.querySelector(".movie").innerHTML="";
     // console.log(data);
      for(let i=0;i<data.Search.length;i++){
        let div = document.createElement("div");
        div.classList.add("movielist");
        div.setAttribute("title",`${data.Search[i].Title}`);
        document.querySelector(".movie").append(div);

        if(data.Search[i].Poster=="N/A"){
          div.innerHTML=`<img src="poster.png">
          <p>${data.Search[i].Title}</p>`
        }
          else{div.innerHTML=`<img src=${data.Search[i].Poster}>
          <p>${data.Search[i].Title}</p>`}
        
      }
      let movieblock=document.querySelectorAll(".movielist");
          movieblock.forEach(movieblock=>{
          movieblock.addEventListener("click",()=>{
          let title = movieblock.getAttribute("title");
        
          open(title);
          let main=document.querySelector(".header");
           main.scrollIntoView({behavior:"smooth"});
        })
      })
 }


text.addEventListener("input",()=>{
    let value=text.value;
    search (value);
 });
/*---------------------------initial movies-----------------------------------*/
let movieblock=document.querySelectorAll(".movies");
//console.log(movieblock);
movieblock.forEach(movieblock=>{
  movieblock.addEventListener("click",()=>{
    let title=movieblock.getAttribute("title");
    open(title);
    let main=document.querySelector(".header");
     main.scrollIntoView({behavior:"smooth"});
  });
});