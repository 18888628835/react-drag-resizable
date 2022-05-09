---
nav:
order: 6
---

# guides 辅助线

```tsx
import React from 'react';
import { DragResizableBox } from 'react-drag-resizable';

export default () => {
  return (
    <div style={{ height: '300px', maxWidth: '700px', position: 'relative' }}>
      <div style={{ height: 50 }}></div>
      <DragResizableBox
        adsorb={false}
        rect={{ width: 100, height: 50, top: 0, left: 0 }}
        style={{ backgroundColor: 'rgb(243,235,235)' }}
        relative
        diff={2}
      >
        <div>move me!</div>
      </DragResizableBox>
      <div style={{ height: 50 }}></div>
      <DragResizableBox
        relative
        adsorb={false}
        rect={{ width: 150, height: 150 }}
        style={{ backgroundColor: 'rgb(243,235,235)' }}
      >
        <div>move me!</div>
      </DragResizableBox>
    </div>
  );
};
```

默认具有辅助线，如果你不需要辅助线，则可以将 guides 设置为 false

Guides are available by default，If you do not need guides, set the guides to false

通过 diff 属性可以控制多少距离时出现辅助线

The diff attribute allows you to control how far the auxiliary line appears
