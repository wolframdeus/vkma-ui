# DeviceProvider

Provides information about current device. It means, this information
is being shared:

- Screen current and initial insets
- Operating system

To make `getInsets` work, add this style to head of your index.html:
```css
<style>
    :root {
        --safe-area-inset-top: env(safe-area-inset-top, 0px);
        --safe-area-inset-right: env(safe-area-inset-right, 0px);
        --safe-area-inset-bottom: env(safe-area-inset-bottom, 0px);
        --safe-area-inset-left: env(safe-area-inset-left, 0px);
    }
</style>
```
