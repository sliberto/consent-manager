import CMB from './consent-manager-builder';
import CM from './consent-manager';
export { openDialog as openConsentManager } from './consent-manager/container';
export { loadPreferences, savePreferences, onPreferencesSaved } from './consent-manager-builder/preferences';
export var ConsentManagerBuilder = CMB;
export var ConsentManager = CM;
export function doNotTrack() {
    if (typeof window !== 'undefined' && (window.navigator || navigator)) {
        var nav = navigator;
        var doNotTrackValue = nav.doNotTrack || window['doNotTrack'] || nav.msDoNotTrack;
        // Normalise Firefox < 32
        // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/doNotTrack
        if (doNotTrackValue === 'yes') {
            doNotTrackValue = '1';
        }
        else if (doNotTrackValue === 'no') {
            doNotTrackValue = '0';
        }
        if (doNotTrackValue === '1') {
            return true;
        }
        if (doNotTrackValue === '0') {
            return false;
        }
    }
    return null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxHQUFHLE1BQU0sMkJBQTJCLENBQUE7QUFDM0MsT0FBTyxFQUFFLE1BQU0sbUJBQW1CLENBQUE7QUFFbEMsT0FBTyxFQUFFLFVBQVUsSUFBSSxrQkFBa0IsRUFBRSxNQUFNLDZCQUE2QixDQUFBO0FBQzlFLE9BQU8sRUFDTCxlQUFlLEVBQ2YsZUFBZSxFQUNmLGtCQUFrQixFQUNuQixNQUFNLHVDQUF1QyxDQUFBO0FBRTlDLE1BQU0sQ0FBQyxJQUFNLHFCQUFxQixHQUFHLEdBQUcsQ0FBQTtBQUN4QyxNQUFNLENBQUMsSUFBTSxjQUFjLEdBQUcsRUFBRSxDQUFBO0FBTWhDLE1BQU0sVUFBVSxVQUFVO0lBQ3hCLElBQUksT0FBTyxNQUFNLEtBQUssV0FBVyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsSUFBSSxTQUFTLENBQUMsRUFBRTtRQUNwRSxJQUFNLEdBQUcsR0FBRyxTQUFnQixDQUFBO1FBRTVCLElBQUksZUFBZSxHQUFHLEdBQUcsQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxZQUFZLENBQUE7UUFFaEYseUJBQXlCO1FBQ3pCLHdFQUF3RTtRQUN4RSxJQUFJLGVBQWUsS0FBSyxLQUFLLEVBQUU7WUFDN0IsZUFBZSxHQUFHLEdBQUcsQ0FBQTtTQUN0QjthQUFNLElBQUksZUFBZSxLQUFLLElBQUksRUFBRTtZQUNuQyxlQUFlLEdBQUcsR0FBRyxDQUFBO1NBQ3RCO1FBRUQsSUFBSSxlQUFlLEtBQUssR0FBRyxFQUFFO1lBQzNCLE9BQU8sSUFBSSxDQUFBO1NBQ1o7UUFDRCxJQUFJLGVBQWUsS0FBSyxHQUFHLEVBQUU7WUFDM0IsT0FBTyxLQUFLLENBQUE7U0FDYjtLQUNGO0lBRUQsT0FBTyxJQUFJLENBQUE7QUFDYixDQUFDIn0=