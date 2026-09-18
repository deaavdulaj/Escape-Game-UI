/* ESCAPE THE EVIL AI */

let hasCandle = false;
let currentRoom = 'cell';
let gameOver = false;

const cellSearch = [
  "You check under the cot again, but it's empty now.",
  'You run your hands along the cold stone walls.. nothing.',
  'A rusted bucket sits in the corner. Still just a bucket.',
  'You listen at the door. Silence, as always.'
];
let cellSearchCount = 0;

function showInstructions() {
  alert(
    'You wake up trapped inside the Evil AI\'s digital fortress!\n\n' +
    'Explore rooms, make choices, and find a way to escape.\n' +
    'Some choices depend on what you\'ve found earlier, pay attention!\n\n' +
    'Important: This game uses your browser console to show extra details ' +
    'and confirm what\'s happening as you play, so keep it open.\n' +
    'To open it: right-click the page -> Inspect -> Console tab (or press F12).\n\n' +
    'Good luck. You\'ll need it.'
  );
}

// Keeps asking until the player gives one of the validOptions, or returns
// null if they press Cancel. validOptions should be lowercase strings.
function getValidChoice(promptText, validOptions) {
  while (true) {
    const rawInput = prompt(promptText);

    if (rawInput === null) {
      return null;
    }

    const choice = rawInput.trim().toLowerCase();
    if (validOptions.includes(choice)) {
      return choice;
    }

    alert(`"${rawInput}" isn't one of the options. Please try again.`);
  }
}

function roomCell() {
  console.log('You are in: The Holding Cell');
  alert(
    'You wake up on a cold stone floor. The cell is dim and silent.\n\n' +
    'What do you do?\n' +
    '- Type "search" to search the cell\n' +
    '- Type "door" to try the door'
  );

  const choice = getValidChoice('Search or Door?', ['search', 'door']);

  if (choice === null) {
    endGame('quit');
    return;
  }

  if (choice === 'search') {
    if (!hasCandle) {
      hasCandle = true;
      alert('You feel around the room and find a half-melted candle. You take it.');
      console.log('Found item: candle');
    } else {
      const message = cellSearch[cellSearchCount % cellSearch.length];
      alert(message);
      cellSearchCount++;
    }
    roomCell();
  } else if (choice === 'door') {
    currentRoom = 'corridor';
    roomCorridor();
  }
}

function roomCorridor() {
  console.log('You are in: The Dark Corridor');

  if (!hasCandle) {
    alert(
      "It's pitch black. You can't see a thing without a light source.\n\n" +
      'You feel your way back to the cell.'
    );
    console.log('No candle — sent back to the cell.');
    currentRoom = 'cell';
    roomCell();
    return;
  }

  alert(
    'The candlelight flickers against the walls, revealing a heavy door ahead.\n\n' +
    '- Type "forward" to go through the door\n' +
    '- Type "back" to return to the cell'
  );

  const choice = getValidChoice('Forward or Back?', ['forward', 'back']);

  if (choice === null) {
    endGame('quit');
    return;
  }

  if (choice === 'forward') {
    currentRoom = 'control';
    roomControl();
  } else {
    currentRoom = 'cell';
    roomCell();
  }
}

function roomControl() {
  console.log('You are in: The Control Room');
  alert(
    'Banks of humming servers surround you. A single red switch glows on the wall' +
    'the AI\'s power core.\n\n' +
    'What do you do?\n' +
    '- Type "pull" to pull the switch\n' +
    '- Type "hide" to hide instead'
  );

  const choice = getValidChoice('Pull or Hide?', ['pull', 'hide']);

  if (choice === null) {
    endGame('quit');
    return;
  }

  if (choice === 'pull') {
    endGame('escape');
  } else {
    endGame('caught');
  }
}

function endGame(result) {
  gameOver = true;

  if (result === 'quit') {
    alert('You quit the game. The AI wins by default. Thanks for playing :( !');
    console.log('Game ended: player quit.');
  } else if (result === 'escape') {
    alert('You escaped the fortress! Freedom at last.');
    console.log('Game ended: player escaped.');
  } else if (result === 'caught') {
    alert('The alarm blares. The AI catches you. Game over...');
    console.log('Game ended: player caught.');
  }

  const playAgain = confirm('Play again?');
  if (playAgain) {
    hasCandle = false;
    currentRoom = 'cell';
    gameOver = false;
    cellSearchCount = 0;
    roomCell();
  }
}

showInstructions();
roomCell();