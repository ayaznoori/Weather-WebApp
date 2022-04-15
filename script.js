function searchfun(){
    event.preventDefault();
    let val=document.querySelector("#userinput").value;
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${val}&appid=244a7ecf42f965a472d8b3f2300adfd1`;
  fetch(url)
 .then((data)=>{
   return data.json();
}).then((data)=>{
    show(data);
})
.catch((err)=>{
    console.log(err)
})
}
function show(data){
    const icon=document.createElement("img");
    icon.src=`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
 
    const  name=document.createElement("p");
    name.innerText="City : "+data.name;
    const dataw=document.createElement("div");
    dataw.innerText=data.weather[0].description;
    const  min=document.createElement("p");
    min.innerHTML="Min Temp : "+ Math.floor(data.main.temp_min-273)+" <sup>o</sup>C";
    const  max=document.createElement("p");
    max.innerHTML="Max Temp : "+Math.floor(data.main.temp_max-273)+" <sup>o</sup>C";
    const  currentt=document.createElement("p");
    currentt.innerHTML="Current Temp : "+Math.floor(data.main.temp-273)+" <sup>o</sup>C";
    const wind=document.createElement("p");
    wind.innerHTML="Wind Speed : "+data.wind.speed+ " m/s" ;
    /* const sunrise=document.createElement("p");
    sunrise.innerHTML=data.sys.sunrise;
    const sunset=document.createElement("p");
    sunset.innerHTML=data.sys.sunset; */
    document.querySelector("#main_data").innerText="";
    var map=document.querySelector("iframe");
    map.src=`https://www.google.com/maps/embed/v1/place?key=AIzaSyBM7xfZ6ekcrWhf79KIju8kGADdjeHRSp4&q=${data.name}`;
    document.querySelector("#main_data").append(name,min,max,currentt,wind,dataw,icon);

    let url3=`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=hourly,minutely&appid=244a7ecf42f965a472d8b3f2300adfd1`;
    fetch(url3).then((data1)=>{
        return data1.json();
    }).then((data1)=>{
        let today = new Date();
        let day = today.getDay();
        day++;
        let daylist = ["Sun","Mon","Tue","Wed ","Thu","Fri","Sat"];
        let counter=["one","two","three","four","five","six","seven"]
        let temp=[];
       for(let i=0;i<7;i++){
           if(day==7)
           day=0;
           temp.push(daylist[day]);
           day++; 
           var bag=document.createElement("div");
           const icon=document.createElement("img");
           icon.src=`http://openweathermap.org/img/wn/${data1.daily[i].weather[0].icon}.png`;
           let value= document.createElement("div");
           value.innerHTML= Math.floor(data1.daily[i].temp.min-273)+"<sup>o</sup>C";
           let dayv= document.createElement("div");
           dayv.innerText=temp[i];
           document.querySelector(`#${counter[i]}`).innerText="";
           document.querySelector(`#${counter[i]}`).append(dayv,icon,value);
       }
    })
}

navigator.geolocation.getCurrentPosition(success);

function success(pos){
    var crd = pos.coords;
  let url= `https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=244a7ecf42f965a472d8b3f2300adfd1`;
  
  let url3=`https://api.openweathermap.org/data/2.5/onecall?lat=${crd.latitude}&lon=${crd.longitude}&exclude=hourly,minutely&appid=244a7ecf42f965a472d8b3f2300adfd1`;

  fetch(url)
 .then((data)=>{
   return data.json();
}).then((data)=>{
   
    currentlocation(data);
})
.catch((err)=>{
    console.log(err)
})
   fetch(url3).then((data1)=>{
    return data1.json();
}).then((data1)=>{
    let today = new Date();
    let day = today.getDay();
    day++;
    let daylist = ["Sun","Mon","Tue","Wed ","Thu","Fri","Sat"];
    let counter=["one","two","three","four","five","six","seven"]
    let temp=[];
   for(let i=0;i<7;i++){
       if(day==7)
       day=0;
       temp.push(daylist[day]);
       day++; 
       var bag=document.createElement("div");
       const icon=document.createElement("img");
       icon.src=`http://openweathermap.org/img/wn/${data1.daily[i].weather[0].icon}.png`;
       let value= document.createElement("div");
       value.innerHTML= Math.floor(data1.daily[i].temp.min-273)+"<sup>o</sup>C";
       let dayv= document.createElement("div");
       dayv.innerText=temp[i];
       document.querySelector(`#${counter[i]}`).innerText="";
       document.querySelector(`#${counter[i]}`).append(dayv,icon,value);
   }
})
.catch((err)=>{
    console.log(err)
})


}
function currentlocation(data){
    
    const  currentt=document.createElement("div");
    currentt.setAttribute("id","degree");
    currentt.innerHTML=Math.floor(data.main.temp-273)+" <sup>o</sup>C";
    currentt.style.fontSize="60px";
    currentt.style.color="white";
   
    const  namediv=document.createElement("div");
    namediv.style.lineHeight="10px"
    const  name=document.createElement("p");
    name.innerText= data.name;
    name.style.fontSize="30px";
    var today = new Date();
    var day = today.getDay();
    var daylist = ["Sunday","Monday","Tuesday","Wednesday ","Thursday","Friday","Saturday"];
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const datep=document.createElement("p");
    datep.innerHTML=date+' '+time;
    const dataw=document.createElement("div");
    const icon=document.createElement("img");
    icon.src=`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    icon.style.backgroundColor="white";
    icon.style.borderRadius="10px"
    const dis=document.createElement("p");
    dis.innerText=data.weather[0].description;
    dataw.style.lineHeight="10px";
    dataw.append(icon,dis);
    namediv.append(name,datep);
    document.querySelector("#lcont").innerText="";
 
    var map=document.querySelector("iframe");
    map.src=`https://www.google.com/maps/embed/v1/place?key=AIzaSyBM7xfZ6ekcrWhf79KIju8kGADdjeHRSp4&q=${data.name}`;
    document.querySelector("#lcont").append(currentt,namediv,dataw );

}

