const joinTournamentHandler = async (event) => {
  event.preventDefault();
  const inputTournament = document.getElementById("inputTournament").value;
  const inputPlayer = document.getElementById("inputPlayer").value;
  const inputPlayerInt = parseInt(inputPlayer);
  fetch ( `/api/tournaments/${inputTournament}/players`,)
  .then(function (response) {
		return response.json();
	}).then(function (data) {
		console.log(data);
  var players = data.players.map((player) => player.id);
  console.log(players);
  // const joiningPlayer = {
  //   id: session.player_id,
  //   player_name: session.player_name
  // };
  // console.log(joiningPlayer);
  console.log(inputPlayer);
  players.push(inputPlayerInt);
  console.log(players);

  });
  // obj = playerData.json();
  // console.log(obj);
  // const players = obj.players;
  // console.log(players);

  

  // const player = playerData.get({ plain: true });
  // console.log(player);
  // const playerArray = player.map((player)=>player.player_id);
  // playerArray.push(session.player_id);

  const updateData = await fetch(
    `/api/tournaments/${inputTournament}`,
    {
      method: "PUT",
      body: JSON.stringify({ playerIds: players}),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (updateData.ok) {
    console.log(updateData);
    document.location.replace(`/api/tournaments/${inputTournament}`);
  } else {
    alert("Failed to create tournament");
  }

};
document
  .querySelector("#join_btn")
  .addEventListener("click", joinTournamentHandler);
