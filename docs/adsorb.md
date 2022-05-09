---
nav:
order: 7
---

# adsorb 吸附效果

```tsx
import React from 'react';
import { DragResizableBox } from 'react-drag-resizable';

export default () => {
  return (
    <div style={{ height: '300px', maxWidth: '700px' }}>
      <DragResizableBox
        rect={{ width: 100, height: 100 }}
        style={{ backgroundColor: 'rgb(243,235,235)' }}
      >
        <div>move me!</div>
      </DragResizableBox>
      <div style={{ height: 150 }}></div>
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

如果你不想要吸附效果，请将 adsorb 设置为 false

If you do not want absorption, please set adsorb to false
