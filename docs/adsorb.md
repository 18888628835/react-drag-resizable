---
nav:
order: 7
---

# adsorb 磁吸效果

```tsx
import React, { useState } from 'react';
import { DragResizableBox } from 'react-drag-resizable';

export default () => {
  return (
    <div style={{ height: '300px', maxWidth: '700px' }}>
      <DragResizableBox
        style={{ backgroundColor: 'rgb(243,235,235)' }}
        rect={{ width: 50, height: 50 }}
      >
        <div>move me!</div>
      </DragResizableBox>
      <div style={{ height: 50 }}></div>
      <DragResizableBox
        rect={{ width: 100, height: 100 }}
        style={{ backgroundColor: 'rgb(243,235,235)' }}
      >
        <div>move me!</div>
      </DragResizableBox>
      <div style={{ height: 50 }}></div>
      <DragResizableBox
        rect={{ width: 150, height: 150 }}
        style={{ backgroundColor: 'rgb(243,235,235)' }}
      >
        <div>move me!</div>
      </DragResizableBox>
    </div>
  );
};
```

使用非常简单，默认根据内容自动伸缩，你也可以指定 rect 属性控制大小和位置。

It is very simple to use and automatically scales by content by default. You can also specify the recT property to control the size and position.
