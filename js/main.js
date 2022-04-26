var $start = document.querySelector('.start-button');
var $header = document.querySelector('header');
var $agentScreen = document.querySelector('.agents-screen');
var $mainScreen = document.querySelector('.main-screen');
var $detailsScreen = document.querySelector('.agent-details');
var $agentList = document.querySelector('.agent-list');
var $agentCompList = document.querySelector('.agent-comp-list');
var $agentsButton = document.querySelector('.agents-link');
var $agentsBigButton = document.querySelector('.a-agent');
var $abilityIcons = document.querySelectorAll('.ability-pics');
var $abilityNames = document.querySelectorAll('.ability-name');
var $abilityTexts = document.querySelectorAll('.ability-description');
var $agentName = document.querySelector('.agent-name');
var $roleName = document.querySelector('.role-name');
var $agentPortrait = document.querySelector('.agent-portrait');
var $detailText = document.querySelector('.detail-text');
var $createComp = document.querySelector('.create-button');
var $compScreen = document.querySelector('.comp-screen');
var $selectContainers = document.querySelectorAll('.select-container');
var $compSelect = document.querySelector('.comp-select');
var $submitButton = document.querySelector('.submit-button');
var $entriesScreen = document.querySelector('.entries-screen');
var $createCompTwo = document.querySelector('.create-comp');
var $entriesList = document.querySelector('.entries-container');
var agentComp = [];

// get started button
$start.addEventListener('click', handleStart);
function handleStart(event) {
  $header.className = 'header';
  $agentScreen.className = 'agents-screen';
  $mainScreen.className = 'main-screen hidden';
  $detailsScreen.className = 'agent-details hidden';
  data.listDisplay = true;

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://valorant-api.com/v1/agents');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    // agent list screen
    for (var i = 0; i < xhr.response.data.length; i++) {
      if (xhr.response.data[i].isPlayableCharacter === true) {
        var $li = document.createElement('li');
        $li.setAttribute('class', 'agent-list-item');
        var $icon = document.createElement('img');
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
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://valorant-api.com/v1/agents');
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      // AGENT LIST SCREEN
      for (var i = 0; i < xhr.response.data.length; i++) {
        if (xhr.response.data[i].isPlayableCharacter === true) {
          var $li = document.createElement('li');
          $li.setAttribute('class', 'agent-list-item');
          var $icon = document.createElement('img');
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

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://valorant-api.com/v1/agents');
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {

      // agent details screen
      var id = event.target.id;
      if (data.detailsDisplay === false) {
        if (xhr.response.data[id].isPlayableCharacter === true) {
          $agentName.textContent = xhr.response.data[id].displayName;
          $roleName.textContent = xhr.response.data[id].role.displayName;
          $agentPortrait.setAttribute('src', xhr.response.data[id].fullPortraitV2);
          $detailText.textContent = xhr.response.data[id].description;

          for (var j = 0; j < xhr.response.data[id].abilities.length; j++) {
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
          for (j = 0; j < xhr.response.data[id].abilities.length; j++) {
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
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://valorant-api.com/v1/agents');
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      // agent comp list screen
      for (var i = 0; i < xhr.response.data.length; i++) {
        if (xhr.response.data[i].isPlayableCharacter === true) {
          var $li = document.createElement('li');
          $li.setAttribute('class', 'agent-list-item');
          var $icon = document.createElement('img');
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
      var firstIcon = event.target;
      var firstIconCopy = firstIcon.cloneNode();
      $selectContainers[0].appendChild(firstIconCopy);
      agentComp.push(event.target);
    } else if ($selectContainers[1].childElementCount === 0) {
      var secondIcon = event.target;
      var secondIconCopy = secondIcon.cloneNode();
      $selectContainers[1].appendChild(secondIconCopy);
      agentComp.push(event.target);
    } else if ($selectContainers[2].childElementCount === 0) {
      var thirdIcon = event.target;
      var thirdIconCopy = thirdIcon.cloneNode();
      $selectContainers[2].appendChild(thirdIconCopy);
      agentComp.push(event.target);
    } else if ($selectContainers[3].childElementCount === 0) {
      var fourthIcon = event.target;
      var fourthIconCopy = fourthIcon.cloneNode();
      $selectContainers[3].appendChild(fourthIconCopy);
      agentComp.push(event.target);
    } else if ($selectContainers[4].childElementCount === 0) {
      var fifthIcon = event.target;
      var fifthIconCopy = fifthIcon.cloneNode();
      $selectContainers[4].appendChild(fifthIconCopy);
      agentComp.push(event.target);
    }
  }
}

// remove agent from team comp selector
$compSelect.addEventListener('click', removeAgent);
function removeAgent(event) {
  if (event.target.tagName === 'IMG') {
    for (var i = 0; i < $selectContainers.length; i++) {
      if (parseInt(event.target.parentNode.id) === i) {
        if ($selectContainers[i].childElementCount !== 0) {
          $selectContainers[i].removeChild(event.target);
          for (var j = 0; j < agentComp.length; j++) {
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
    var currentComp = {
      firstAgent: agentComp[0].src,
      secondAgent: agentComp[1].src,
      thirdAgent: agentComp[2].src,
      fourthAgent: agentComp[3].src,
      fifthAgent: agentComp[4].src,
      entryID: data.nextEntryId
    };
    data.nextEntryId++;
    data.agentCompList.unshift(currentComp);
    $entriesList.prepend(renderComp(currentComp));
  }
  // clear selector boxes
  for (var i = 0; i < $selectContainers.length; i++) {
    $selectContainers[i].innerHTML = '';
  }
  // clear agentComp array
  agentComp.splice(0, 5);
  $compScreen.className = 'comp-screen hidden';
  $entriesScreen.className = 'entries-screen';
}

function renderComp(agentComp) {
  var $entry = document.createElement('div');
  var $divOne = document.createElement('div');
  var $divTwo = document.createElement('div');
  var $divThree = document.createElement('div');
  var $divFour = document.createElement('div');
  var $divFive = document.createElement('div');

  $entry.setAttribute('class', 'entry');
  $divOne.setAttribute('class', 'agent-one');
  $divTwo.setAttribute('class', 'agent-two');
  $divThree.setAttribute('class', 'agent-three');
  $divFour.setAttribute('class', 'agent-four');
  $divFive.setAttribute('class', 'agent-five');

  var $firstAgentImg = document.createElement('img');
  $firstAgentImg.setAttribute('class', 'agent-icon');
  $firstAgentImg.setAttribute('src', data.agentCompList[0].firstAgent);
  $divOne.appendChild($firstAgentImg);

  var $secondAgentImg = document.createElement('img');
  $secondAgentImg.setAttribute('class', 'agent-icon');
  $secondAgentImg.setAttribute('src', data.agentCompList[0].secondAgent);
  $divTwo.appendChild($secondAgentImg);

  var $thirdAgentImg = document.createElement('img');
  $thirdAgentImg.setAttribute('class', 'agent-icon');
  $thirdAgentImg.setAttribute('src', data.agentCompList[0].thirdAgent);
  $divThree.appendChild($thirdAgentImg);

  var $fourthAgentImg = document.createElement('img');
  $fourthAgentImg.setAttribute('class', 'agent-icon');
  $fourthAgentImg.setAttribute('src', data.agentCompList[0].fourthAgent);
  $divFour.appendChild($fourthAgentImg);

  var $fifthAgentImg = document.createElement('img');
  $fifthAgentImg.setAttribute('class', 'agent-icon');
  $fifthAgentImg.setAttribute('src', data.agentCompList[0].fifthAgent);
  $divFive.appendChild($fifthAgentImg);

  $entry.appendChild($divOne);
  $entry.appendChild($divTwo);
  $entry.appendChild($divThree);
  $entry.appendChild($divFour);
  $entry.appendChild($divFive);
  $entriesList.appendChild($entry);
}
