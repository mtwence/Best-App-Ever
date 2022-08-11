const newFormHandler = async (event) => {
  event.preventDefault();

  const tournament_name = document.querySelector('#tournament-name').value.trim();
  const tournament_date = document.querySelector('#tournament-date').value.trim();
  const tournament_players = document.querySelector('#tournament-players').value.trim();
  const description = document.querySelector('#tournament-desc').value.trim();
  const inputGame = document.getElementById('inputGame').value;
  const discord = document.querySelector('#tournament-disc').value.trim();
  const host = document.querySelector('#host').value.trim();
  
  if (tournament_name && tournament_players && description && inputGame && discord && tournament_date && host) {
    console.log(inputGame);
    const response = await fetch(`/api/tournaments`, {
      method: 'POST',
      body: JSON.stringify({ tournament_name: tournament_name, player_quantity: tournament_players, description: description, game_id: inputGame, discord_link: discord, event_time: tournament_date, host: host}),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response)
    if (response.ok) {
      document.location.replace(`/games/${inputGame}/tournaments`);
    } else {
      alert('Failed to create tournament');
    }
  }
};
document
  .querySelector('.new-tournament-form')
  .addEventListener('submit', newFormHandler);