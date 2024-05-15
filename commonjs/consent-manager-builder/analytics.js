"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function customeOverideCategoryPreferences(categoryPreferences) {
    if (categoryPreferences.marketingAndAnalytics) {
        categoryPreferences.analytics = true;
    }
    else {
        categoryPreferences.analytics = false;
    }
    return categoryPreferences;
}
function getConsentMiddleware(destinationPreferences, categoryPreferences, defaultDestinationBehavior) {
    return function (_a) {
        var payload = _a.payload, next = _a.next;
        payload.obj.context.consent = {
            defaultDestinationBehavior: defaultDestinationBehavior,
            categoryPreferences: customeOverideCategoryPreferences(categoryPreferences),
            destinationPreferences: destinationPreferences
        };
        next(payload);
    };
}
function conditionallyLoadAnalytics(_a) {
    var writeKey = _a.writeKey, destinations = _a.destinations, destinationPreferences = _a.destinationPreferences, isConsentRequired = _a.isConsentRequired, _b = _a.shouldReload, shouldReload = _b === void 0 ? true : _b, _c = _a.devMode, devMode = _c === void 0 ? false : _c, defaultDestinationBehavior = _a.defaultDestinationBehavior, categoryPreferences = _a.categoryPreferences;
    var wd = window;
    var integrations = { All: false, 'Segment.io': true };
    var isAnythingEnabled = false;
    if (!destinationPreferences) {
        if (isConsentRequired) {
            return;
        }
        // Load a.js normally when consent isn't required and there's no preferences
        if (!wd.analytics.initialized) {
            wd.analytics.load(writeKey);
        }
        return;
    }
    for (var _i = 0, destinations_1 = destinations; _i < destinations_1.length; _i++) {
        var destination = destinations_1[_i];
        // Was a preference explicitly set on this destination?
        var explicitPreference = destination.id in destinationPreferences;
        if (!explicitPreference && defaultDestinationBehavior === 'enable') {
            integrations[destination.id] = true;
            continue;
        }
        var isEnabled = Boolean(destinationPreferences[destination.id]);
        if (isEnabled) {
            isAnythingEnabled = true;
        }
        integrations[destination.id] = isEnabled;
    }
    // Reload the page if the trackers have already been initialised so that
    // the user's new preferences can take affect
    if (wd.analytics && wd.analytics.initialized) {
        if (shouldReload) {
            window.location.reload();
        }
        return;
    }
    if (devMode) {
        return;
    }
    // Don't load a.js at all if nothing has been enabled
    if (isAnythingEnabled) {
        var middleware = getConsentMiddleware(destinationPreferences, categoryPreferences, defaultDestinationBehavior);
        // @ts-ignore: Analytics.JS type should be updated with addSourceMiddleware
        wd.analytics.addSourceMiddleware(middleware);
        wd.analytics.load(writeKey, { integrations: integrations });
    }
}
exports.default = conditionallyLoadAnalytics;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl0aWNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnNlbnQtbWFuYWdlci1idWlsZGVyL2FuYWx5dGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQW1CQSxTQUFTLGlDQUFpQyxDQUFDLG1CQUF3QztJQUNqRixJQUFJLG1CQUFtQixDQUFDLHFCQUFxQixFQUFFO1FBQzdDLG1CQUFtQixDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUE7S0FDckM7U0FBTTtRQUNMLG1CQUFtQixDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUE7S0FDdEM7SUFDRCxPQUFPLG1CQUFtQixDQUFBO0FBQzVCLENBQUM7QUFDRCxTQUFTLG9CQUFvQixDQUMzQixzQkFBc0IsRUFDdEIsbUJBQW1CLEVBQ25CLDBCQUEwQjtJQUUxQixPQUFPLFVBQUMsRUFBaUI7WUFBZixPQUFPLGFBQUEsRUFBRSxJQUFJLFVBQUE7UUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHO1lBQzVCLDBCQUEwQiw0QkFBQTtZQUMxQixtQkFBbUIsRUFBRSxpQ0FBaUMsQ0FBQyxtQkFBbUIsQ0FBQztZQUMzRSxzQkFBc0Isd0JBQUE7U0FDdkIsQ0FBQTtRQUNELElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNmLENBQUMsQ0FBQTtBQUNILENBQUM7QUFFRCxTQUF3QiwwQkFBMEIsQ0FBQyxFQVNqQztRQVJoQixRQUFRLGNBQUEsRUFDUixZQUFZLGtCQUFBLEVBQ1osc0JBQXNCLDRCQUFBLEVBQ3RCLGlCQUFpQix1QkFBQSxFQUNqQixvQkFBbUIsRUFBbkIsWUFBWSxtQkFBRyxJQUFJLEtBQUEsRUFDbkIsZUFBZSxFQUFmLE9BQU8sbUJBQUcsS0FBSyxLQUFBLEVBQ2YsMEJBQTBCLGdDQUFBLEVBQzFCLG1CQUFtQix5QkFBQTtJQUVuQixJQUFNLEVBQUUsR0FBRyxNQUF1QixDQUFBO0lBQ2xDLElBQU0sWUFBWSxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUE7SUFDdkQsSUFBSSxpQkFBaUIsR0FBRyxLQUFLLENBQUE7SUFFN0IsSUFBSSxDQUFDLHNCQUFzQixFQUFFO1FBQzNCLElBQUksaUJBQWlCLEVBQUU7WUFDckIsT0FBTTtTQUNQO1FBRUQsNEVBQTRFO1FBQzVFLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRTtZQUM3QixFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtTQUM1QjtRQUNELE9BQU07S0FDUDtJQUVELEtBQTBCLFVBQVksRUFBWiw2QkFBWSxFQUFaLDBCQUFZLEVBQVosSUFBWSxFQUFFO1FBQW5DLElBQU0sV0FBVyxxQkFBQTtRQUNwQix1REFBdUQ7UUFDdkQsSUFBTSxrQkFBa0IsR0FBRyxXQUFXLENBQUMsRUFBRSxJQUFJLHNCQUFzQixDQUFBO1FBQ25FLElBQUksQ0FBQyxrQkFBa0IsSUFBSSwwQkFBMEIsS0FBSyxRQUFRLEVBQUU7WUFDbEUsWUFBWSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUE7WUFDbkMsU0FBUTtTQUNUO1FBRUQsSUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ2pFLElBQUksU0FBUyxFQUFFO1lBQ2IsaUJBQWlCLEdBQUcsSUFBSSxDQUFBO1NBQ3pCO1FBQ0QsWUFBWSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUE7S0FDekM7SUFFRCx3RUFBd0U7SUFDeEUsNkNBQTZDO0lBQzdDLElBQUksRUFBRSxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRTtRQUM1QyxJQUFJLFlBQVksRUFBRTtZQUNoQixNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFBO1NBQ3pCO1FBQ0QsT0FBTTtLQUNQO0lBRUQsSUFBSSxPQUFPLEVBQUU7UUFDWCxPQUFNO0tBQ1A7SUFFRCxxREFBcUQ7SUFDckQsSUFBSSxpQkFBaUIsRUFBRTtRQUNyQixJQUFNLFVBQVUsR0FBRyxvQkFBb0IsQ0FDckMsc0JBQXNCLEVBQ3RCLG1CQUFtQixFQUNuQiwwQkFBMEIsQ0FDM0IsQ0FBQTtRQUNELDJFQUEyRTtRQUMzRSxFQUFFLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBRTVDLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLFlBQVksY0FBQSxFQUFFLENBQUMsQ0FBQTtLQUM5QztBQUNILENBQUM7QUFsRUQsNkNBa0VDIn0=