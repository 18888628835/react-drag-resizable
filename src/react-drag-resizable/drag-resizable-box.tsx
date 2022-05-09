import classNames from 'classnames';
import '../index.css';
import React, {
  useEffect,
  useRef,
  useCallback,
  useState,
  useMemo,
} from 'react';
import { Wrap } from './style';

type Direction =
  | 'left_top'
  | 'left_bottom'
  | 'right_top'
  | 'right_bottom'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'content';

export type CollectedRectType = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export type LimitType = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

export type RectType = Partial<CollectedRectType>;
export type CalcRectType = CollectedRectType;
export type AllBoxRectCollectorType = CollectedRectType & LimitType;
export type PositionType = LimitType;
export interface BaseDragResizableBoxPropsProps {
  /**
   * @description  限制位移界限的坐标值
   */
  limit: LimitType;
  /**
   * @description style中rect属性的语法糖，可传入width、height、left、top
   */
  rect: RectType;
  /**
   * @argument 参数rect为改变后的left、top、width、height
   * @description 传入onChange会使组件受控，需要传入left、top和width、height
   */
  onChange: (rect: CollectedRectType) => void;
  /**
   * @default false
   * @description   默认移动位置时相对于 document，如果需要相对于父盒子，请设置为 true
   */
  relative: boolean;
  /**
   * @default 10
   * @description 最小宽度
   */
  minWidth: number;
  /**
   * @default 10
   * @description 最小高度
   */
  minHeight: number;
}

export type DragResizableBoxProps = Partial<
  BaseDragResizableBoxPropsProps &
    Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>
>;

function getCoords(elem: Element) {
  const rect = elem.getBoundingClientRect();
  let left = window.pageXOffset + rect.left;
  let right = window.pageXOffset + rect.right;
  let top = window.pageYOffset + rect.top;
  let bottom = window.pageYOffset + rect.bottom;
  return {
    left,
    right,
    top,
    bottom,
  };
}

const isNearly = (value1: number, value2: number) => {
  return Math.abs(value1 - value2) <= 3;
};

const DragResizableBox: React.FC<
  React.PropsWithChildren<DragResizableBoxProps>
> = React.memo((props) => {
  let {
    style,
    className,
    onChange,
    limit,
    relative,
    rect,
    minWidth = 20,
    minHeight = 20,
    ...restProps
  } = props;
  const [allowResize, setAllowResize] = useState(false);
  const box = useRef<HTMLDivElement | null>(null);
  const [rectAttr, setRectAttr] = useState<RectType>({} as RectType);
  const allBoxRectCollector = useRef<AllBoxRectCollectorType[]>([]);
  const lineRef = useRef({
    line_n: null,
    line_e: null,
    line_s: null,
    line_w: null,
    line_mdx: null,
    line_mdy: null,
  });
  const line_n = useRef<HTMLDivElement>(null);
  const line_e = useRef<HTMLDivElement>(null);
  const line_s = useRef<HTMLDivElement>(null);
  const line_w = useRef<HTMLDivElement>(null);
  const line_mdx = useRef<HTMLDivElement>(null);
  const line_mdy = useRef<HTMLDivElement>(null);
  const direction = useRef<Direction>('left');

  // 用来记录鼠标点下去时元素的属性值
  const collector = useRef({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    right: 0,
    bottom: 0,
    pointX: 0,
    pointY: 0,
    shiftX: 0,
    shiftY: 0,
  });

  const showLine = useCallback((whichLine: React.RefObject<HTMLDivElement>) => {
    whichLine.current!.hidden = false;
  }, []);
  const hiddenLine = useCallback(() => {
    [line_n, line_e, line_s, line_w, line_mdx, line_mdy].forEach((line) => {
      line.current!.hidden = true;
    });
  }, []);
  /**
   *
   * @param collectorRect 当mousedown 时收集到的rect属性
   * @param offsetInfo mousedown 时鼠标位置与 mousemove 时鼠标位置的偏移量、mousedown 时鼠标位置与盒子left 处、top 处的偏差值
   * @param e 事件对象
   * @returns 计算得出盒模型mousemove 后的left、width、top、height 结果
   */
  const handleCalcRect = useCallback(
    (
      collectorRect: CollectedRectType,
      offsetInfo: {
        offsetX: number;
        offsetY: number;
        shiftX: number;
        shiftY: number;
      },
      e: MouseEvent,
    ): CalcRectType => {
      let { left, top, width, height } = collectorRect;
      let { offsetX, offsetY, shiftX, shiftY } = offsetInfo;
      switch (direction.current) {
        case 'left_top':
          left = Math.min(left + width - minWidth, left - offsetX);
          top = Math.min(top + height - minHeight, top - offsetY);
          width = width + offsetX;
          height = height + offsetY;
          break;
        case 'left_bottom':
          left = Math.min(left + width - minWidth, left - offsetX);
          width = width + offsetX;
          height = height - offsetY;
          break;
        case 'right_top':
          top = Math.min(top + height - minHeight, top - offsetY);
          width = width - offsetX;
          height = height + offsetY;
          break;
        case 'right_bottom':
          width = width - offsetX;
          height = height - offsetY;
          break;
        case 'top':
          top = Math.min(top + height - minHeight, top - offsetY);
          height = height + offsetY;
          break;
        case 'bottom':
          height = height - offsetY;
          break;
        case 'left':
          left = Math.min(left + width - minWidth, left - offsetX);
          width = width + offsetX;
          break;
        case 'right':
          width = width - offsetX;
          break;
        case 'content':
          left = e.pageX - shiftX;
          top = e.pageY - shiftY;
          break;
      }
      return { width, height, left, top };
    },
    [],
  );

  /**
   *
   * @param rect mousemove 后的left、width、top、height 结果
   * @param limit 用来限制拖动范围的界限坐标
   * @returns  计算limit 条件限制后得出的left、width、top、height 结果
   */
  const handleLimit = useCallback(
    (rect: CollectedRectType, limit: LimitType): CalcRectType => {
      let { left, top, width, height } = rect;
      switch (direction.current) {
        case 'content':
          if (left < limit.left) {
            left = limit.left;
          }
          if (left > limit.right - width) {
            left = limit.right - width;
          }
          if (top < limit.top) {
            top = limit.top;
          }
          if (top > limit.bottom - height) {
            top = limit.bottom - height;
          }
          break;
        case 'left_top':
          if (top < limit.top) {
            top = limit.top;
          }
          if (left < limit.left) {
            left = limit.left;
          }
          break;
        case 'top':
          if (top < limit.top) {
            top = limit.top;
          }
          break;
        case 'right_top':
          if (top < limit.top) {
            top = limit.top;
          }
          if (width + left > limit.right) {
            left = Math.max(limit.left, left - (width + left - limit.right));
          }
          break;
        case 'right':
          if (left + width > limit.right) {
            left = Math.max(limit.left, left - (left + width - limit.right));
          }
          break;
        case 'right_bottom':
          if (left + width > limit.right) {
            left = Math.max(limit.left, left - (left + width - limit.right));
          }
          if (top + height > limit.bottom) {
            top = Math.max(limit.top, top - (top + height - limit.bottom));
          }
          break;
        case 'bottom':
          if (top + height > limit.bottom) {
            top = Math.max(limit.top, top - (top + height - limit.bottom));
          }
          break;
        case 'left_bottom':
          if (left < limit.left) {
            left = limit.left;
          }
          if (top + height > limit.bottom) {
            top = Math.max(limit.top, top - (top + height - limit.bottom));
          }
          break;
        case 'left':
          if (left < limit.left) {
            left = limit.left;
          }
          break;
      }
      if (width > limit.right - limit.left) {
        width = limit.right - limit.left;
      }
      if (height > limit.bottom - limit.top) {
        height = limit.bottom - limit.top;
      }
      return { width, height, left, top };
    },
    [],
  );

  const onMouseMove = useCallback((e: MouseEvent) => {
    let { left, top, width, height, pointX, pointY, shiftX, shiftY } =
      collector.current;
    let offsetX = pointX - e.pageX;
    let offsetY = pointY - e.pageY;

    let curCalcRect = handleCalcRect(
      { left, top, width, height },
      { offsetX, offsetY, shiftX, shiftY },
      e,
    );
    // 移动时处理辅助线
    if (direction.current === 'content') {
      hiddenLine();
      allBoxRectCollector.current.forEach((elementRect) => {
        const { top, left, width, height, bottom, right } = elementRect;
        const halfX = top + height / 2;
        console.log('halfY', halfX);

        const halfY = left + width / 2;
        const conditions = {
          top: [
            {
              isNearly: isNearly(top, curCalcRect.top),
              lineNode: line_n.current,
              showLine: () => showLine(line_n),
              lineStyle: {
                width:
                  curCalcRect.left > left
                    ? curCalcRect.left + curCalcRect.width - left
                    : right - curCalcRect.left,
                left: curCalcRect.left > left ? left : curCalcRect.left,
                top,
                height: 2,
              },
              adsorb: top,
            },
            {
              isNearly: isNearly(bottom, curCalcRect.top),
              lineNode: line_s.current,
              showLine: () => showLine(line_s),
              lineStyle: {
                width:
                  curCalcRect.left > left
                    ? curCalcRect.left + curCalcRect.width - left
                    : right - curCalcRect.left,
                left: curCalcRect.left > left ? left : curCalcRect.left,
                top: bottom,
                height: 2,
              },
              adsorb: bottom,
            },
            {
              isNearly: isNearly(bottom, curCalcRect.top + curCalcRect.height),
              lineNode: line_s.current,
              showLine: () => showLine(line_s),
              lineStyle: {
                width:
                  curCalcRect.left > left
                    ? curCalcRect.left + curCalcRect.width - left
                    : right - curCalcRect.left,
                left: curCalcRect.left > left ? left : curCalcRect.left,
                top: bottom,
                height: 2,
              },
              adsorb: bottom - curCalcRect.height,
            },
            {
              isNearly: isNearly(top, curCalcRect.top + curCalcRect.height),
              lineNode: line_s.current,
              showLine: () => showLine(line_s),
              lineStyle: {
                width:
                  curCalcRect.left > left
                    ? curCalcRect.left + curCalcRect.width - left
                    : right - curCalcRect.left,
                left: curCalcRect.left > left ? left : curCalcRect.left,
                top: top,
                height: 2,
              },
              adsorb: top - curCalcRect.height,
            },
            //我的中间跟别人的中间：x轴
            {
              isNearly: isNearly(
                halfX,
                curCalcRect.top + curCalcRect.height / 2,
              ),
              lineNode: line_mdx.current,
              showLine: () => showLine(line_mdx),
              lineStyle: {
                width:
                  curCalcRect.left > left
                    ? curCalcRect.left + curCalcRect.width - left
                    : right - curCalcRect.left,
                left: curCalcRect.left > left ? left : curCalcRect.left,
                top: halfX,
                height: 2,
              },
              adsorb: halfX - curCalcRect.height / 2,
            },
          ],
          left: [
            //我的左边跟别人的左边
            {
              isNearly: isNearly(left, curCalcRect.left),
              lineNode: line_w.current,
              showLine: () => showLine(line_w),
              lineStyle: {
                width: 2,
                left: left,
                top: curCalcRect.top > top ? top : curCalcRect.top,
                height:
                  curCalcRect.top > top
                    ? Math.abs(curCalcRect.top - top + collector.current.height)
                    : Math.abs(bottom - curCalcRect.top),
              },
              adsorb: left,
            },
            {
              isNearly: isNearly(left, curCalcRect.left + curCalcRect.width),
              lineNode: line_w.current,
              showLine: () => showLine(line_w),
              lineStyle: {
                width: 2,
                left: left,
                top: curCalcRect.top > top ? top : curCalcRect.top,
                height:
                  curCalcRect.top > top
                    ? Math.abs(curCalcRect.top - top + collector.current.height)
                    : Math.abs(bottom - curCalcRect.top),
              },
              adsorb: left - curCalcRect.width,
            },
            //我的右边跟别人的右边
            {
              isNearly: isNearly(right, curCalcRect.left + curCalcRect.width),
              lineNode: line_w.current,
              showLine: () => showLine(line_w),
              lineStyle: {
                width: 2,
                left: right,
                top: curCalcRect.top > top ? top : curCalcRect.top,
                height:
                  curCalcRect.top > top
                    ? Math.abs(curCalcRect.top - top + collector.current.height)
                    : Math.abs(bottom - curCalcRect.top),
              },
              adsorb: right - curCalcRect.width,
            },
            //我的左边跟别人的右边
            {
              isNearly: isNearly(right, curCalcRect.left),
              lineNode: line_w.current,
              showLine: () => showLine(line_w),
              lineStyle: {
                width: 2,
                left: right,
                top: curCalcRect.top > top ? top : curCalcRect.top,
                height:
                  curCalcRect.top > top
                    ? Math.abs(curCalcRect.top - top + collector.current.height)
                    : Math.abs(bottom - curCalcRect.top),
              },
              adsorb: right,
            },
            //我的 中间跟别人的中间：y 轴
            {
              isNearly: isNearly(
                halfY,
                curCalcRect.left + curCalcRect.width / 2,
              ),
              lineNode: line_mdy.current,
              showLine: () => showLine(line_mdy),
              lineStyle: {
                width: 2,
                left: halfY,
                top: curCalcRect.top > top ? top : curCalcRect.top,
                height:
                  curCalcRect.top > top
                    ? Math.abs(curCalcRect.top - top + collector.current.height)
                    : Math.abs(bottom - curCalcRect.top),
              },
              adsorb: halfY - curCalcRect.width / 2,
            },
          ],
        };
        Object.keys(conditions).forEach((key) => {
          conditions[key].forEach((item) => {
            if (item.isNearly) {
              item.showLine();
              Object.keys(item.lineStyle).forEach(
                (key) =>
                  (item.lineNode.style[key] = item.lineStyle[key] + 'px'),
              );
              conditions[key] = item.adsorb;
            }
          });
        });
        // conditions.top.forEach((item) => {
        //   if (item.isNearly) {
        //     item.showLine();
        //     Object.keys(item.lineStyle).forEach(
        //       (key) => (item.lineNode.style[key] = item.lineStyle[key] + 'px'),
        //     );
        //     curCalcRect.top = item.adsorb;
        //   }
        // });
        // conditions.left.forEach((item) => {
        //   if (item.isNearly) {
        //     item.showLine();
        //     Object.keys(item.lineStyle).forEach(
        //       (key) => (item.lineNode.style[key] = item.lineStyle[key] + 'px'),
        //     );
        //     curCalcRect.left = item.adsorb;
        //   }
        // });
      });
    }

    if (limit) {
      curCalcRect = handleLimit(curCalcRect, limit);
    }
    onChange
      ? onChange({
          ...curCalcRect,
          width: Math.max(minWidth, curCalcRect.width),
          height: Math.max(minHeight, curCalcRect.height),
        })
      : setRectAttr({
          ...curCalcRect,
          width: Math.max(minWidth, curCalcRect.width),
          height: Math.max(minHeight, curCalcRect.height),
        });
  }, []);
  /**
   * 收集所有相同移动盒子的 rect 属性
   */
  const collectAllBoxRect = useCallback(() => {
    allBoxRectCollector.current = [];
    //其他所有相同的移动盒子
    let allBoxes = Array.from(
      (relative ? box.current?.parentElement! : document).querySelectorAll(
        '.resizable_box',
      ),
    ) as HTMLElement[];
    for (let boxItem of allBoxes) {
      if (boxItem === box.current) {
        continue;
      }
      let { width, height } = boxItem.getBoundingClientRect();
      let position: PositionType = {} as PositionType;
      if (relative) {
        Object.assign(position, {
          left: boxItem.offsetLeft,
          top: boxItem.offsetTop,
          bottom: boxItem.offsetTop + height,
          right: boxItem.offsetLeft + width,
        });
      } else {
        position = getCoords(boxItem);
      }

      allBoxRectCollector.current.push({
        width,
        height,
        ...position,
      });
    }
  }, []);

  const onMouseDown = useCallback(
    (
      e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
      currentDirection: Direction,
    ) => {
      e.stopPropagation();
      //收集所有相同移动盒子的 rect 属性
      collectAllBoxRect();
      //只有左键才有效
      if (e.button !== 0) return;
      // 获取元素在文档中的rect属性
      let left, top, right, bottom;
      if (relative) {
        left = box.current?.offsetLeft!;
        top = box.current?.offsetTop!;
      } else {
        left = getCoords(box.current!).left;
        top = getCoords(box.current!).top;
      }
      right = left + box.current?.offsetWidth!;
      bottom = top + box.current?.offsetHeight!;

      // 获取元素矩阵大小
      let { width, height } = box.current?.getBoundingClientRect()!;
      // 存下鼠标点击后的鼠标坐标
      let pointX = e.pageX,
        pointY = e.pageY;
      let shiftX = pointX - left,
        shiftY = pointY - top;

      // 将所有属性都记录下来
      Object.assign(collector.current, {
        left,
        top,
        width,
        height,
        pointX,
        pointY,
        shiftX,
        shiftY,
        right,
        bottom,
      });

      direction.current = currentDirection;
      document.addEventListener('mousemove', onMouseMove);
    },
    [],
  );

  const onMouseUp = useCallback(() => {
    hiddenLine();
    document.removeEventListener('mousemove', onMouseMove);
  }, []);

  const onChecked = useCallback(() => setAllowResize(true), []);

  const onCancelChecked = useCallback((e: MouseEvent) => {
    const isChild = box.current!.contains(e.target as Node);
    if (!isChild) {
      setAllowResize(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('click', onCancelChecked);
    return () => {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('click', onCancelChecked);
    };
  }, []);

  const classes = useMemo(() => {
    return classNames('resizable_box', className, {
      checked: allowResize,
    });
  }, [allowResize]);

  return (
    <>
      <Wrap
        className={classes}
        ref={box}
        onClick={onChecked}
        style={{ ...style, ...rect, ...rectAttr }}
        {...restProps}
      >
        {[
          'left_top',
          'left_bottom',
          'right_top',
          'right_bottom',
          'top',
          'bottom',
          'left',
          'right',
        ].map((item) => (
          <span
            key={item}
            className={allowResize ? `rect rect_${item}` : ''}
            onMouseDown={(e) => onMouseDown(e, item as Direction)}
          ></span>
        ))}

        <div className="content" onMouseDown={(e) => onMouseDown(e, 'content')}>
          {props.children}
        </div>
      </Wrap>
      <div className="line line_n" ref={line_n}></div>
      <div className="line line_e" ref={line_e}></div>
      <div className="line line_s" ref={line_s}></div>
      <div className="line line_w" ref={line_w}></div>
      <div className="line line_mdx" ref={line_mdx}></div>
      <div className="line line_mdy" ref={line_mdy}></div>
    </>
  );
});

export default DragResizableBox;
