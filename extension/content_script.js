(function() {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  const timeSelectorButtons = document.getElementsByClassName('time-selector-button')
  if (timeSelectorButtons && timeSelectorButtons[0]) {
    const timeSelectorButton = timeSelectorButtons[0];
    timeSelectorButton.addEventListener('DOMSubtreeModified', function () {
      console.log(timeSelectorButton.innerText);
    });
  }
})();
