function fetchAsync (url) {
  fetch(url).then(function (response) {
    // The API call was successful!
    return response.json();
  }).catch(function (err) {
    // There was an error
    console.warn('Something went wrong.', err);
  });
}


function createTable() {
  let colNames = [
    'name',
    'cost of case',
    'cost of key',
    'Average mill-spec',
    'Average restricted',
    'Average classified',
    'Average covert',
    'Average special',
    'average return',
    'roi'
  ];
  
  let colNamesFormatted = [
    'Name of Case',
    'Cost of Case ($)',
    'Cost of Key ($)',
    'Average Mill-spec ($)',
    'Average Restricted ($)',
    'Average Classified ($)',
    'Average Covert ($)',
    'Average Special ($)',
    'Average Return on case ($)',
    'Return on Investment (%)'
  ];

  let table = document.createElement("table");
  table.className = "responsive-table";
  let caption = table.createCaption();
  caption.innerHTML = "Csgo Weapon Case Details<br><div class=\"lowercap\">How this table was calculated can be <a href=\"https://github.com/jonese1234/Csgo-Case-Data#how-the-statistics-for-the-csgo-case-details-are-calculated\" rel=\"external\">found here.</a></div>";
  let thead = table.createTHead();
  let tr = thead.insertRow(-1);
  tr.className = "table-head";
  for (let i = 0; i < colNamesFormatted.length; i++) {
    let th = document.createElement("th");// TABLE HEADER.
    th.innerHTML = colNamesFormatted[i];
    tr.appendChild(th);
  }
  let tbody = table.createTBody();
  tr = tbody.insertRow(-1);
  tbody.className = "table-body";

  //let my_JSON_object = JSON.parse(fetchAsync("https://raw.githubusercontent.com/jonese1234/Csgo-Case-Data/master/latest.json"));
  //let my_JSON_object = fetchAsync("/data/latest.json");

  fetch("https://raw.githubusercontent.com/jonese1234/Csgo-Case-Data/master/latest.json").then(function (response) {
    // The API call was successful!
    return response.json();
  }).then(function (my_JSON_object){
    let cases =  my_JSON_object["cases"];
    for (let i = 0; i < Object.keys(cases).length; i++) {
      tr = tbody.insertRow(-1);
      for (let j = 0; j < colNames.length; j++) {
        let _case = cases[Object.keys(cases)[i]];
        let value = _case[colNames[j]];
        if (typeof value === "string"){
          let th = document.createElement("th");// TABLE HEADER.
          th.scope = "row";
          th.innerHTML = value;
          tr.appendChild(th);
        }
        else{
          let tabCell = tr.insertCell(-1);
          tabCell.innerHTML = value.toFixed(2);
        }
      }
    }
    
    // Add footer
    let footer = table.createTFoot();
    let trFoot = footer.insertRow(-1);
    let tabCellFoot = trFoot.insertCell(-1);
    tabCellFoot.colSpan = "7";
    let date = my_JSON_object["timestamp"];
    let footerTextHtml = "Sources: <a href=\"https://github.com/jonese1234/Csgo-Case-Data\" rel=\"external\">Csgo Case Data</a> &amp; <a href=\"https://csgobackpack.net/api/\" rel=\"external\">Csgo Backpack.net</a>. Data is current as of " + date.toString();
    tabCellFoot.innerHTML = footerTextHtml;

    let divContainer = document.getElementById("table-container");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
  }).catch(function (err) {
    // There was an error
    console.warn('Something went wrong.', err);
  });

}

createTable();
