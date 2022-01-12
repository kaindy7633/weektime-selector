export interface IWeektimeDataItem {
  value: string;
  row: number;
  child: ITdData[];
}

/** 已选择的数据 */
export interface ISelectedData {
  id: number;
  name: string;
  value: string | void;
}

/** 核心组件的 Props */
export interface IWeektimeSelectorProps {
  isVisible?: boolean; // 是否显示该组件
  isShowSelected?: boolean; // 是否显示已选择的数据
  getSelectedData: (data: Array<ISelectedData>) => void;
  weektimeData?: IWeektimeDataItem[];
  selectedData?: any[];
  setSelectedData?: (fn: any) => any;
  clearData?: () => void;
  selectGoldTime?: (type: string) => any;
}

/** 每一格数据 */
export interface ITdData {
  begin: string;
  col: number;
  end: string;
  row: number;
  value: string;
  week: string;
  selected?: boolean;
}
