import React from 'react';
import { render } from 'react-dom';
import { DragResizableBox } from 'react-drag-resizable';

const App = () => (
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
render(<App />, document.getElementById('root'));
