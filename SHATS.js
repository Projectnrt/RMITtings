// ==============================================================*/
// CREATED ENETI WARETINI */
// ==============================================================*//

/Modal =====================================================================================
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

//Open Modal onload
(function onload() {
  modal.style.display = "block";
})();

// Close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


//Drag & Drop ===============================================================================
      const fileSelector = document.getElementById('file-selector');
      const output = document.getElementById('output');
	  

      //Drag Event
      if (window.FileList && window.File) {
        fileSelector.addEventListener('dragover', event => {
          event.stopPropagation();
          event.preventDefault();
          event.dataTransfer.dropEffect = 'copy';
        });
		  
		  
		//Drop Event
        fileSelector.addEventListener('drop', event => {
          output.innerHTML = '';
          event.stopPropagation();
          event.preventDefault();
          const files = event.dataTransfer.files;
          for (let i = 0; i < files.length; i++) {
            const li = document.createElement('li');
            const file = files[i];
            const name = file.name ? file.name : 'NOT SUPPORTED';
            const type = file.type ? file.type : 'NOT SUPPORTED';
            const size = file.size ? file.size : 'NOT SUPPORTED';
            li.textContent = `name: ${name}`;
            output.appendChild(li);
          }
		
			
		//Convert drop file to text
		var reader = new FileReader();
		reader.readAsText(files[0]);
						
			
			//SHATS script ====================================================================
			reader.onload=function(){
				var importCsv;
				var attendees = [];
				
				importCsv = reader.result;
				
    			if (importCsv != null) {
        			var record_num = 9; // or however many elements there are in each row
        			var allTextLines = importCsv.split(/\r\n|\n/);
        
        			for (i = 1; i < allTextLines.length; i++) {
          				var entries = allTextLines[i].split(',');
          				var details = entries.splice(0, record_num);
          				var strippedData = [];
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

            			if (attendeeIndex[i] == j && checkbox != null) {
                			checkbox.checked = true;
            			} else if (attendeeIndex[i] != j && absence !=  null) {
             				absence.value = "N1";
            			}
        			}
    			}
			}
        });
	  }
