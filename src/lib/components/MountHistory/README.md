# MountHistory

`MountHistory` is required when you want to remember current active element,
pass it through unknown deep levels via context and keep a history of its
changes. Its rather useful when using transitions between panels, views or
popups.

`MountHistory` does not modify or make influence on children elements, but 
provides a context where it is available to get current active element, list of
previously mounted elements and other. To be noticed, history will be cleared
while component remounts (due to cleanup of useState and other).
