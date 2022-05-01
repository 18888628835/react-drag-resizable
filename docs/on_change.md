---
nav:
order: 4
---

# onChange 受控组件

```tsx
import React, { useState } from 'react';
import { DragResizableBox } from 'react-drag-resizable';
import type { RectProps } from 'react-drag-resizable';

export default () => {
  const [rect, setRect] = useState<RectProps>({
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
        limit={{ left: 344, top: 183, right: 642, bottom: 483 }}
        style={{ backgroundColor: 'rgb(243,235,235)' }}
      >
        <div
          style={{
            padding: '10px',
            width: '100%',
          }}
        >
          click me!
        </div>
      </DragResizableBox>
    </div>
  );
};
```

出于性能以及某些应用场景的考虑，使用 onChange 时会让组件受控，你需要手动控制状态。

For performance reasons and for certain application scenarios, using onChange allows components to be controlled, and you need to manually control the state.

如果你觉得不合理，请给我提一个 Issue，我会尽快修改这个功能。

If you think it is unreasonable, please send me an Issue, and I will modify this function as soon as possible..
