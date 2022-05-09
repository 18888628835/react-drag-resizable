---
nav:
order: 20
---

# extra support 额外支持

这个组件还额外支持所有 HTMLDivElement 的 API，并且有 TypeScript 的自动提示。

This component also has additional support for all HTMLDivElement APIs and TypeScript automatic prompts.

举个例子，下面的代码能够让你在按下 Back 键或者 DELETE 键时触发回调函数

For example, the following code lets you trigger a callback when you press the Back or DELETE key

```tsx
import React from 'react';
import { DragResizableBox } from 'react-drag-resizable';

export default () => {
  return (
    <div
      style={{
        height: '300px',
        maxWidth: '300px',
      }}
    >
      <DragResizableBox
        tabIndex={-1}
        onKeyDown={(e) => {
          let keyCodeString = e.code.toLowerCase();
          if (['backspace', 'delete'].includes(keyCodeString)) {
            alert(`you press the key: ${e.code}`);
          }
        }}
        style={{ backgroundColor: 'rgb(243,235,235)' }}
      >
        <div
          style={{
            padding: '10px',
          }}
        >
          click me and press the Back or DELETE key
        </div>
      </DragResizableBox>
    </div>
  );
};
```
