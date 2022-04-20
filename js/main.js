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
var $abilityOneIconContainer = document.querySelector('.ability-icons-one');
var $abilityOneContainer = document.querySelector('.ability-one-container');
var $abilityTwoIconContainer = document.querySelector('.ability-icons-two');
var $abilityTwoContainer = document.querySelector('.ability-two-container');
var $abilityThreeIconContainer = document.querySelector('.ability-icons-three');
var $abilityThreeContainer = document.querySelector('.ability-three-container');
var $abilityFourIconContainer = document.querySelector('.ability-icons-four');
var $abilityFourContainer = document.querySelector('.ability-four-container');

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

          var $abilityOneIcon = document.createElement('img');
          $abilityOneIcon.setAttribute('class', 'ability-one-icon ability');
          $abilityOneIconContainer.appendChild($abilityOneIcon);

          var $abilityOneName = document.createElement('p');
          $abilityOneName.setAttribute('class', 'ability-name ability-one-name noto-font');
          $abilityOneContainer.appendChild($abilityOneName);

          var $abilityOneText = document.createElement('p');
          $abilityOneText.setAttribute('class', 'ability-description ability-description-one');
          $abilityOneContainer.appendChild($abilityOneText);

          var $abilityTwoIcon = document.createElement('img');
          $abilityTwoIcon.setAttribute('class', 'ability-two-icon ability');
          $abilityTwoIconContainer.appendChild($abilityTwoIcon);

          var $abilityTwoName = document.createElement('p');
          $abilityTwoName.setAttribute('class', 'ability-name ability-two-name noto-font');
          $abilityTwoContainer.appendChild($abilityTwoName);

          var $abilityTwoText = document.createElement('p');
          $abilityTwoText.setAttribute('class', 'ability-description ability-description-two');
          $abilityTwoContainer.appendChild($abilityTwoText);

          var $abilityThreeIcon = document.createElement('img');
          $abilityThreeIcon.setAttribute('class', 'ability-three-icon ability');
          $abilityThreeIconContainer.appendChild($abilityThreeIcon);

          var $abilityThreeName = document.createElement('p');
          $abilityThreeName.setAttribute('class', 'ability-name ability-three-name noto-font');
          $abilityThreeContainer.appendChild($abilityThreeName);

          var $abilityThreeText = document.createElement('p');
          $abilityThreeText.setAttribute('class', 'ability-description ability-description-three');
          $abilityThreeContainer.appendChild($abilityThreeText);

          var $abilityFourIcon = document.createElement('img');
          $abilityFourIcon.setAttribute('class', 'ability-four-icon ability');
          $abilityFourIconContainer.appendChild($abilityFourIcon);

          var $abilityFourName = document.createElement('p');
          $abilityFourName.setAttribute('class', 'ability-name ability-four-name noto-font');
          $abilityFourContainer.appendChild($abilityFourName);

          var $abilityFourText = document.createElement('p');
          $abilityFourText.setAttribute('class', 'ability-description ability-description-four');
          $abilityFourContainer.appendChild($abilityFourText);

          for (var j = 0; j < xhr.response.data[id].abilities.length; j++) {
            if (j === 0) {
              $abilityOneIcon.setAttribute('src', xhr.response.data[id].abilities[j].displayIcon);
              $abilityOneName.textContent = xhr.response.data[id].abilities[j].displayName;
              $abilityOneText.textContent = xhr.response.data[id].abilities[j].description;
            } else if (j === 1) {
              $abilityTwoIcon.setAttribute('src', xhr.response.data[id].abilities[j].displayIcon);
              $abilityTwoName.textContent = xhr.response.data[id].abilities[j].displayName;
              $abilityTwoText.textContent = xhr.response.data[id].abilities[j].description;
            } else if (j === 2) {
              $abilityThreeIcon.setAttribute('src', xhr.response.data[id].abilities[j].displayIcon);
              $abilityThreeName.textContent = xhr.response.data[id].abilities[j].displayName;
              $abilityThreeText.textContent = xhr.response.data[id].abilities[j].description;
            } else if (j === 3) {
              $abilityFourIcon.setAttribute('src', xhr.response.data[id].abilities[j].displayIcon);
              $abilityFourName.textContent = xhr.response.data[id].abilities[j].displayName;
              $abilityFourText.textContent = xhr.response.data[id].abilities[j].description;
            }
          }

          data.display = true;
        }
      } else if (data.display === true) {
        if (xhr.response.data[id].isPlayableCharacter === true) {

          $h1 = document.querySelector('.agent-name');
          $h2 = document.querySelector('.role-name');
          $agentPortrait = document.querySelector('.agent-portrait');
          $detailText = document.querySelector('.detail-text');
          $abilityOneIcon = document.querySelector('.ability-one-icon');
          $abilityOneName = document.querySelector('.ability-one-name');
          $abilityOneText = document.querySelector('.ability-description-one');
          $abilityTwoIcon = document.querySelector('.ability-two-icon');
          $abilityTwoName = document.querySelector('.ability-two-name');
          $abilityTwoText = document.querySelector('.ability-description-two');
          $abilityThreeIcon = document.querySelector('.ability-three-icon');
          $abilityThreeName = document.querySelector('.ability-three-name');
          $abilityThreeText = document.querySelector('.ability-description-three');
          $abilityFourIcon = document.querySelector('.ability-four-icon');
          $abilityFourName = document.querySelector('.ability-four-name');
          $abilityFourText = document.querySelector('.ability-description-four');

          $h1.textContent = xhr.response.data[id].displayName;
          $h2.textContent = xhr.response.data[id].role.displayName;
          $agentPortrait.setAttribute('src', xhr.response.data[id].fullPortraitV2);
          $detailText.textContent = xhr.response.data[id].description;

          for (j = 0; j < xhr.response.data[id].abilities.length; j++) {
            if (j === 0) {
              $abilityOneIcon.setAttribute('src', xhr.response.data[id].abilities[j].displayIcon);
              $abilityOneName.textContent = xhr.response.data[id].abilities[j].displayName;
              $abilityOneText.textContent = xhr.response.data[id].abilities[j].description;
            } else if (j === 1) {
              $abilityTwoIcon.setAttribute('src', xhr.response.data[id].abilities[j].displayIcon);
              $abilityTwoName.textContent = xhr.response.data[id].abilities[j].displayName;
              $abilityTwoText.textContent = xhr.response.data[id].abilities[j].description;
            } else if (j === 2) {
              $abilityThreeIcon.setAttribute('src', xhr.response.data[id].abilities[j].displayIcon);
              $abilityThreeName.textContent = xhr.response.data[id].abilities[j].displayName;
              $abilityThreeText.textContent = xhr.response.data[id].abilities[j].description;
            } else if (j === 3) {
              $abilityFourIcon.setAttribute('src', xhr.response.data[id].abilities[j].displayIcon);
              $abilityFourName.textContent = xhr.response.data[id].abilities[j].displayName;
              $abilityFourText.textContent = xhr.response.data[id].abilities[j].description;
            }
          }
        }
      }
    });
    xhr.send();
  }
}
