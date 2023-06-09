var isAdvancedUpload = function() {
  var div = document.createElement('div');
  return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
}();

let draggableFileArea = document.querySelector(".drag-file-area");
let browseFileText = document.querySelector(".browse-files");
let uploadIcon = document.querySelector(".upload-icon");
let dragDropText = document.querySelector(".dynamic-message");
let fileInput = document.querySelector(".default-file-input");
let cannotUploadMessage = document.querySelector(".cannot-upload-message");
let cannotUploadMessageError = document.querySelector(".cannot-upload-message-error");

let cancelAlertButton = document.querySelector(".cancel-alert-button");
let cancelAlertButton2 = document.querySelector(".cancel-alert-button2");

let uploadedFile = document.querySelector(".file-block");
let fileName = document.querySelector(".file-name");
let fileSize = document.querySelector(".file-size");
let progressBar = document.querySelector(".progress-bar");
let removeFileButton = document.querySelector(".remove-file-icon");
let uploadButton = document.querySelector(".upload-button");
let uploadReload = document.querySelector(".upload-button-reload");
let fileFlag = 0;
let URLPOST = "https://g2c0586b3c2559e-gtc.adb.us-ashburn-1.oraclecloudapps.com/ords/lecleire/utilidades//upload/";
fileInput.addEventListener("click", () => {
	fileInput.value = '';
	console.log(fileInput.value);
});

fileInput.addEventListener("change", e => {
	console.log(" > " + fileInput.value)
	//document.querySelector(".label").innerHTML = `drag & drop or <span class="browse-files"> <input type="file" class="default-file-input" style=""/> <span class="browse-files-text" style="top: 0;"> browse file</span></span>`;
	///uploadButton.innerHTML = `Subir`;
	fileName.innerHTML = fileInput.files[0].name;
	fileSize.innerHTML = (fileInput.files[0].size/1024).toFixed(1) + " KB";
	uploadedFile.style.cssText = "display: table-cell;";
	progressBar.style.width = 0;
	fileFlag = 0;








});


function uploadChunk(filename, blob,miniType) {
    //Generamos los datos e enviar que llevan...
    var status = 0;
    var frmData = new FormData();
    frmData.append('file', blob);
    var xhr = new XMLHttpRequest();
    var urlParam = "?FILENAME="+filename+"&FILE_MIMETYPE="+miniType ;
    xhr.open('POST', URLPOST + urlParam, true);
    xhr.data
    xhr.send(frmData);
    xhr.onreadystatechange = function() {
        console.log(this.status);
        status = this.status;
        console.log(xhr.responseText);
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log(xhr.responseText);
        }

    }

    return status;
}

uploadButton.addEventListener("click", () => {
console.log("Subir archivo");
	let isFileUploaded = fileInput.value;
	if(isFileUploaded != '') {
		if (fileFlag == 0) {
    		fileFlag = 1;
    		var width = 0;
    		var id = setInterval(frame, 50);
    		function frame() {
      			if (width >= 390) {
        			clearInterval(id);

        			 var blob = fileInput.files[0];
                     var filename = fileInput.files[0].name;
                     var miniType = fileInput.files[0].type;
                     //var status =  uploadChunk(filename,blob, miniType);
                     var status = 0;
                         var frmData = new FormData();
                         frmData.append('file', blob);
                         var xhr = new XMLHttpRequest();
                         var urlParam = "?FILENAME="+filename+"&FILE_MIMETYPE="+miniType ;
                         xhr.open('POST', URLPOST + urlParam, true);
                         xhr.data
                         xhr.send(frmData);
                         xhr.onreadystatechange = function() {
                             status = this.status;
                             console.log(xhr.responseText);
                             if (xhr.readyState == XMLHttpRequest.DONE) {
                                 console.log(xhr.responseText);
                             }

                              if (status == 201){
                                console.log("bien");

                                uploadIcon.innerHTML = 'check_circle';
                                dragDropText.innerHTML = '¡Archivo subido con éxito!';
                               	uploadReload.style.cssText = "display: block;";
                                uploadButton.style.cssText = "display: none;";
                             	  uploadButton.innerHTML = `<span class="material-icons-outlined upload-button-icon"> check_circle </span> Subido`;
                              }else {
                             	cannotUploadMessageError.style.cssText = "display: flex; animation: fadeIn linear 1.5s;";

               				 }

                         }


      			} else {
        			width += 5;
        			progressBar.style.width = width + "px";
      			}

    		}


  		}
	} else {
		cannotUploadMessage.style.cssText = "display: flex; animation: fadeIn linear 1.5s;";
	}
});

uploadReload.addEventListener("click", () => {
 location.reload();
});

cancelAlertButton.addEventListener("click", () => {
	cannotUploadMessage.style.cssText = "display: none;";

});
cancelAlertButton2.addEventListener("click", () => {
    cannotUploadMessageError.style.cssText = "display: none;";

});



if(isAdvancedUpload) {
	["drag", "dragstart", "dragend", "dragover", "dragenter", "dragleave", "drop"].forEach( evt =>
		draggableFileArea.addEventListener(evt, e => {
			e.preventDefault();
			e.stopPropagation();
		})
	);

	["dragover", "dragenter"].forEach( evt => {
		draggableFileArea.addEventListener(evt, e => {
			e.preventDefault();
			e.stopPropagation();
			uploadIcon.innerHTML = 'file_download';
			dragDropText.innerHTML = '¡Coloca tu archivo aquí!';
		});
	});

	draggableFileArea.addEventListener("drop", e => {
	console.log("entro");

		//uploadIcon.innerHTML = 'check_circle';
		//dragDropText.innerHTML = '¡Archivo subido con éxito!';
		//document.querySelector(".label").innerHTML = `drag & drop or <span class="browse-files"> <input type="file" class="default-file-input" style=""/> <span class="browse-files-text" style="top: -23px; left: -20px;"> browse file</span> </span>`;
		uploadButton.innerHTML = `Subir`;

		let files = e.dataTransfer.files;
		fileInput.files = files;
		console.log(files[0].name + " " + files[0].size);
		console.log(document.querySelector(".default-file-input").value);
		fileName.innerHTML = files[0].name;
		fileSize.innerHTML = (files[0].size/1024).toFixed(1) + " KB";
		uploadedFile.style.cssText = "display: flex;";
		progressBar.style.width = 0;
		fileFlag = 0;
	});
}


removeFileButton.addEventListener("click", () => {
console.log("entrorem");
	uploadedFile.style.cssText = "display: none;";
	fileName.innerHTML = "";
    fileSize.innerHTML = " KB";
	fileInput.value = '';
	uploadIcon.innerHTML = 'file_upload';
	dragDropText.innerHTML = 'Arrastra y suelta tu archivo aquí';
	//document.querySelector(".label").innerHTML = `or <span class="browse-files"> <input type="file" class="default-file-input"/> <span class="browse-files-text">browse file</span> <span>from device</span> </span>`;
	uploadButton.innerHTML = `Subir`;
});

//SUBIR ARCHIVO
