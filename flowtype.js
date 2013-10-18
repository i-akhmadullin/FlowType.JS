/*
* If you create a derivative, please leave this text intact:
*
* FlowTypeVanilla.JS 1.0
* Copyright (c) 2013, Simple Focus http://simplefocus.com/
*
* FlowType.JS by Simple Focus (http://simplefocus.com/)
* is licensed under the MIT License. Read a copy of the
* license in the LICENSE.txt file or at
* http://choosealicense.com/licenses/mit
*
* Thanks to Giovanni Difeterici (http://www.gdifeterici.com/)
*/

function flowtype(els, options) {

// Establish default settings/variables
// ====================================
   this.settings = {
      maximum   : 9999,
      minimum   : 1,
      maxFont   : 9999,
      minFont   : 1,
      fontRatio : 35,
      lineRatio : 1.45
   };
   var settings = this.settings;
   for ( var i in options ) {
      this.settings[i] = options[i];
   }

// Do the magic math
// =================
   function changes(e,el) {
      var elw = parseInt(document.defaultView.getComputedStyle(el, null).getPropertyValue('width'),10), //em, rem?
         width = elw > settings.maximum ? settings.maximum : elw < settings.minimum ? settings.minimum : elw,
         fontBase = width / settings.fontRatio,
         fontSize = fontBase > settings.maxFont ? settings.maxFont : fontBase < settings.minFont ? settings.minFont : fontBase;

      el.style.fontSize = fontSize + 'px';
      el.style.lineHeight = fontSize * settings.lineRatio + 'px';
   }

// Make the magic visible
// ======================
   for (var j = 0; j < els.length; j++) {
      (function (el) {
         changes(null, el);
         window.addEventListener('resize', function(event) { changes(event, el); }, false);
      }(els[j]));
   }
}
