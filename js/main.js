var $start = document.querySelector('.start-button');
var $header = document.querySelector('header');
var $agentScreen = document.querySelector('.agents-screen');
var $mainScreen = document.querySelector('.main-screen');
var $detailsScreen = document.querySelector('.agent-details');
var $agentList = document.querySelector('.agent-list');
var $agentsButton = document.querySelector('.agents-link');
var $agentsBigButton = document.querySelector('.a-agent');
var $abilityIcons = document.querySelectorAll('.ability-pics');
var $abilityNames = document.querySelectorAll('.ability-name');
var $abilityTexts = document.querySelectorAll('.ability-description');
var $agentName = document.querySelector('.agent-name');
var $roleName = document.querySelector('.role-name');
var $agentPortrait = document.querySelector('.agent-portrait');
var $detailText = document.querySelector('.detail-text');

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

$start.addEventListener('click', handleStart);
$agentsButton.addEventListener('click', handleStart);
$agentsBigButton.addEventListener('click', handleStart);

function handleStart(event) {
  $header.className = 'header';
  $agentScreen.className = 'agents-screen';
  $mainScreen.className = 'main-screen hidden';
  $detailsScreen.className = 'agent-details hidden';
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
      if (data.display === false) {
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
        data.display = true;
      } else if (data.display === true) {
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
