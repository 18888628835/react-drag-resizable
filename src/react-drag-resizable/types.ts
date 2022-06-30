export type Direction =
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
  /**
   * @default true
   * @description 是否展示辅助线
   */
  guides: boolean;
  /**
   * @default true
   * @description 是否需要磁吸效果
   */
  adsorb?: boolean;
  /**
   * @default 3
   * @description 接近多少距离时触发红线
   */
  diff: number;
  /**
   * @description 辅助线颜色
   */
  guidesColor: React.CSSProperties['color'];
  /**
   * @description 小方块的className
   */
  rectClassName: string;
}

export type DragResizableBoxProps = Partial<
  BaseDragResizableBoxPropsProps &
    Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>
>;
