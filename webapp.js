//////       NAVIGATE TO CLIENT_ID.JS AND INPUT YOUR OWN GOOGLE CLIENT ID AND GOOGLE SCRIPT URL  //////
 
 // START OF THE GETACODESCRIPT
 
 src="https://cdn.jsdelivr.net/npm/sweetalert2@11"
src="https://apis.google.com/js/api.js"

src="client_id.js">

   gapi.load('client:auth2', {
clientId: CLIENT_ID, 
});


  document.getElementById("getakey-btn").addEventListener("click", function() {
    // Check if the "access_granted" cookie exists
    var accessGranted = getCookie("access_granted");
    if (accessGranted) {
      Swal.fire({
        title: "Error",
        text: "Access already granted",
        icon: "error",
        confirmButtonText: "Close",
      });
      return; // exit the function
    }

    // If the "access_granted" cookie doesn't exist, make the request to get the access code
    var xhr = new XMLHttpRequest();
    xhr.open("GET", GOOGLE_SCRIPT); 
    xhr.send();
    xhr.onload = function() {
      var key = xhr.responseText; // get the key value
      
      if (key === 'No available keys') {
        Swal.fire({
          title: "Error",
          text: "No available keys",
          icon: "error",
          confirmButtonText: "Close",
        });
        return; // exit the function
      }
      
      // Set the "access_granted" cookie to prevent further requests
      setCookie("access_granted", "true", 1);

      Swal.fire({
        title: "Congratulation",
        text: "Your key is: " + key, // show the key in the sweetalert message
        icon: "success",
        confirmButtonText: "Close",
      });
    };
  });

  // Helper function to set a cookie
  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  }

  // Helper function to get a cookie by name
  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }



 // END OF THE GETACODESCRIPT