// get data from Jsonfile
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
                var myArr=JSON.parse(this.responseText)
                getmovie(myArr)
    }
};
xmlhttp.open("GET", 'film.json', true);
xmlhttp.send();

// function for Create rows 
let movies=""
function getmovie(film) {
    for (let i = 0; i < film.length; i++) {
        var acteur =""
        var festival =""
        let fes=film[i].Festivals
        let act = film[i].Acteurs
        for (let j = 0; j < fes.length; j++) {
            festival +=`<ul>
            <li> ${fes[j]} </li>
            </ul>`            
        }
        for (let x = 0; x < act.length; x++) {
            acteur +=`<ul>
            <li> ${act[x].nom} ${act[x].prénom} ${act[x].Nationalité} </li>
            </ul>`          
        }
        movies+= `<tr>
        <td>
        <img src="${film[i].Poster}" alt="img" width="100px" height="100px">
        </td>
        <td> ${film[i].Titre} </td>
        <td> ${film[i].Réalisateur} </td>
        <td> ${film[i].Lannéedeproduction} </td>
        <td> ${film[i].Durée} <span>min</span></td>
        <td> ${festival}</td>
        <td> ${acteur}</td>
       </tr> `
    }
    document.getElementById("data").innerHTML=movies
}
// =======search=======
const searchInput = document.getElementById("search");
searchInput.addEventListener("keyup", function (event) {
    const rows = document.querySelectorAll("tbody tr");
    const q = event.target.value.toLowerCase();
    rows.forEach((row) => {
        console.log(row.querySelectorAll("td")[1].innerHTML.toLowerCase());
        row.querySelectorAll("td")[1].textContent.toLowerCase().indexOf(q) >-1
        ? (row.style.display = "")
        : (row.style.display = "none");
    });
});
// ===============================   sort string    ===============================================//

function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable");
    switching = true;
   
    dir = "asc";
  
    while (switching) {
    
      switching = false;
      rows = table.rows;
   
      for (i = 1; i < (rows.length - 1); i++) {
    
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
    
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
           
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
           
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
      
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      
        switchcount ++;
      } else {
       
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }
// ====================================================   sort number   ========================================================//
function sortnb(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc"; 
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
      //start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /*Loop through all table rows (except the
      first, which contains table headers):*/
      for (i = 1; i < (rows.length - 1); i++) {
        //start by saying there should be no switching:
        shouldSwitch = false;
        /*Get the two elements you want to compare,
        one from current row and one from the next:*/
        x = parseInt(rows[i].getElementsByTagName("TD")[n].innerHTML);
        y = parseInt(rows[i + 1].getElementsByTagName("TD")[n].innerHTML);
        /*check if the two rows should switch place,
        based on the direction, asc or desc:*/
        if (dir == "asc") {
          if (x > y) {
            //if so, mark as a switch and break the loop:
            shouldSwitch= true;
            break;
          }
        } else if (dir == "desc") {
          if (x < y) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        //Each time a switch is done, increase this count by 1:
        switchcount ++;      
      } else {
        /*If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again.*/
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  };
