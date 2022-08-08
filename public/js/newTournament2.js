const newFormHandler = async (event) => {
  event.preventDefault();

  const tournament_name = document.querySelector('#tournament-name').value.trim();
  const tournament_players = document.querySelector('#tournament-players').value.trim();
  const description = document.querySelector('#tournament-desc').value.trim();
  const inputGame = document.getElementById('inputGame').value;

  if (tournament_name && tournament_players && description && inputGame) {
    console.log(inputGame);
    const response = await fetch(`/api/tournaments`, {
      method: 'POST',
      body: JSON.stringify({ tournament_name: tournament_name, player_quantity: tournament_players, description: description, game_id: inputGame}),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response)
    if (response.ok) {
      document.location.replace('/newTournament');
    } else {
      alert('Failed to create tournament');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/tournaments/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/newTournament');
    } else {
      alert('Failed to delete tournament');
    }
  }
};

document
  .querySelector('.new-tournament-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.tournament-list')
  .addEventListener('click', delButtonHandler);
