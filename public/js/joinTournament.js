const joinTournamentHandler = async (event) => {
  event.preventDefault();

  const inputTournament = document.getElementById("inputTournament").value;
  const inputPlayer = document.getElementById("inputPlayer").value;
  const inputPlayerInt = parseInt(inputPlayer);

  // Get data of the current tournament on the page
  const response = await fetch(`/api/tournaments/${inputTournament}`);
  const data = await response.json();
  // Map unto an array the ids of the associated players of the tournament 
  var players = data.players.map((player) => player.id);
  // Add the id of the player currently logged in to the page
  players.push(inputPlayerInt);

  // PUT RESTful route to update the current tournament on the page with the key 'playerIds' and a value of the array of players containing the new player joining the tournament
  const updateData = await fetch(`/api/tournaments/${inputTournament}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ playerIds: players }),
  });

  if (updateData.ok) {
    console.log(updateData);
    document.location.replace(`/tournament/${inputTournament}`);
  } else {
    alert("Failed to join tournament");
  }
};

document
  .querySelector("#join_btn")
  .addEventListener("click", joinTournamentHandler);