import styled from 'styled-components';

export const Wrap = styled.div`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  &.resizable_box {
    box-sizing: border-box;
    position: absolute;
    z-index: 0;
    border: 1px solid transparent;
    cursor: move;
    &:hover {
      border-color: #09f;
    }
  }
  &.checked {
    border-color: #09f;
  }

  .rect {
    width: 8px;
    height: 8px;
    position: absolute;
    border: 1px solid rgba(6, 123, 239, 1);
    background-color: white;
    z-index: 10;
  }
  .rect_left_top {
    left: 0;
    top: 0;
    transform: translate(-50%, -50%);
    cursor: nwse-resize;
  }
  .rect_left_bottom {
    left: 0;
    bottom: 0;
    transform: translate(-50%, 50%);
    cursor: nesw-resize;
  }
  .rect_right_top {
    right: 0;
    top: 0;
    transform: translate(50%, -50%);
    cursor: nesw-resize;
  }
  .rect_right_bottom {
    right: 0;
    bottom: 0;
    transform: translate(50%, 50%);
    cursor: nwse-resize;
  }
  .rect_top {
    right: 50%;
    top: 0;
    cursor: ns-resize;
    transform: translate(50%, -50%);
  }
  .rect_right {
    right: 0;
    top: 50%;
    cursor: ew-resize;
    transform: translate(50%, -50%);
  }
  .rect_bottom {
    left: 50%;
    bottom: 0;
    cursor: ns-resize;
    transform: translate(-50%, 50%);
  }
  .rect_left {
    left: 0;
    top: 50%;
    cursor: ew-resize;
    transform: translate(-50%, -50%);
  }
  .content {
    width: 100%;
    height: 100%;
    overflow: hidden;
    cursor: move;
  }
`;
