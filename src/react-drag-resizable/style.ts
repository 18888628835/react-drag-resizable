import styled from 'styled-components';

export const Wrap = styled.div`
  &.resizable_box {
    position: absolute;
    z-index: 0;
    border: 1px dashed transparent;
    cursor: default;
  }
  &.checkedBox {
    border-color: #09f;
    background-color: rgba(115, 170, 229, 0.5);
  }

  .circle {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    position: absolute;
    border: 1px solid rgba(6, 123, 239, 1);
    background-color: #09f;
    z-index: 10;
  }
  .circle_left_top {
    left: 0;
    top: 0;
    transform: translate(-50%, -50%);
    cursor: nwse-resize;
  }
  .circle_left_bottom {
    left: 0;
    bottom: 0;
    transform: translate(-50%, 50%);
    cursor: nesw-resize;
  }
  .circle_right_top {
    right: 0;
    top: 0;
    transform: translate(50%, -50%);
    cursor: nesw-resize;
  }
  .circle_right_bottom {
    right: 0;
    bottom: 0;
    transform: translate(50%, 50%);
    cursor: nwse-resize;
  }
  .circle_top {
    right: 50%;
    top: 0;
    cursor: n-resize;
    transform: translate(50%, -50%);
  }
  .circle_right {
    right: 0;
    top: 50%;
    cursor: e-resize;
    transform: translate(50%, -50%);
  }
  .circle_bottom {
    left: 50%;
    bottom: 0;
    cursor: s-resize;
    transform: translate(-50%, 50%);
  }
  .circle_left {
    left: 0;
    top: 50%;
    cursor: w-resize;
    transform: translate(-50%, -50%);
  }
  .content {
    width: 100%;
    height: 100%;
    overflow: hidden;
    cursor: move;
    :hover {
      border-color: #09f;
      background-color: rgba(115, 170, 229, 0.5);
    }
  }
  .shade {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 5;
    cursor: move;
  }
`;
