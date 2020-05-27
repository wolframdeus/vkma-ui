# MountTransition

`MountTransition` is a component which represents modified `CSSTransition`
with some predefined functionality. To be more accurate, it calculates
if component should stay in React tree after being suspended or should it
be mounted all the time. Moreover, it uses 
[GlobalStyleSheet](https://github.com/wolframdeus/vkma-ui/tree/master/src/lib/components/GlobalStyleSheet)
to make body overflow hide and pointer events to discard.

Usually, `MountTransition` is not used in its raw alternative. To create new
transitions, you have to use [createMountTransition](https://github.com/wolframdeus/vkma-ui/tree/master/src/lib/utils/createMountTransition/createMountTransition.tsx).
Both `ViewTranstion` and `PanelTransition` are created with this function.
