(function () {
  console.info('chess extension content script is called');
  /**
   * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_second_WebExtension
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    console.info('stopping here because script was already called');
    return;
  }
  console.info('chess extension is running');
  window.hasRun = true;

  const forbiddenTimeControls = [
    '1 min',
    '1 | 1',
    '2 | 1',
    '3 min',
    '3 | 2',
    '5 min',
  ];

  function disableIfForbidden() {
    const timeSelectorButtons = document.getElementsByClassName(
      'time-selector-button',
    );
    const largeButtons = document.getElementsByClassName(
      'ui_v5-button-component ui_v5-button-primary ui_v5-button-large ui_v5-button-full',
    );
    const playButton = largeButtons && largeButtons[0];
    const timeSelectorButton = timeSelectorButtons[0];
    if (!playButton) {
      console.info('play button not found');
      return;
    }
    if (!timeSelectorButton) {
      console.info('time selector button not found');
      return;
    }
    const timeControl = timeSelectorButton.innerText;
    console.info('time control is', timeControl);
    const forbidden = forbiddenTimeControls.includes(timeControl);
    console.info('time control is forbidden', forbidden);
    if (forbidden) {
      playButton.disabled = true;
      playButton.style.backgroundColor = 'grey';
    } else {
      playButton.disabled = false;
      playButton.style.backgroundColor = '';
    }
  }

  const body = document.getElementsByTagName('body')[0];
  // https://stackoverflow.com/questions/7381293/how-to-intercept-innerhtml-changes-in-javascript
  body.addEventListener('click', function () {
    disableIfForbidden();
  });
})();
