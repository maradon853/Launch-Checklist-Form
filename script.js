
window.addEventListener("load", function() {
   let form = document.querySelector("form");
   let pilotName = document.querySelector("input[name=pilotName]");
   let copilotName = document.querySelector("input[name=copilotName]");
   let fuelLevel = document.querySelector("input[name=fuelLevel]");
   let cargoMass = document.querySelector("input[name=cargoMass]");
   let formSubmit = document.getElementById("formSubmit");
   let launchStatus = document.getElementById("launchStatus");
   let faultyItems = document.getElementById("faultyItems");
   let pilotStatus = document.getElementById("pilotStatus");
   let copilotStatus = document.getElementById("copilotStatus");
   let fuelStatus = document.getElementById("fuelStatus");
   let cargoStatus = document.getElementById("cargoStatus");
 form.addEventListener("submit", function(event) {
      
      if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === ""){
         alert("All fields are required!");
         event.preventDefault();
      }
      if(typeof(pilotName.value) !== 'string' || typeof(copilotName.value) !== 'string'){
         alert("Make sure to enter valid information for each field!");
         event.preventDefault();
      }
      if(isNaN(fuelLevel.value) || isNaN(cargoMass.value)){
         alert("Make sure to enter valid information for each field!");
         event.preventDefault();
      }
   });  
 formSubmit.addEventListener("submit", function(){
    faultyItems.innerHTML = 
    `<div>
    <ol>
      <li id="pilotStatus">Pilot ${pilotName.value} Ready</li>
      <li id="copilotStatus">Co-pilot ${copilotName.value} Ready</li>
      <li id="fuelStatus">Fuel level high enough for launch</li>
      <li id="cargoStatus">Cargo mass low enough for launch</li>
    </ol>
     </div>`;

   if(fuelLevel < 10000){
      faultyItems.style.visibility = 'visable';
      fuelStatus.innerHTML = "Fuel level too low for launch";
      launchStatus.innerHTML = "Shuttle Not Ready for Launch";
      launchStatus.style.color = "red";
   }
   if(cargoMass > 10000){
      faultyItems.style.visibility = 'visable';
      cargoStatus.innerHTML = "Cargo mass too high for launch";
      launchStatus.innerHTML = "Shuttle Not Ready for Launch";
      launchStatus.style.color = "red";
   }else{
      launchStatus.innerHTML = "Shuttle Ready for Launch";
      launchStatus.style.color = "green";
   }
  });

 fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
                response.json().then( function(json) { 
                const destination = document.getElementById("missionTarget"); 
                destination.innerHTML = 
                 `<div>
                    <h2>Mission Destination</h2>
                  <ol>
                      <li>Name: ${json[0].name}</li>
                      <li>Diameter: ${json[0].diameter}</li>
                      <li>Star: ${json[0].star}</li>
                      <li>Distance from Earth: ${json[0].distance}</li>
                      <li>Number of Moons: ${json[0].moons}</li>
                  </ol>
                     <img src="${json[0].image}">
                </div>`;
                });
               });
});           


