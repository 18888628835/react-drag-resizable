# 示例 example

## Basic

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

## rect 预设位置和大小

You can preset the position and size using the RECT property

```tsx
import React, { useState } from 'react';
import { DragResizableBox } from 'react-drag-resizable';

export default () => {
  return (
    <div style={{ height: '300px', maxWidth: '300px' }}>
      <DragResizableBox
        rect={{ width: 100, height: 100, left: 520, top: 820 }}
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

## limit 控制界限

即使放大了也不会超出界限
Even if you zoom in, it doesn't go out of bounds

```tsx
import React, { useState } from 'react';
import { DragResizableBox } from 'react-drag-resizable';

export default () => {
  return (
    <div
      style={{ height: '300px', maxWidth: '300px', border: '1px solid red' }}
    >
      <DragResizableBox
        rect={{ width: 100, height: 100, left: 520, top: 1350 }}
        limit={{ left: 344, top: 1348, right: 642, bottom: 1648 }}
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

## onChange 受控组件

你可能需要在父组件上控制组件的位置、大小，那么请使用 onChange 来让组件受控
You may need to control the location and size of the component on the parent, so use onChange to keep the component under control

```tsx
import React, { useState } from 'react';
import { DragResizableBox } from 'react-drag-resizable';

export default () => {
  const [rect, setRect] = useState({
    width: 100,
    height: 150,
    left: 520,
    top: 1933,
  });
  return (
    <div
      style={{ height: '300px', maxWidth: '300px', border: '1px solid red' }}
    >
      <DragResizableBox
        onChange={(newRect) => setRect(newRect)}
        rect={rect}
        limit={{ left: 344, top: 1930, right: 642, bottom: 2230 }}
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

## relative

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

<API src='src/react-drag-resizable/index'>
