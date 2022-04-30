
let elapsedTime = document.querySelector("#elapsed");
let homeTeamImage = document.querySelector("#homeLogo");
let homeTeamName = document.querySelector("#homeName");
let awayTeamImage = document.querySelector("#awayLogo");
let awayTeamName = document.querySelector("#awayName");
let lastMatchGoal = document.querySelector("#goals");
let matchTable = document.querySelector("#matchTable");



function addMatchTile(data){
    
    let matchtile = document.createElement('div');
    matchtile.classList.add("match-tile");

    
    let homeTeam = document.createElement('div');
    homeTeam.classList.add("team");
    
    let homeTileTeamName = document.createElement('p');
    homeTileTeamName.innerHTML = data['teams']['home']['name'];
    let homeTileTeamLogo = document.createElement('img');
    homeTileTeamLogo.src=data['teams']['home']['logo'];
    homeTeam.appendChild(homeTileTeamLogo);
    homeTeam.appendChild(homeTileTeamName);

    let awayTeam = document.createElement('div');
    awayTeam.classList.add("team");
    
    let awayTileTeamName = document.createElement('p');
    awayTileTeamName.innerHTML = data['teams']['away']['name'];
    let awayTileTeamLogo = document.createElement('img');
    awayTileTeamLogo.src=data['teams']['away']['logo'];
    awayTeam.appendChild(awayTileTeamLogo);
    awayTeam.appendChild(awayTileTeamName);

    
    let score = document.createElement('p');
    score.innerHTML = data['goals']['home'] + " - " + data['goals']['away'];


    matchtile.appendChild(homeTeam);
    matchtile.appendChild(score);
    matchtile.appendChild(awayTeam);

    matchTable.appendChild(matchtile);
}

fetch("https://v3.football.api-sports.io/fixtures?live=all", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": "a86044499e40046a183511096db0d3d3"
    }
})
.then(response => response.json().then(data => {
    let matchesList = data['response'];
    let fixture = matchesList[0]['fixture'];
    let goals = matchesList[0]['goals'];
    let teams = matchesList[0]['teams'];
    console.log(matchesList.length);

   elapsedTime.innerHTML = fixture['status']['elapsed'] + "'";
   homeTeamImage.src = teams['home']['logo'];
   homeTeamName.innerHTML = teams['home']['name'];
   awayTeamImage.src = teams['away']['logo'];
   awayTeamName.innerHTML = teams['away']['name'];
   lastMatchGoal.innerHTML = goals['home']+ " - " + goals['away'];

   for(let i = 1; i<matchesList.length;i++){
       addMatchTile(matchesList[i]);
   }

}))
.catch(err => {
    console.log(err);
});










