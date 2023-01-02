var xhttp = new XMLHttpRequest();
myTable = document.getElementById("targetTable");
let cells;
const search = document.querySelector("#search input");
const table_headings = document.querySelectorAll("thead th");
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    bringData = JSON.parse(xhttp.responseText);
    buildTable();
  }
};
xhttp.open("GET", "movies.json", true);
xhttp.send();
function buildTable() {
  let table = "";
  for (let i = 0; i < bringData.length; i++) {
    let ActorsList = "";
    for (let j = 0; j < bringData[i].Actors.length; j++) {
      ActorsList += `
          <ul>
          ${bringData[i].Actors[j].name} , ${bringData[i].Actors[j].nationality}
          </ul>
          `;
    }
    table += `
      <tr>
      <td>${bringData[i].Title}</td>
      <td>${bringData[i].Director}</td>
      <td>${bringData[i].Runtime}</td>
      <td>${bringData[i].Year}</td>
      <td><img src="${bringData[i].Poster}" class="size"></td>
      <td>${bringData[i].Festivals}</td>
      <td>${ActorsList}</td>
      </tr>
      `;
  }
  document.getElementById("Fulfill").innerHTML = table;
  cells = document.querySelectorAll("tbody tr");
  console.log(cells);
  return cells;
}

search.addEventListener("input", searchTable);
function searchTable() {
  cells.forEach((row, i) => {
    // console.log(row.textContent);
    let table_data = row.textContent;
    search_data = search.value;
    row.classList.toggle("hide", table_data.indexOf(search_data) < 0);
    row.style.setProperty("--delay", i / 25 + "s");
    console.log(table_data.indexOf(search_data));
  });
}
table_headings.forEach((head, i) => {
  let sort_asc = true;
  head.onclick = () => {
    table_headings.forEach((head) => head.classList.remove("active"));
    head.classList.add("active");
    head.classList.toggle("asc", sort_asc);
    sort_asc = head.classList.contains("asc") ? false : true;
    sort_Table(i, sort_asc);
  };
});

function sort_Table(column, sort_asc) {
  [...cells]
    .sort((a, z) => {
      let first_row = a
        .querySelectorAll("td")
        [column].textContent.toLowerCase();
      second_row = z.querySelectorAll("td")[column].textContent.toLowerCase();
      return sort_asc
        ? first_row < second_row
          ? 1
          : -1
        : first_row < second_row
        ? -1
        : 1;
    })
    .map((sorted_row) =>
      document.querySelector("tbody").appendChild(sorted_row)
    );
}
console.log(myTable);
console.log(cells);