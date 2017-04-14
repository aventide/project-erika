/**
 * Created by ajsta on 3/8/2017.
 */
// Material Design Icons:
// https://materialdesignicons.com/

// Build up HTML component to represent uploaded file box
function createFileBox(data) {
    var fileName = data;
    var fileNumber = document.getElementsByClassName('file').length + 1;
    var fileIcon = "icon-generic";
    switch (fileName.substr(fileName.lastIndexOf('.') + 1)) {
        case "mp3":
        case "flac":
            fileIcon = "icon-audio";
            break;
    }

    var appendString = "<div class=\"file " + fileIcon + "\">";
    appendString += "<div class=\"file-header\">";
    appendString += "<span class=\"file-number\">" + fileNumber + "</span>";
    appendString += "<a class=\"file-name\" " + "href=\"" + "uploads/" + fileName + "\">" + data + "</a>";
    appendString += "<img src=\"close.png\" class=\"file-delete\">";
    appendString += "</div></div>";

    jQuery(appendString).hide().appendTo("#files").fadeIn("slow");
}

// Display all uploaded files, and delete redundant copies of file boxes
function getFiles(){
    console.log("trying to get files");
    jQuery.ajax({
        url: 'upload',
        processData: false,
        contentType: false,
        type: 'GET',
        success: function (data){
            console.log("success");
            if(data.length !== document.getElementsByClassName('file').length){
                document.getElementById('files').innerHTML = "";
                if(data === null || data.length === 0){
                    return;
                }
                data.forEach(function(data){
                    createFileBox(data);
                });
            }
        }
    });
    console.log("reached end of function");
}

// Load all of the files already uploaded
// check periodically for new uploads
jQuery(document).ready(function(){
    getFiles();
    setInterval(function(){
        getFiles()
    }, 5000);
});

// Upload a new file when the user clicks the cloud button
jQuery(document).ready(function(){
    jQuery('#upload_file').submit(function (e) {
        e.preventDefault();
        var fd = new FormData(jQuery(this)[0]);
        console.log(fd);
        jQuery.ajax({
            url: '/upload',
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function(data){
                createFileBox(data);
            }});
    });
});

// Delete a file and trigger a refresh to remove file box
jQuery(document).on("click", ".file-delete", function(){
        var deleteURL = jQuery(this).parent().children()[1].innerHTML;
        jQuery.ajax({
            url: '/uploads/' + deleteURL,
            processData: false,
            type: 'DELETE',
            success: function () {
                getFiles();
            }
        });
});




