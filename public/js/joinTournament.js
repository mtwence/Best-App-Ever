const inputTournament = document.getElementById('inputTournament').value;

const joinTournamentHandler = async (event) => {
    event.preventDefault();
  
    console.log("join_btn clicked")

    const currentPlayers = await fetch(`/api/tournaments/${inputTournament}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(req.session.player_id);
    
    const currentPlayersArray = currentPlayers.map((players) => players.id);
    
    newPlayersArray = currentPlayersArray.push(req.session.player_id);

    console.log("new array: " + newPlayersArray);
  
      const response = await fetch(`/api/tournaments`, {
        method: 'PUT',
        body: JSON.stringify({ playerIds: newPlayersArray}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        document.location.replace(`/all-tournaments/`);
      } else {
        alert('Failed to join tournament');
      }
    
  };

  
  document
    .querySelector('#join_btn')
    .addEventListener('submit', joinTournamentHandler);
  

  