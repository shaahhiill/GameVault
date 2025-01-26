// Check if the browser supports service workers
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/service-worker.js') // Ensure the path points to your service worker
      .then(() => console.log('Service Worker Registered'))
      .catch((err) => console.error('Service Worker Registration Failed:', err));
  }
  
  // Handle the "beforeinstallprompt" event for the install button
  let deferredPrompt;
  
  // Listen for the "beforeinstallprompt" event
  window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the mini-infobar from appearing
    event.preventDefault();
  
    // Store the event for triggering later
    deferredPrompt = event;
  
    // Show the "Install App" button
    const installButton = document.getElementById('install-button');
    installButton.style.display = 'block';
  
    // Add a click event listener to the install button
    installButton.addEventListener('click', () => {
      // Show the installation prompt
      deferredPrompt.prompt();
  
      // Wait for the user's response
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
  
        // Clear the deferred prompt variable
        deferredPrompt = null;
  
        // Hide the "Install App" button after the prompt
        installButton.style.display = 'none';
      });
    });
  });
  
  // Optional: Handle the "appinstalled" event
  window.addEventListener('appinstalled', () => {
    console.log('PWA has been installed');
  });
  