var $start = document.querySelector('.start-button');
var $header = document.querySelector('header');
var $agentScreen = document.querySelector('.agents-screen');
var $mainScreen = document.querySelector('.main-screen');
var $detailsScreen = document.querySelector('.agent-details');
var $agentList = document.querySelector('.agent-list');
var $agentsButton = document.querySelector('.agents-link');
var $agentsBigButton = document.querySelector('.a-agent');
var $nameContainer = document.querySelector('.name-container');
var $portraitContainer = document.querySelector('.portrait-container');
var $detailContainer = document.querySelector('.description-container');
var $abilityContainer = document.querySelector('.abilities-container');

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
      // console.log(xhr.status);
      // console.log(xhr.response);
      // AGENT DETAILS SCREEN
      var id = event.target.id;
      if (data.display === false) {
        if (xhr.response.data[id].isPlayableCharacter === true) {
          var $h1 = document.createElement('h1');
          $h1.setAttribute('class', 'agent-name tomorrow-font');
          $h1.textContent = xhr.response.data[id].displayName;
          $nameContainer.appendChild($h1);

          var $h2 = document.createElement('h2');
          $h2.setAttribute('class', 'role-name tomorrow-font');
          $h2.textContent = xhr.response.data[id].role.displayName;
          $nameContainer.appendChild($h2);

          var $agentPortrait = document.createElement('img');
          $agentPortrait.setAttribute('class', 'agent-portrait');
          $agentPortrait.setAttribute('src', xhr.response.data[id].fullPortraitV2);
          $portraitContainer.appendChild($agentPortrait);

          var $detailText = document.createElement('p');
          $detailText.setAttribute('class', 'detail-text noto-font');
          $detailText.textContent = xhr.response.data[id].description;
          $detailContainer.appendChild($detailText);

          for (var j = 0; j < xhr.response.data[id].abilities.length; j++) {
            var $row = document.createElement('div');
            $row.setAttribute('class', 'row');

            var $abilityIconContainer = document.createElement('div');
            $abilityIconContainer.setAttribute('class', 'col-20 ability-icons');

            var $abilityIcon = document.createElement('img');
            $abilityIcon.setAttribute('class', 'ability-icon ability');
            $abilityIcon.setAttribute('src', xhr.response.data[id].abilities[j].displayIcon);
            $abilityIconContainer.appendChild($abilityIcon);
            $row.appendChild($abilityIconContainer);

            var $abilityTextContainer = document.createElement('div');
            $abilityTextContainer.setAttribute('class', 'col-80 detail-text noto-font ability-container');
            $row.appendChild($abilityTextContainer);

            var $abilityName = document.createElement('p');
            $abilityName.setAttribute('class', 'ability-name noto-font');
            $abilityName.textContent = xhr.response.data[id].abilities[j].displayName;
            $abilityTextContainer.appendChild($abilityName);

            var $abilityText = document.createElement('p');
            $abilityText.setAttribute('class', 'ability-description');
            $abilityText.textContent = xhr.response.data[id].abilities[j].description;
            $abilityTextContainer.appendChild($abilityText);

            $abilityContainer.appendChild($row);

          }
        }
        data.display = true;
      } else if (data.display === true) {
        if (xhr.response.data[id].isPlayableCharacter === true) {
          $h1 = document.querySelector('.agent-name');
          $h2 = document.querySelector('.role-name');
          $agentPortrait = document.querySelector('.agent-portrait');
          $detailText = document.querySelector('.detail-text');
          $abilityIcon = document.querySelectorAll('.ability-icon');
          $abilityName = document.querySelectorAll('.ability-name');
          $abilityText = document.querySelectorAll('.ability-description');

          $h1.textContent = xhr.response.data[id].displayName;
          $h2.textContent = xhr.response.data[id].role.displayName;
          $agentPortrait.setAttribute('src', xhr.response.data[id].fullPortraitV2);
          $detailText.textContent = xhr.response.data[id].description;

          for (var i in xhr.response.data[id].abilities) {
            i = 0;
            for (j = 0; j < xhr.response.data[id].abilities.length; j++) {
              $abilityIcon[i].setAttribute('src', xhr.response.data[id].abilities[j].displayIcon);
              $abilityName[i].textContent = xhr.response.data[id].abilities[j].displayName;
              $abilityText[i].textContent = xhr.response.data[id].abilities[j].description;
              i++;
            }
          }
        }
      }
    });
    xhr.send();
  }
}
