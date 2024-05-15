function customeOverideCategoryPreferences(categoryPreferences) {
  if (categoryPreferences.marketingAndAnalytics) {
    categoryPreferences.analytics = true
  } else {
    categoryPreferences.analytics = false
  }
  return categoryPreferences
}
function getConsentMiddleware(
  destinationPreferences,
  categoryPreferences,
  defaultDestinationBehavior
) {
  return function(_a) {
    var payload = _a.payload,
      next = _a.next
    payload.obj.context.consent = {
      defaultDestinationBehavior: defaultDestinationBehavior,
      categoryPreferences: customeOverideCategoryPreferences(categoryPreferences),
      destinationPreferences: destinationPreferences
    }
    next(payload)
  }
}
export default function conditionallyLoadAnalytics(_a) {
  var writeKey = _a.writeKey,
    destinations = _a.destinations,
    destinationPreferences = _a.destinationPreferences,
    isConsentRequired = _a.isConsentRequired,
    _b = _a.shouldReload,
    shouldReload = _b === void 0 ? true : _b,
    _c = _a.devMode,
    devMode = _c === void 0 ? false : _c,
    defaultDestinationBehavior = _a.defaultDestinationBehavior,
    categoryPreferences = _a.categoryPreferences
  var wd = window
  var integrations = { All: false, 'Segment.io': true }
  var isAnythingEnabled = false
  if (!destinationPreferences) {
    if (isConsentRequired) {
      return
    }
    // Load a.js normally when consent isn't required and there's no preferences
    if (!wd.analytics.initialized) {
      wd.analytics.load(writeKey)
    }
    return
  }
  for (var _i = 0, destinations_1 = destinations; _i < destinations_1.length; _i++) {
    var destination = destinations_1[_i]
    // Was a preference explicitly set on this destination?
    var explicitPreference = destination.id in destinationPreferences
    if (!explicitPreference && defaultDestinationBehavior === 'enable') {
      integrations[destination.id] = true
      continue
    }
    var isEnabled = Boolean(destinationPreferences[destination.id])
    if (isEnabled) {
      isAnythingEnabled = true
    }
    integrations[destination.id] = isEnabled
  }
  // Reload the page if the trackers have already been initialised so that
  // the user's new preferences can take affect
  if (wd.analytics && wd.analytics.initialized) {
    if (shouldReload) {
      window.location.reload()
    }
    return
  }
  if (devMode) {
    return
  }
  // Don't load a.js at all if nothing has been enabled
  if (isAnythingEnabled) {
    var middleware = getConsentMiddleware(
      destinationPreferences,
      categoryPreferences,
      defaultDestinationBehavior
    )
    // @ts-ignore: Analytics.JS type should be updated with addSourceMiddleware
    wd.analytics.addSourceMiddleware(middleware)
    wd.analytics.load(writeKey, { integrations: integrations })
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl0aWNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnNlbnQtbWFuYWdlci1idWlsZGVyL2FuYWx5dGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFtQkEsU0FBUyxpQ0FBaUMsQ0FBQyxtQkFBd0M7SUFDakYsSUFBSSxtQkFBbUIsQ0FBQyxxQkFBcUIsRUFBRTtRQUM3QyxtQkFBbUIsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0tBQ3RDO1NBQU07UUFDTCxtQkFBbUIsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0tBQ3ZDO0lBQ0QsT0FBTyxtQkFBbUIsQ0FBQTtBQUM1QixDQUFDO0FBQ0QsU0FBUyxvQkFBb0IsQ0FDM0Isc0JBQXNCLEVBQ3RCLG1CQUFtQixFQUNuQiwwQkFBMEI7SUFFMUIsT0FBTyxVQUFDLEVBQWlCO1lBQWYsT0FBTyxhQUFBLEVBQUUsSUFBSSxVQUFBO1FBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRztZQUM1QiwwQkFBMEIsNEJBQUE7WUFDMUIsbUJBQW1CLEVBQUUsaUNBQWlDLENBQUMsbUJBQW1CLENBQUM7WUFDM0Usc0JBQXNCLHdCQUFBO1NBQ3ZCLENBQUE7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDZixDQUFDLENBQUE7QUFDSCxDQUFDO0FBRUQsTUFBTSxDQUFDLE9BQU8sVUFBVSwwQkFBMEIsQ0FBQyxFQVNqQztRQVJoQixRQUFRLGNBQUEsRUFDUixZQUFZLGtCQUFBLEVBQ1osc0JBQXNCLDRCQUFBLEVBQ3RCLGlCQUFpQix1QkFBQSxFQUNqQixvQkFBbUIsRUFBbkIsWUFBWSxtQkFBRyxJQUFJLEtBQUEsRUFDbkIsZUFBZSxFQUFmLE9BQU8sbUJBQUcsS0FBSyxLQUFBLEVBQ2YsMEJBQTBCLGdDQUFBLEVBQzFCLG1CQUFtQix5QkFBQTtJQUVuQixJQUFNLEVBQUUsR0FBRyxNQUF1QixDQUFBO0lBQ2xDLElBQU0sWUFBWSxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUE7SUFDdkQsSUFBSSxpQkFBaUIsR0FBRyxLQUFLLENBQUE7SUFFN0IsSUFBSSxDQUFDLHNCQUFzQixFQUFFO1FBQzNCLElBQUksaUJBQWlCLEVBQUU7WUFDckIsT0FBTTtTQUNQO1FBRUQsNEVBQTRFO1FBQzVFLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRTtZQUM3QixFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtTQUM1QjtRQUNELE9BQU07S0FDUDtJQUVELEtBQTBCLFVBQVksRUFBWiw2QkFBWSxFQUFaLDBCQUFZLEVBQVosSUFBWSxFQUFFO1FBQW5DLElBQU0sV0FBVyxxQkFBQTtRQUNwQix1REFBdUQ7UUFDdkQsSUFBTSxrQkFBa0IsR0FBRyxXQUFXLENBQUMsRUFBRSxJQUFJLHNCQUFzQixDQUFBO1FBQ25FLElBQUksQ0FBQyxrQkFBa0IsSUFBSSwwQkFBMEIsS0FBSyxRQUFRLEVBQUU7WUFDbEUsWUFBWSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUE7WUFDbkMsU0FBUTtTQUNUO1FBRUQsSUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ2pFLElBQUksU0FBUyxFQUFFO1lBQ2IsaUJBQWlCLEdBQUcsSUFBSSxDQUFBO1NBQ3pCO1FBQ0QsWUFBWSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUE7S0FDekM7SUFFRCx3RUFBd0U7SUFDeEUsNkNBQTZDO0lBQzdDLElBQUksRUFBRSxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRTtRQUM1QyxJQUFJLFlBQVksRUFBRTtZQUNoQixNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFBO1NBQ3pCO1FBQ0QsT0FBTTtLQUNQO0lBRUQsSUFBSSxPQUFPLEVBQUU7UUFDWCxPQUFNO0tBQ1A7SUFFRCxxREFBcUQ7SUFDckQsSUFBSSxpQkFBaUIsRUFBRTtRQUNyQixJQUFNLFVBQVUsR0FBRyxvQkFBb0IsQ0FDckMsc0JBQXNCLEVBQ3RCLG1CQUFtQixFQUNuQiwwQkFBMEIsQ0FDM0IsQ0FBQTtRQUNELDJFQUEyRTtRQUMzRSxFQUFFLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBRTVDLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLFlBQVksY0FBQSxFQUFFLENBQUMsQ0FBQTtLQUM5QztBQUNILENBQUMifQ==
