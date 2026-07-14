/**
 * JULIAN MÜHL — Premium Link-in-Bio Landingpage
 * script.js
 *
 * Diese Datei ist bewusst klein gehalten: Sie steuert ausschließlich die
 * dezente Eintritts-Animation beim Laden der Seite. Es werden keine
 * externen Bibliotheken verwendet.
 *
 * Ablauf:
 * 1. Header blendet sanft ein.
 * 2. Buttons folgen nacheinander mit kleinem Fade-Up (versetzte Verzögerung).
 * 3. Social-Icons erscheinen zuletzt.
 *
 * Nutzer:innen mit aktivierter "reduzierte Bewegung"-Einstellung
 * (prefers-reduced-motion) bekommen keine Animation — die entsprechende
 * CSS-Regel in styles.css blendet in diesem Fall alles sofort sichtbar ein.
 */

(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  /**
   * Verzögerung (in Millisekunden) zwischen dem Einblenden
   * aufeinanderfolgender Buttons. Klein halten für ein ruhiges,
   * hochwertiges Gefühl statt einer verspielten Kaskade.
   */
  var BUTTON_STAGGER_MS = 70;
  var BASE_DELAY_MS = 120;

  function revealHeader() {
    var header = document.querySelector('[data-animate="header"]');
    if (header) {
      header.classList.add('is-visible');
    }
  }

  function revealButtons() {
    var buttons = document.querySelectorAll('[data-animate="button"]');
    buttons.forEach(function (button, index) {
      var delay = prefersReducedMotion
        ? 0
        : BASE_DELAY_MS + index * BUTTON_STAGGER_MS;

      window.setTimeout(function () {
        button.classList.add('is-visible');
      }, delay);
    });
    return buttons.length;
  }

  function revealSocialIcons(afterButtonsCount) {
    var social = document.querySelector('[data-animate="social"]');
    if (!social) return;

    var delay = prefersReducedMotion
      ? 0
      : BASE_DELAY_MS + afterButtonsCount * BUTTON_STAGGER_MS + 120;

    window.setTimeout(function () {
      social.classList.add('is-visible');
    }, delay);
  }

  function init() {
    revealHeader();
    var buttonCount = revealButtons();
    revealSocialIcons(buttonCount);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
