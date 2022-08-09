const joinTournamentHandler = async (event) => {
  event.preventDefault();
  const inputTournament = document.getElementById("inputTournament").value;


  fetch ( `/api/tournaments/${inputTournament}/players`,)
  .then(function (response) {
		return response.json();
	}).then(function (data) {
		console.log(data);
  var players = data.players;
  console.log(players);
  const joiningPlayer = {
    id: session.player_id,
    player_name: session.player_name
  };
  console.log(joiningPlayer);
  players.push(joiningPlayer);
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

  // const updateData = await fetch(
  //   `/api/tournaments/${inputTournament}`,
  //   {
  //     method: "PUT",
  //     body: JSON.stringify({ playerIds: playerArray}),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }
  // );
  // if (updateData.ok) {
  //   console.log(updateData);
  //   document.location.replace(`/api/tournaments/${inputTournament}`);
  // } else {
  //   alert("Failed to create tournament");
  // }

};
document
  .querySelector("#join_btn")
  .addEventListener("click", joinTournamentHandler);
