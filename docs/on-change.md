---
nav:
order: 4
---

# onChange 受控组件

```tsx
import React, { useState } from 'react';
import { DragResizableBox, CollectedRectType } from 'react-drag-resizable';

export default () => {
  const [rect, setRect] = useState<CollectedRectType>({
    width: 100,
    height: 150,
    left: 360,
    top: 280,
  });
  return (
    <div
      style={{ height: '300px', maxWidth: '300px', border: '1px solid red' }}
    >
      <DragResizableBox
        onChange={(newRect) => setRect(newRect)}
        rect={rect}
        limit={{ left: 344, top: 183, right: 644, bottom: 483 }}
        style={{ backgroundColor: 'rgb(243,235,235)' }}
      >
        <div
          style={{
            padding: '10px',
            width: '100%',
          }}
        >
          move me!
        </div>
      </DragResizableBox>
    </div>
  );
};
```

出于性能以及某些应用场景的考虑，使用 onChange 时会让组件受控，你需要手动控制状态。

For performance reasons and for certain application scenarios, using onChange allows components to be controlled, and you need to manually control the state.

让组件受控的好处是，你可以自主控制组件的缩小、移动行为。比如，也许你只需要放大缩小而不需要移动。

The advantage of having components under control is that you can control how they shrink and move. For example, maybe you just need to zoom in and out without moving.

```tsx
import React, { useState } from 'react';
import { DragResizableBox } from 'react-drag-resizable';

export default () => {
  const [rect, setRect] = useState({
    width: 100,
    height: 150,
  });
  return (
    <div
      style={{ height: '300px', maxWidth: '300px', border: '1px solid red' }}
    >
      <DragResizableBox
        onChange={({ width, height }) => setRect({ width, height })}
        rect={rect}
        limit={{ left: 344, top: 183, right: 644, bottom: 483 }}
        style={{ backgroundColor: 'rgb(243,235,235)' }}
      >
        <div
          style={{
            padding: '10px',
            width: '100%',
          }}
        >
          I can not moving!!
        </div>
      </DragResizableBox>
    </div>
  );
};
```
