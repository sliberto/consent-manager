'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.doNotTrack = exports.ConsentManager = exports.ConsentManagerBuilder = exports.onPreferencesSaved = exports.savePreferences = exports.loadPreferences = exports.openConsentManager = void 0
var consent_manager_builder_1 = __importDefault(require('./consent-manager-builder'))
var consent_manager_1 = __importDefault(require('./consent-manager'))
var container_1 = require('./consent-manager/container')
Object.defineProperty(exports, 'openConsentManager', {
  enumerable: true,
  get: function() {
    return container_1.openDialog
  }
})
var preferences_1 = require('./consent-manager-builder/preferences')
Object.defineProperty(exports, 'loadPreferences', {
  enumerable: true,
  get: function() {
    return preferences_1.loadPreferences
  }
})
Object.defineProperty(exports, 'savePreferences', {
  enumerable: true,
  get: function() {
    return preferences_1.savePreferences
  }
})
Object.defineProperty(exports, 'onPreferencesSaved', {
  enumerable: true,
  get: function() {
    return preferences_1.onPreferencesSaved
  }
})
exports.ConsentManagerBuilder = consent_manager_builder_1.default
exports.ConsentManager = consent_manager_1.default
function doNotTrack() {
  if (typeof window !== 'undefined' && (window.navigator || navigator)) {
    var nav = navigator
    var doNotTrackValue = nav.doNotTrack || window['doNotTrack'] || nav.msDoNotTrack
    // Normalise Firefox < 32
    // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/doNotTrack
    if (doNotTrackValue === 'yes') {
      doNotTrackValue = '1'
    } else if (doNotTrackValue === 'no') {
      doNotTrackValue = '0'
    }
    if (doNotTrackValue === '1') {
      return true
    }
    if (doNotTrackValue === '0') {
      return false
    }
  }
  return null
}
exports.doNotTrack = doNotTrack
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsc0ZBQTJDO0FBQzNDLHNFQUFrQztBQUVsQyx5REFBOEU7QUFBckUsK0dBQUEsVUFBVSxPQUFzQjtBQUN6QyxxRUFJOEM7QUFINUMsOEdBQUEsZUFBZSxPQUFBO0FBQ2YsOEdBQUEsZUFBZSxPQUFBO0FBQ2YsaUhBQUEsa0JBQWtCLE9BQUE7QUFHUCxRQUFBLHFCQUFxQixHQUFHLGlDQUFHLENBQUE7QUFDM0IsUUFBQSxjQUFjLEdBQUcseUJBQUUsQ0FBQTtBQU1oQyxTQUFnQixVQUFVO0lBRXhCLElBQUksT0FBTyxNQUFNLEtBQUssV0FBVyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsSUFBSSxTQUFTLENBQUMsRUFBRTtRQUNwRSxJQUFNLEdBQUcsR0FBRyxTQUFnQixDQUFBO1FBRTVCLElBQUksZUFBZSxHQUFHLEdBQUcsQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxZQUFZLENBQUE7UUFFaEYseUJBQXlCO1FBQ3pCLHdFQUF3RTtRQUN4RSxJQUFJLGVBQWUsS0FBSyxLQUFLLEVBQUU7WUFDN0IsZUFBZSxHQUFHLEdBQUcsQ0FBQTtTQUN0QjthQUFNLElBQUksZUFBZSxLQUFLLElBQUksRUFBRTtZQUNuQyxlQUFlLEdBQUcsR0FBRyxDQUFBO1NBQ3RCO1FBRUQsSUFBSSxlQUFlLEtBQUssR0FBRyxFQUFFO1lBQzNCLE9BQU8sSUFBSSxDQUFBO1NBQ1o7UUFDRCxJQUFJLGVBQWUsS0FBSyxHQUFHLEVBQUU7WUFDM0IsT0FBTyxLQUFLLENBQUE7U0FDYjtLQUNGO0lBRUQsT0FBTyxJQUFJLENBQUE7QUFDYixDQUFDO0FBeEJELGdDQXdCQyJ9
