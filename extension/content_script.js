(function() {
  // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_second_WebExtension
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;
  const forbiddenTimeControls = [
    '1 min',
    '1 | 1',
    '2 | 1',
    '3 min',
    '3 | 2',
    '5 min',
  ];

  const timeSelectorButtons = document.getElementsByClassName('time-selector-button')
  const largeButtons = document.getElementsByClassName(
    'ui_v5-button-component ui_v5-button-primary ui_v5-button-large ui_v5-button-full',
  );
  const playButton = largeButtons && largeButtons[0];
  const timeSelectorButton = timeSelectorButtons[0];

  // https://stackoverflow.com/questions/7381293/how-to-intercept-innerhtml-changes-in-javascript
  timeSelectorButton.addEventListener('DOMSubtreeModified', function () {
    const timeControl = timeSelectorButton.innerText;
    if (forbiddenTimeControls.includes(timeControl)) {
      playButton.disabled = true;
      playButton.style.backgroundColor = 'grey';
    } else {
      playButton.disabled = false;
      playButton.style.backgroundColor = '';
    }
  });
})();
