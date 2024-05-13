class SessionTimeout {
  constructor() {
    // Set the session timeout in milliseconds
    this.sessionTimeout = 1_200_000; // 20 minutes
    this.timeoutWarning;
    this.timeout;
    this.counter;
  }

  startSession() {
    // Start session timer
    this.timeout = setTimeout(this.logout, this.sessionTimeout);
    // Start warning timer
    this.timeoutWarning = setTimeout(() => {
      this.displayWarning(this);
    }, this.sessionTimeout - 60_000);
  }

  displayWarning(that) {
    // Show the warning
    document.getElementById("session-timeout-container").style.display = "grid";
    let count = 60;

    that.counter = setInterval(() => {
      timer(that.logout, that);
    }, 1000); //Run it every 1 second

    function timer(handler, that) {
      count = count - 1;
      if (count <= 0) {
        clearInterval(counter);
        if (typeof handler === "function") handler.call(that);
        return;
      }

      document.getElementById("timer").innerHTML = count + " "; // watch for spelling
    }
  }

  hideWarning() {
    // Hide the warning
    document.getElementById("session-timeout-container").style.display = "none";
  }

  logout() {
    this.hideWarning();
    alert("Session expired. You will be logged out.");
    window.location.replace("https://pch.com");
  }

  continueSession() {
    clearInterval(this.counter);
    this.hideWarning();
    alert("Continue with session.");
    this.startSession();
  }

  resetTimeout() {
    // Reset session and warning timers
    clearTimeout(this.timeout);
    clearTimeout(this.timeoutWarning);
  
    // Restart timers
    this.startSession();
  
    // Hide the warning
    this.hideWarning();
  }
}

var sessionTimeout = new SessionTimeout();
sessionTimeout.startSession();

const logoutSession = (event) => {
  event.preventDefault();
  sessionTimeout.logout();
};

const continueSession = (event) => {
  event.preventDefault();
  sessionTimeout.continueSession();
};

//document.addEventListener("mousemove", sessionTimeout.resetTimeout);
//document.addEventListener("keydown",  sessionTimeout.resetTimeout);
