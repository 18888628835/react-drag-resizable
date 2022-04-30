---
nav:
order: 5
---

# relative 相对定位

此组件默认相对于 document 移动，如果父容器设置了 position:relative 等定位，则需要将 relative 设置为 true。
此时请按照父盒子的宽高设置 limit。

This component moves relative to document by default, and if the parent container has positions such as Position :relative set relative to true.
Set the limit according to the width and height of the parent box.

```tsx
import React, { useState } from 'react';
import { DragResizableBox } from 'react-drag-resizable';

export default () => {
  const [rect, setRect] = useState({
    width: 100,
    height: 100,
    left: 20,
    top: 50,
  });
  return (
    <div
      style={{
        height: '300px',
        maxWidth: '300px',
        border: '1px solid red',
        position: 'relative',
      }}
    >
      <DragResizableBox
        rect={rect}
        relative
        onChange={(newRect) => setRect(newRect)}
        limit={{ left: 0, top: 0, right: 300, bottom: 300 }}
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
