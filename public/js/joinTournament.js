const joinTournamentHandler = async (event) => {
  event.preventDefault();
  const inputTournament = document.getElementById("inputTournament").value;
  const inputPlayer = document.getElementById("inputPlayer").value;
  const inputPlayerInt = parseInt(inputPlayer);
  let playersPut;
  let playersPutNoKeys;
  const response = await fetch(`/api/tournaments/${inputTournament}/players`);
  const data = await response.json();
  var players = data.players.map((player) => player.id);
  players.push(inputPlayerInt);
  playersPut = players;

  const updateData = await fetch(`/api/tournaments/${inputTournament}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ playerIds: playersPut }),
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