(function onload() {

  while (true) {
    
    //Import CSV
    var attendees = [];

    var importCsv = prompt("Copy and paste CSV here.\nPaste as many as you need.\nCancel when finished.", "");

    if (importCsv == null && importCsv == "") {
        txt = "No CSV pasted";
    } else {


        var record_num = 9; // or however many elements there are in each row
        var allTextLines = importCsv.split(/\r\n|\n/);
        

        for (i = 1; i < allTextLines.length; i++) {
          var entries = allTextLines[i].split(',');
          var details = entries.splice(0, record_num);
          var strippedData = [];
          var value = "fetchedValue";
          strippedData.push(details[0].slice(1, -1));
          strippedData.push(details[7]);

          attendees.push(strippedData)
        }
    }




    //Access Table on SATS
    var forms = document.querySelector("#classManageForm > table:nth-child(7) > tbody")
    var sats = [];
    var rows = Array.from(forms.querySelectorAll("tr"));


    for (var i = 0; i < rows.length; i++) {
      var row = [];
      var cols = rows[i].querySelectorAll("td, th");


      for (var j = 1; j < 2; j++) {
        if (i > 0 && j == 1) {
          var splitstring = cols[j].innerText.split(', ');
          var preSplit = splitstring[1] + " " + splitstring[0];
          row.push(preSplit);
        } else {
          row.push(cols[j].innerText);
        }
      }

      sats.push(row.join(","));
    }




    //Attendees to SATS Index
    var attendeeIndex = [];

    if (importCsv != null  || importCsv != "") {
        for (var i = 0; i < attendees.length; i++) {
          for (var j = 0; j < sats.length; j++) {
            if (attendees[i][0] == sats[j] && attendees[i][1] > 0) {
              attendeeIndex.push(j);
            }
          }
        }
    }




    //Tick off attendees
    var table2 = document.querySelector("#classManageForm > table:nth-child(7) > tbody")
    var rows2 = Array.from(table2.querySelectorAll("tr"));

    for (var j = 0; j < rows.length; j++) {
        for (var i = 0; i < attendeeIndex.length; i++) {
            var row = [];
            var cols = rows[j].querySelectorAll("td, th");
            var checkbox = cols[3].querySelector('input[id="attendCheck"]');
            var absence = cols[4].querySelector('select');

            console.log(absence);

            if (attendeeIndex[i] == j && checkbox != null) {
                checkbox.checked = true;
            } else if (attendeeIndex[i] != j && absence !=  null) {
             	absence.value = "N1";
            }
        }
    }

  }
})();
