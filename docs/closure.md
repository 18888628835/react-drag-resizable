---
nav:
order: 8
---

# Closure trap 闭包陷阱

由于实现的原因，如果需要在 onChange 中获取最新的数据，请使用 useRef。

for some reasons,If you want new data within onChange function, please use useRef as storage instead of useState.

```tsx
import React, { useRef, useState } from 'react';
import { DragResizableBox } from 'react-drag-resizable';

const useStorage = (data) => {
  const ref = useRef(0);
  //used to render latest data
  const [state, setState] = useState(true);
  function onChange(data) {
    ref.current = data;
    setState((old) => !old);
  }
  return {
    ref,
    onChange,
  };
};

export default () => {
  const [rect1, setRect1] = useState({
    left: 100,
    top: 100,
    width: 200,
    height: 50,
  });

  const { ref, onChange } = useStorage(0);
  return (
    <div style={{ height: '300px', maxWidth: '700px', position: 'relative' }}>
      <button onClick={() => onChange(ref.current + 1)}>add</button>
      <div>{ref.current}</div>
      <div style={{ height: 50 }}></div>
      <DragResizableBox
        rect={rect1}
        style={{ backgroundColor: 'rgb(243,235,235)' }}
        relative
        onChange={(rectData) => {
          console.log('onChange', ref.current);
          setRect1(rectData);
        }}
      >
        <div style={{ width: 100, height: 50 }}>move me!</div>
      </DragResizableBox>
    </div>
  );
};
```
