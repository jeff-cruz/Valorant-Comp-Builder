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
}

$agentsButton.addEventListener('click', agentsButton);
$agentsBigButton.addEventListener('click', agentsButton);

function agentsButton(event) {
  $agentScreen.className = 'agents-screen';
  $detailsScreen.className = 'agent-details hidden';
  $compScreen.className = 'comp-screen hidden';

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

$agentList.addEventListener('click', agentDetails);
function agentDetails(event) {
  if (event.target.tagName === 'IMG') {
    $agentScreen.className = 'agents-screen hidden';
    $detailsScreen.className = 'agent-details';

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://valorant-api.com/v1/agents');
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {

      // AGENT DETAILS SCREEN
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

$createComp.addEventListener('click', createComp);
function createComp(event) {
  $agentScreen.className = 'agents-screen hidden';
  $compScreen.className = 'comp-screen';

  if (data.compListDisplay === false) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://valorant-api.com/v1/agents');
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      // AGENT COMP LIST SCREEN
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

$agentCompList.addEventListener('click', agentSelect);
function agentSelect(event) {
  if (event.target.tagName === 'IMG') {
    if ($selectContainers[0].childElementCount === 0) {
      event.target.parentNode.remove();
      $selectContainers[0].appendChild(event.target);
    } else if ($selectContainers[1].childElementCount === 0) {
      event.target.parentNode.remove();
      $selectContainers[1].appendChild(event.target);
    } else if ($selectContainers[2].childElementCount === 0) {
      event.target.parentNode.remove();
      $selectContainers[2].appendChild(event.target);
    } else if ($selectContainers[3].childElementCount === 0) {
      event.target.parentNode.remove();
      $selectContainers[3].appendChild(event.target);
    } else if ($selectContainers[4].childElementCount === 0) {
      event.target.parentNode.remove();
      $selectContainers[4].appendChild(event.target);
    }
  }
}

$compSelect.addEventListener('click', removeAgent);
function removeAgent(event) {
  if (event.target.tagName === 'IMG') {
    for (var i = 0; i < $selectContainers.length; i++) {
      if (parseInt(event.target.parentNode.id) === i) {
        if ($selectContainers[i].childElementCount === 1) {
          var $li = document.createElement('li');
          $li.setAttribute('class', 'agent-list-item');
          $li.appendChild(event.target);
          $agentCompList.appendChild($li);
          $selectContainers[i].removeChild(event.target);
        }
      }
    }
  }
}
