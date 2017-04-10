/**
 * Created by ajsta on 3/8/2017.
 */
// Material Design Icons:
// https://materialdesignicons.com/

function getFiles(){
    console.log("trying to get files");
    jQuery.ajax({
        url: 'upload',
        async: false,
        processData: false,
        contentType: false,
        type: 'GET',
        success: function (data){
            console.log("success");
            if(data.length != document.getElementsByClassName('file').length){
                document.getElementById('files').innerHTML = "";
                if(data === null || data.length == 0){
                    return;
                }
                data.forEach(function(data){
                    var fileName = data;
                    var fileNumber = document.getElementsByClassName('file').length + 1;
                    var fileIcon;
                    switch(fileName.substr(fileName.lastIndexOf('.') + 1)){
                        case "mp3":
                            fileIcon = "music1.png";
                    }
                    var appendString = "<div class=\"file\">";
                    appendString += "<span class=\"file-number\">" + fileNumber + "</span>";
                    appendString += "<a class=\"file-name\" " + "href=\"" + "uploads/" + fileName + "\">" + data + "</a>";
                    appendString += "</div>";
                    jQuery(appendString).hide().appendTo("#files").fadeIn("slow");
                });
            }
        }
    });
    console.log("reached end of function");
}

// Load all of the files already uploaded
// check periodically for new uploads
jQuery(document).ready(function(){
    getFiles();-+
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
            async: false,
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function(data){
                var fileName = data;
                var fileNumber = document.getElementsByClassName('file').length + 1;
                var fileIcon;
                switch(fileName.substr(fileName.lastIndexOf('.') + 1)){
                    case "mp3":
                        fileIcon = "music1.png";
                }
                var appendString = "<div class=\"file\">";
                appendString += "<span class=\"file-number\">" + fileNumber + "</span>";
                appendString += "<a class=\"file-name\" " + "href=\"" + "uploads/" + fileName + "\">" + data + "</a>";
                appendString += "</div>";
                jQuery(appendString).hide().appendTo("#files").fadeIn("slow");
            }});
    });
});

