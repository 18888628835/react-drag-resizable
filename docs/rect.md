---
nav:
order: 2
---

# rect 预设位置和大小

You can preset the position and size using the RECT property

```tsx
import React, { useState } from 'react';
import { DragResizableBox } from 'react-drag-resizable';

export default () => {
  return (
    <div
      style={{ height: '300px', maxWidth: '300px', border: '1px solid red' }}
    >
      <DragResizableBox
        rect={{ width: 150, height: 150, left: 350, top: 250 }}
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

现在你可以控制大小和位置了，下面我们使用 limit 让组件限定在红色边框范围内吧！

Now that you can control the size and position, let's use limit to keep the component within the red border!
