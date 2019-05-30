/**
 * copy-clipboard.js
 * copy in the clipboard
 * @author zero
 * @url https://github.com/zeroHu
 */
;(function(window, undefined) {
  /**
   * the main function
   */
  function CopyClipBoard(text) {
    this.text = text;
    this.copyFn();
  }
  /**
   * copy function
   */
  CopyClipBoard.prototype.copyFn = function() {
    let value = this.text || 'please set your value in function';
    // for  Google Chrome 44 + Firefox 42+
    if (document.execCommand) {
      let textArea = document.createElement('textarea');
      // set the textarea out of the screen
      textArea.style.cssText = 'position: fixed; top: 0; left: 0; width: .1em; height: .1em; padding:0; border: none; outline: none; box-shadow: none; background: transparent;';
      // set value in the textarea
      textArea.value = value;
      // set the textarea in the page dom
      document.body.appendChild(textArea);

      textArea.focus();
      textArea.select();

      try {
        let success = document.execCommand('copy');
        let msg = success ? 'success' : 'fail';
        console.log('copy text was ' + msg);
      } catch(e) {
        console.error('something wrong in copy');
      }
      document.body.removeChild(textArea);
    }

    // ie
    else if (window.clipboardData) {
      try {
        window.clipboardData.setData("Text", value);
      } catch (e) {
        console.error('something wrong in copy');
      }
    }
  }  
  
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = CopyClipBoard;
  } else {
    this.CopyClipBoard = CopyClipBoard;
  }

})(window);