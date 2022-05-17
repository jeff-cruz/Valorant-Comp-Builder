const $start = document.querySelector('.start-button');
const $header = document.querySelector('header');
const $agentScreen = document.querySelector('.agents-screen');
const $mainScreen = document.querySelector('.main-screen');
const $detailsScreen = document.querySelector('.agent-details');
const $agentList = document.querySelector('.agent-list');
const $agentCompList = document.querySelector('.agent-comp-list');
const $agentsButton = document.querySelector('.agents-link');
const $agentsBigButton = document.querySelector('.a-agent');
const $abilityIcons = document.querySelectorAll('.ability-pics');
const $abilityNames = document.querySelectorAll('.ability-name');
const $abilityTexts = document.querySelectorAll('.ability-description');
const $agentName = document.querySelector('.agent-name');
const $roleName = document.querySelector('.role-name');
const $agentPortrait = document.querySelector('.agent-portrait');
const $detailText = document.querySelector('.detail-text');
const $createComp = document.querySelector('.create-button');
const $compScreen = document.querySelector('.comp-screen');
const $selectContainers = document.querySelectorAll('.select-container');
const $compSelect = document.querySelector('.comp-select');
const $submitButton = document.querySelector('.submit-button');
const $entriesScreen = document.querySelector('.entries-screen');
const $createCompTwo = document.querySelector('.create-comp');
const $entryList = document.querySelector('.entries-container');
const $compsButton = document.querySelector('.comp-link');
const $noEntriesContainer = document.querySelector('.no-entries-container');
const $cancelButton = document.querySelector('.cancel-button');
const $confirmButton = document.querySelector('.confirm-button');
const $deleteOverlay = document.querySelector('.delete-overlay');
const $loader = document.querySelector('.load-overlay');
const $error = document.querySelector('.error-container');
let currentEntryID;
const agentComp = [];

// get started button
$start.addEventListener('click', handleStart);
function handleStart(event) {
  $header.className = 'header';
  $agentScreen.className = 'agents-screen';
  $mainScreen.className = 'main-screen hidden';
  $detailsScreen.className = 'agent-details hidden';
  data.listDisplay = true;

  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://valorant-api.com/v1/agents');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
      $loader.className = 'load-overlay hidden';
    } else {
      $error.className = 'error-container';
    }
    // agent list screen
    for (let i = 0; i < xhr.response.data.length; i++) {
      if (xhr.response.data[i].isPlayableCharacter === true) {
        const $li = document.createElement('li');
        $li.setAttribute('class', 'agent-list-item');
        const $icon = document.createElement('img');
        $icon.setAttribute('class', 'agent-icon');
        $icon.setAttribute('src', xhr.response.data[i].displayIconSmall);
        $icon.setAttribute('id', i);
        $li.appendChild($icon);
        $agentList.appendChild($li);

      }
    }
  });
  xhr.send();
}

// view list of agents
$agentsButton.addEventListener('click', agentsButton);
$agentsBigButton.addEventListener('click', agentsButton);
function agentsButton(event) {
  $agentScreen.className = 'agents-screen';
  $detailsScreen.className = 'agent-details hidden';
  $compScreen.className = 'comp-screen hidden';
  $entriesScreen.className = 'entries-screen hidden';

  if (data.listDisplay === false) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://valorant-api.com/v1/agents');
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {

      // agent list screen
      for (let i = 0; i < xhr.response.data.length; i++) {
        if (xhr.response.data[i].isPlayableCharacter === true) {
          const $li = document.createElement('li');
          $li.setAttribute('class', 'agent-list-item');
          const $icon = document.createElement('img');
          $icon.setAttribute('class', 'agent-icon');
          $icon.setAttribute('src', xhr.response.data[i].displayIconSmall);
          $icon.setAttribute('id', i);
          $li.appendChild($icon);
          $agentList.appendChild($li);
        }
      }
    });
    xhr.send();
    data.listDisplay = true;
  }
}

// view biography and abilities of an agent
$agentList.addEventListener('click', agentDetails);
function agentDetails(event) {
  if (event.target.tagName === 'IMG') {
    $agentScreen.className = 'agents-screen hidden';
    $detailsScreen.className = 'agent-details';

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://valorant-api.com/v1/agents');
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {

      // agent details screen
      const id = event.target.id;
      if (data.detailsDisplay === false) {
        if (xhr.response.data[id].isPlayableCharacter === true) {
          $agentName.textContent = xhr.response.data[id].displayName;
          $roleName.textContent = xhr.response.data[id].role.displayName;
          $agentPortrait.setAttribute('src', xhr.response.data[id].fullPortraitV2);
          $detailText.textContent = xhr.response.data[id].description;

          for (let j = 0; j < xhr.response.data[id].abilities.length; j++) {
            $abilityIcons[j].setAttribute('src', xhr.response.data[id].abilities[j].displayIcon);
            $abilityNames[j].textContent = xhr.response.data[id].abilities[j].displayName;
            $abilityTexts[j].textContent = xhr.response.data[id].abilities[j].description;
          }
        }
        data.detailsDisplay = true;
      } else if (data.detailsDisplay === true) {
        if (xhr.response.data[id].isPlayableCharacter === true) {
          $agentName.textContent = xhr.response.data[id].displayName;
          $roleName.textContent = xhr.response.data[id].role.displayName;
          $agentPortrait.setAttribute('src', xhr.response.data[id].fullPortraitV2);
          $detailText.textContent = xhr.response.data[id].description;
          for (let j = 0; j < xhr.response.data[id].abilities.length; j++) {
            $abilityIcons[j].setAttribute('src', xhr.response.data[id].abilities[j].displayIcon);
            $abilityNames[j].textContent = xhr.response.data[id].abilities[j].displayName;
            $abilityTexts[j].textContent = xhr.response.data[id].abilities[j].description;
          }
        }
      }
    });
    xhr.send();
  }
}

// create comp button to show comp selection screen
$createComp.addEventListener('click', createComp);
$createCompTwo.addEventListener('click', createComp);
function createComp(event) {
  $agentScreen.className = 'agents-screen hidden';
  $compScreen.className = 'comp-screen';
  $entriesScreen.className = 'entries-screen hidden';

  if (data.compListDisplay === false) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://valorant-api.com/v1/agents');
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {

      // agent comp list screen
      for (let i = 0; i < xhr.response.data.length; i++) {
        if (xhr.response.data[i].isPlayableCharacter === true) {
          const $li = document.createElement('li');
          $li.setAttribute('class', 'agent-list-item');
          const $icon = document.createElement('img');
          $icon.setAttribute('class', 'agent-icon');
          $icon.setAttribute('src', xhr.response.data[i].displayIconSmall);
          $icon.setAttribute('id', i);
          $li.appendChild($icon);
          $agentCompList.appendChild($li);
        }
      }
    });
    xhr.send();
    data.compListDisplay = true;
  }
}

// add an agent to team comp selector
$agentCompList.addEventListener('click', agentSelect);
function agentSelect(event) {
  if (event.target.tagName === 'IMG') {
    if ($selectContainers[0].childElementCount === 0) {
      const firstIcon = event.target;
      const firstIconCopy = firstIcon.cloneNode();
      $selectContainers[0].appendChild(firstIconCopy);
      agentComp.push(event.target);
    } else if ($selectContainers[1].childElementCount === 0) {
      const secondIcon = event.target;
      const secondIconCopy = secondIcon.cloneNode();
      $selectContainers[1].appendChild(secondIconCopy);
      agentComp.push(event.target);
    } else if ($selectContainers[2].childElementCount === 0) {
      const thirdIcon = event.target;
      const thirdIconCopy = thirdIcon.cloneNode();
      $selectContainers[2].appendChild(thirdIconCopy);
      agentComp.push(event.target);
    } else if ($selectContainers[3].childElementCount === 0) {
      const fourthIcon = event.target;
      const fourthIconCopy = fourthIcon.cloneNode();
      $selectContainers[3].appendChild(fourthIconCopy);
      agentComp.push(event.target);
    } else if ($selectContainers[4].childElementCount === 0) {
      const fifthIcon = event.target;
      const fifthIconCopy = fifthIcon.cloneNode();
      $selectContainers[4].appendChild(fifthIconCopy);
      agentComp.push(event.target);
    }
  }
}

// remove agent from team comp selector
$compSelect.addEventListener('click', removeAgent);
function removeAgent(event) {
  if (event.target.tagName === 'IMG') {
    for (let i = 0; i < $selectContainers.length; i++) {
      if (parseInt(event.target.parentNode.id) === i) {
        if ($selectContainers[i].childElementCount !== 0) {
          $selectContainers[i].removeChild(event.target);
          for (let j = 0; j < agentComp.length; j++) {
            if (event.target.id === agentComp[j].id) {
              agentComp.splice(j, 1);
            }
          }
        }
      }
    }
  }
}

// submit and save team comp
$submitButton.addEventListener('click', submitButton);
function submitButton(event) {
  if (agentComp.length === 5) {
    const entry = {
      firstAgent: agentComp[0].src,
      secondAgent: agentComp[1].src,
      thirdAgent: agentComp[2].src,
      fourthAgent: agentComp[3].src,
      fifthAgent: agentComp[4].src,
      entryID: data.nextEntryId
    };
    data.nextEntryId++;
    data.agentCompList.push(entry);
    $entryList.prepend(renderEntry(entry));
    $compScreen.className = 'comp-screen hidden';
    $entriesScreen.className = 'entries-screen';
  }
  // clear selector boxes
  for (let i = 0; i < $selectContainers.length; i++) {
    $selectContainers[i].innerHTML = '';
  }
  // clear agentComp array
  agentComp.splice(0, 5);
  localStorage.setItem('ajax-local-storage', JSON.stringify(data));
  noEntries();
}

// render DOM tree for team comp entry
function renderEntry(entry) {
  const $entry = document.createElement('div');
  const $entryContainer = document.createElement('li');
  const $divOne = document.createElement('div');
  const $divTwo = document.createElement('div');
  const $divThree = document.createElement('div');
  const $divFour = document.createElement('div');
  const $divFive = document.createElement('div');

  $entry.setAttribute('class', 'entry col-80');
  $entryContainer.setAttribute('class', 'entry-container');
  $entryContainer.setAttribute('id', entry.entryID);
  $divOne.setAttribute('class', 'agent-one');
  $divTwo.setAttribute('class', 'agent-two');
  $divThree.setAttribute('class', 'agent-three');
  $divFour.setAttribute('class', 'agent-four');
  $divFive.setAttribute('class', 'agent-five');

  const $firstAgentImg = document.createElement('img');
  $firstAgentImg.setAttribute('class', 'agent-icon');
  $firstAgentImg.setAttribute('src', entry.firstAgent);
  $divOne.appendChild($firstAgentImg);

  const $secondAgentImg = document.createElement('img');
  $secondAgentImg.setAttribute('class', 'agent-icon');
  $secondAgentImg.setAttribute('src', entry.secondAgent);
  $divTwo.appendChild($secondAgentImg);

  const $thirdAgentImg = document.createElement('img');
  $thirdAgentImg.setAttribute('class', 'agent-icon');
  $thirdAgentImg.setAttribute('src', entry.thirdAgent);
  $divThree.appendChild($thirdAgentImg);

  const $fourthAgentImg = document.createElement('img');
  $fourthAgentImg.setAttribute('class', 'agent-icon');
  $fourthAgentImg.setAttribute('src', entry.fourthAgent);
  $divFour.appendChild($fourthAgentImg);

  const $fifthAgentImg = document.createElement('img');
  $fifthAgentImg.setAttribute('class', 'agent-icon');
  $fifthAgentImg.setAttribute('src', entry.fifthAgent);
  $divFive.appendChild($fifthAgentImg);

  const $deleteButton = document.createElement('button');
  $deleteButton.setAttribute('class', 'delete-button col-20');
  $deleteButton.setAttribute('id', entry.entryID);
  $deleteButton.textContent = 'Delete';

  $entry.appendChild($divOne);
  $entry.appendChild($divTwo);
  $entry.appendChild($divThree);
  $entry.appendChild($divFour);
  $entry.appendChild($divFive);
  $entryContainer.appendChild($entry);
  $entryContainer.appendChild($deleteButton);

  return $entryContainer;
}

// add entry to entries list
window.addEventListener('DOMContentLoaded', appendEntry);
function appendEntry(entry) {
  for (let i = 0; i < data.agentCompList.length; i++) {
    $entryList.prepend(renderEntry(data.agentCompList[i]));
  }
}

// view comp entries list
$compsButton.addEventListener('click', compsButton);
function compsButton(event) {
  $agentScreen.className = 'agents-screen hidden';
  $detailsScreen.className = 'agent-details hidden';
  $compScreen.className = 'comp-screen hidden';
  $entriesScreen.className = 'entries-screen';
  noEntries();
}

// if no entries, display no entries
function noEntries(event) {
  if (data.agentCompList.length !== 0) {
    $noEntriesContainer.className = 'no-entries-container hidden';
  } else {
    $noEntriesContainer.className = 'no-entries-container';
  }
}

// delete button: show modal
window.addEventListener('click', deleteButton);
function deleteButton(event) {
  if (event.target.className === 'delete-button col-20') {
    $deleteOverlay.className = 'delete-overlay';
    currentEntryID = event.target.parentNode.id;
  }
}

// cancel button: hide modal
$cancelButton.addEventListener('click', cancelButton);
function cancelButton(event) {
  $deleteOverlay.className = 'delete-overlay hidden';
}

// confirm button: deleting entry from entry list page and data.agentCompList
$confirmButton.addEventListener('click', confirmButton);
function confirmButton(event) {
  const $entriesContainer = document.querySelector('.entries-container');
  const $entryList = document.querySelectorAll('li');
  for (let i = 0; i < data.agentCompList.length; i++) {
    if (parseInt(currentEntryID) === data.agentCompList[i].entryID) {
      data.agentCompList.splice(i, 1);
      for (let j = 0; j < $entryList.length; j++) {
        if ($entryList[j].id === currentEntryID) {
          $entriesContainer.removeChild($entryList[j]);
          localStorage.setItem('ajax-local-storage', JSON.stringify(data));
        }
      }
    }
  }
  $deleteOverlay.className = 'delete-overlay hidden';
}
