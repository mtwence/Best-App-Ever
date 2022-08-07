const newFormHandler = async (event) => {
  event.preventDefault();

  const tournament2_name = document.querySelector('#tournament2-name').value.trim();
  const tournament2_players = document.querySelector('#tournament2-players').value.trim();
  const description = document.querySelector('#tournament2-desc').value.trim();

  if (tournament2_name && tournament2_players && description) {
    const response = await fetch(`/api/tournament2s`, {
      method: 'POST',
      body: JSON.stringify({ tournament2_name: tournament2_name, player_quantity: tournament2_players, description: description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response)
    if (response.ok) {
      document.location.replace('/newTournament2');
    } else {
      alert('Failed to create tournament2');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/tournament2s/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/newTournament2');
    } else {
      alert('Failed to delete tournament2');
    }
  }
};

document
  .querySelector('.new-tournament2-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.tournament2-list')
  .addEventListener('click', delButtonHandler);
