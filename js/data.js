/* exported data */
let data = {
  agentCompList: [],
  listDisplay: false,
  compListDisplay: false,
  detailsDisplay: false,
  nextEntryId: 1
};

const previousEntriesJSON = localStorage.getItem('ajax-local-storage');
if (previousEntriesJSON !== null) {
  data = JSON.parse(previousEntriesJSON);
}

// store data and switch displays off
window.addEventListener('beforeunload', beforeUnload);
function beforeUnload() {
  data.listDisplay = false;
  data.compListDisplay = false;
  data.detailsDisplay = false;
  for (let i = 0; i < data.agentCompList.length; i++) {
    data.agentCompList[i].display = false;
  }
  const entriesJSON = JSON.stringify(data);
  localStorage.setItem('ajax-local-storage', entriesJSON);
  return entriesJSON;
}
