import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import {
  IWeektimeSelectorProps,
  ITdData,
  IWeektimeDataItem,
  ISelectedData,
} from './interface';
import { createChild, createRange, filterChild } from './utils';
import { cloneDeep } from 'lodash';
import './styles.less';

import { weekList } from './config';

const WeektimeSelector: React.FC<IWeektimeSelectorProps> = ({
  isVisible = true,
  isShowSelected,
  getSelectedData,
  selectAllWorkDayTime,
  minWidth = 830,
}): React.ReactElement => {
  // 生成 weektimeData 数据源
  const [weektimeData] = useState<IWeektimeDataItem[]>(
    weekList.map((_v: string, _i: number) => {
      return {
        value: _v,
        row: _i,
        child: createChild(_v, _i, 48),
      };
    })
  );

  // 生成已选择的数据
  const [selectedData, setSelectedData] = useState<ISelectedData[]>([]);

  const [theadRange, setTheadRange] = useState<Array<number>>([]); // 时间Range
  const [mouseMode, setMouseMode] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);
  const [top, setTop] = useState<number>(0);
  const [cRow, setCrow] = useState<number>(0); // 当前行
  const [cCol, setCcol] = useState<number>(0); // 当前列
  const [selected, setSelected] = useState<boolean>(false);

  useEffect(() => {
    // 生成时间 Range
    setTheadRange(createRange(24));
  }, []);

  useEffect(() => {
    // 当 weektimeData 发生变化时，更新 selectedData
    setSelectedData(
      weektimeData.map((_item: IWeektimeDataItem) => {
        return {
          id: _item.row,
          name: _item.value,
          value: filterChild(_item.child),
        };
      })
    );
  }, [weektimeData]);

  useEffect(() => {
    getSelectedData(selectedData);
  }, [selectedData]);

  useEffect(() => {
    selectAllWorkDayTime && selectWorkDayTime();
  }, [selectAllWorkDayTime]);

  // 鼠标按下时
  const handleMouseDown = (td: ITdData) => {
    const _el = document.querySelector(
      `td[data-week='${td.row}'][data-time='${td.col}']`
    );

    setSelected(!!td.selected);
    setMouseMode(1);
    if (_el) {
      setWidth((_el as HTMLElement).offsetWidth);
      setHeight((_el as HTMLElement).offsetHeight);
    }

    setCrow(td.row);
    setCcol(td.col);
  };

  // 鼠标移动
  const handleMouseEnter = (td: ITdData) => {
    const _el = document.querySelector(
      `td[data-week='${td.row}'][data-time='${td.col}']`
    );
    if (_el && !mouseMode) {
      setLeft((_el as HTMLElement).offsetLeft);
      setTop((_el as HTMLElement).offsetTop);
      return;
    }

    if (td.col <= cCol && td.row <= cRow) {
      setWidth((cCol - td.col + 1) * (_el as HTMLElement).offsetWidth);
      setHeight((cRow - td.row + 1) * (_el as HTMLElement).offsetHeight);
      setLeft((_el as HTMLElement).offsetLeft);
      setTop((_el as HTMLElement).offsetTop);
      return;
    }

    if (td.col >= cCol && td.row >= cRow) {
      setWidth((td.col - cCol + 1) * (_el as HTMLElement).offsetWidth);
      setHeight((td.row - cRow + 1) * (_el as HTMLElement).offsetHeight);
      if (td.col > cCol && td.row === cRow) {
        setTop((_el as HTMLElement).offsetTop);
      }
      if (td.col === cCol && td.row > cRow) {
        setLeft((_el as HTMLElement).offsetLeft);
      }
      return;
    }

    if (td.col > cCol && td.row < cRow) {
      setWidth((td.col - cCol + 1) * (_el as HTMLElement).offsetWidth);
      setHeight((cRow - td.row + 1) * (_el as HTMLElement).offsetHeight);
      setTop((_el as HTMLElement).offsetTop);
      return;
    }

    if (td.col < cCol && td.row > cRow) {
      setWidth((cCol - td.col + 1) * (_el as HTMLElement).offsetWidth);
      setHeight((td.row - cRow + 1) * (_el as HTMLElement).offsetHeight);
      setLeft((_el as HTMLElement).offsetLeft);
      return;
    }
  };

  // 鼠标抬起
  const handleMouseUp = (td: ITdData) => {
    if (td.col <= cCol && td.row <= cRow) {
      changeTdStatus([td.row, cRow], [td.col, cCol], !selected);
    }

    if (td.col >= cCol && td.row >= cRow) {
      changeTdStatus([cRow, td.row], [cCol, td.col], !selected);
    }

    if (td.col > cCol && td.row < cRow) {
      changeTdStatus([td.row, cRow], [cCol, td.col], !selected);
    }

    if (td.col < cCol && td.row > cRow) {
      changeTdStatus([cRow, td.row], [td.col, cCol], !selected);
    }

    setWidth(0);
    setHeight(0);
    setMouseMode(0);
  };

  // 修改 td 状态
  const changeTdStatus = (
    _row: number[],
    _col: number[],
    _selected: boolean
  ) => {
    const [minRow, maxRow] = _row;
    const [minCol, maxCol] = _col;
    weektimeData.forEach((_t: any) => {
      _t.child.forEach((_c: ITdData) => {
        if (
          _c.row >= minRow &&
          _c.row <= maxRow &&
          _c.col >= minCol &&
          _c.col <= maxCol
        ) {
          _c.selected = _selected;
        }
      });
    });

    setSelectedData(
      weektimeData.map((_item: IWeektimeDataItem) => {
        return {
          id: _item.row,
          name: _item.value,
          value: filterChild(_item.child),
        };
      })
    );
  };

  // 清除已选数据
  const clearData = () => {
    weektimeData.forEach((_item) => {
      _item.child.forEach((_c: any) => {
        _c.selected = false;
      });
    });
  };

  // 返回用户是否选择了某些时间段
  const userSelected = () =>
    selectedData!.some((_r: { value: any }) => _r.value);

  // 选中工作日时间，09:00 ~ 18:00
  const selectWorkDayTime = () => {
    const _cloneData = cloneDeep(weektimeData);
    const wLen = _cloneData.length;

    const minTime = 16;
    const maxTime = 35;
    for (let i = 0; i < wLen; i++) {
      for (let j = 0; j < _cloneData[i].child.length; j++) {
        if (j >= minTime && j <= maxTime) {
          _cloneData[i].child[j].selected = true;
        }
      }
    }
    setSelectedData(
      _cloneData.map((_item: IWeektimeDataItem) => {
        return {
          id: _item.row,
          name: _item.value,
          value: filterChild(_item.child),
        };
      })
    );
  };

  return isVisible ? (
    <div className="wt-selector" style={{ minWidth }}>
      <div
        className="wt-schedue"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          left: `${left}px`,
          top: `${top}px`,
        }}
      ></div>

      <table className="wt-selector-table">
        <thead className="wt-selector-head">
          <tr>
            <th
              colSpan={49}
              style={{
                textAlign: 'right',
                fontSize: '12px',
                fontWeight: 400,
              }}
            >
              <span style={{ marginRight: '15px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: '15px',
                    height: '5px',
                    border: '1px solid #355FD2',
                    backgroundColor: '#355FD2',
                    borderRadius: '2px',
                    marginRight: '5px',
                  }}
                ></span>
                <span>已选</span>
              </span>
              <span style={{ marginRight: '15px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: '15px',
                    height: '5px',
                    border: '1px solid #e5e5e5',
                    borderRadius: '2px',
                    marginRight: '5px',
                  }}
                ></span>
                <span>可选</span>
              </span>
            </th>
          </tr>
          <tr>
            <th rowSpan={8} className="wk-td">
              星期/时间
            </th>
            <th colSpan={24}>00:00 - 12:00</th>
            <th colSpan={24}>12:00 - 24:00</th>
          </tr>
          <tr>
            {theadRange.map((_t) => (
              <td key={_t} colSpan={2} style={{ textAlign: 'center' }}>
                {_t}
              </td>
            ))}
          </tr>
        </thead>
        <tbody className="wk-selector-body">
          {weektimeData.map(
            (rData: {
              row: React.Key | null | undefined;
              value:
                | boolean
                | React.ReactChild
                | React.ReactFragment
                | React.ReactPortal
                | null
                | undefined;
              child: any[];
            }) => (
              <tr key={rData.row}>
                <td style={{ textAlign: 'center' }}>{rData.value}</td>
                {rData.child.map((_td) => (
                  <td
                    key={`${_td.row}-${_td.col}`}
                    data-testid={`tid-${_td.row}-${_td.col}`}
                    className={classnames(
                      `td-${_td.row}-${_td.col}`,
                      _td.selected && 'selected'
                    )}
                    // style={_td.selected ? { backgroundColor: '#355FD2' } : {}}
                    data-week={_td.row}
                    data-time={_td.col}
                    onMouseDown={() => handleMouseDown(_td)}
                    onMouseEnter={() => handleMouseEnter(_td)}
                    onMouseUp={() => handleMouseUp(_td)}
                  ></td>
                ))}
              </tr>
            )
          )}
          <tr>
            <td colSpan={49} className="wk-selector-view">
              <div className="">
                <span>
                  {userSelected() ? '已选择时间段' : '可拖动鼠标选择时间段'}
                </span>
                {userSelected() && (
                  <span
                    onClick={() => {
                      setSelectedData([]);
                      clearData();
                    }}
                    style={{
                      float: 'right',
                      marginRight: '20px',
                      color: '#355FD2',
                      cursor: 'pointer',
                    }}
                  >
                    清空
                  </span>
                )}
              </div>
              {isShowSelected && (
                <div>
                  {selectedData.map((_it: any) => (
                    <div key={_it.id}>
                      {_it.value && (
                        <p style={{ textAlign: 'left', marginLeft: '15px' }}>
                          <span style={{ marginRight: '15px' }}>
                            {_it.name}
                          </span>
                          <span>{_it.value}</span>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      {/* <div className="gold-time-selector">
        <button className="home-day" onClick={() => selectGoldTime('home-day')}>
          选中休息日黄金时间段
        </button>
        <button className="work-day" onClick={() => selectGoldTime('work-day')}>
          选中工作日黄金时间段
        </button>
      </div> */}
    </div>
  ) : (
    <div></div>
  );
};

export default WeektimeSelector;
