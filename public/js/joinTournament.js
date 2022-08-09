const joinTournamentHandler = async (event) => {
  event.preventDefault();
  const inputTournament = document.getElementById("inputTournament").value;


  const playerData = await fetch(
    `/api/tournaments/${inputTournament}/players`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (playerData.ok) {
    console.log(playerData);
    // document.location.replace("/tournaments");
  } else {
    alert("Failed to get a tournament");
  }

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
