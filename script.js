
window.addEventListener("load", function() {
   let form = document.querySelector("form");
   let pilotName = document.querySelector("input[name=pilotName]");
   let copilotName = document.querySelector("input[name=copilotName]");
   let fuelLevel = document.querySelector("input[name=fuelLevel]");
   let cargoMass = document.querySelector("input[name=cargoMass]");
   let formSubmit = document.getElementById("formSubmit");
   let launchStatus = document.getElementById("launchStatus");
   let faultyUpdate = document.getElementById("faultyItems");
   let finalPilotStatus = document.getElementById("pilotStatus");
   let finalCopilotStatus = document.getElementById("copilotStatus");
   let finalFuelStatus = document.getElementById("fuelStatus");
   let finalCargoStatus = document.getElementById("cargoStatus");
   
 form.addEventListener("submit", function(event) {
      
      if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === ""){
         alert("All fields are required!");
         event.preventDefault();
      }
      if(isNaN(pilotName.value) === false || isNaN(copilotName.value) === false){
         alert("Make sure to enter valid information for each field!");
         event.preventDefault();
      }
      if(isNaN(fuelLevel.value) || isNaN(cargoMass.value)){
         alert("Make sure to enter valid information for each field!");
         event.preventDefault();
      }
   }); 
   formSubmit.addEventListener("click", function(){
      finalPilotStatus.innerHTML = `Pilot ${pilotName.value} Ready`;
      finalCopilotStatus.innerHTML = `Co-pilot ${copilotName.value} Ready`;

      if(fuelLevel.value < 10000){
         faultyUpdate.style.visibility = 'visible';
         finalFuelStatus.innerHTML = "Fuel level too low for launch";
         launchStatus.innerHTML = "Shuttle Not Ready for Launch";
         launchStatus.style.color = "red";
         event.preventDefault();
      }
      if(cargoMass.value > 10000){
         faultyUpdate.style.visibility = 'visible';
         finalCargoStatus.innerHTML = "Cargo mass too high for launch";
         launchStatus.innerHTML = "Shuttle Not Ready for Launch";
         launchStatus.style.color = "red";
         event.preventDefault();
      }
      if(cargoMass.value < 10000 && fuelLevel.value > 10000){
         faultyUpdate.style.visibility = 'visible';
         launchStatus.innerHTML = "Shuttle Ready for Launch";
         launchStatus.style.color = "green";
         finalFuelStatus.innerHTML = "Fuel level high enough for launch";
         finalCargoStatus.innerHTML = "Cargo level low enough for launch";
         event.preventDefault();
      }
      
     });
   
 fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
                response.json().then( function(json) { 
                const destination = document.getElementById("missionTarget"); 
                destination.innerHTML = 
                 `<div style="text-align: center;">
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

         

