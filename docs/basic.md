---
nav:
order: 1
---

# Basic 基本使用

```tsx
import React, { useState } from 'react';
import { DragResizableBox } from 'react-drag-resizable';

export default () => {
  return (
    <div style={{ height: '300px', maxWidth: '300px' }}>
      <DragResizableBox style={{ backgroundColor: 'rgb(243,235,235)' }}>
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

使用非常简单，默认根据内容自动伸缩，你也可以指定 rect 属性控制大小和位置。

It is very simple to use and automatically scales by content by default. You can also specify the recT property to control the size and position.
