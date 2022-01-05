import React, { useEffect, useState } from 'react';
import './App.css';
import WeektimeSelector from './components/WeektimeSelector';
import { createChild, filterChild, weekList } from './utils';
import { cloneDeep } from 'lodash';

export interface IWeektimeDataItem {
  value: string;
  row: number;
  child: ITdData[];
}

export interface ISelectedData {
  id: number;
  name: string;
  value: string | void;
}

function App() {
  const [weektimeData, setWeektimeData] = useState<IWeektimeDataItem[]>(
    weekList.map((_value, _index) => {
      return {
        value: _value,
        row: _index,
        child: createChild(_value, _index, 48),
      };
    })
  );

  const [selectedData, setSelectedData] = useState<ISelectedData[]>(
    weektimeData.map((_item: IWeektimeDataItem) => {
      return {
        id: _item.row,
        name: _item.value,
        value: filterChild(_item.child),
      };
    })
  );

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

  // 清除已选数据
  const clearData = () => {
    weektimeData.forEach((_item) => {
      _item.child.forEach((_c: any) => {
        _c.selected = false;
      });
    });
  };

  // 选中黄金时间
  const selectGoldTime = (type: string) => {
    const _cloneData = cloneDeep(weektimeData);
    const wLen = _cloneData.length;

    const minTime = 18;
    const maxTime = 41;
    for (let i = 0; i < wLen; i++) {
      if (type === 'work-day' && i < 5) {
        for (let j = 0; j < _cloneData[i].child.length; j++) {
          if (j >= minTime && j <= maxTime) {
            _cloneData[i].child[j].selected = true;
          }
        }
      } else if (type === 'home-day' && i > 4) {
        for (let j = 0; j < _cloneData[i].child.length; j++) {
          if (j >= minTime && j <= maxTime) {
            _cloneData[i].child[j].selected = true;
          }
        }
      }
    }
    setWeektimeData(_cloneData);
  };

  return (
    <div className="App">
      <h2 className="app-title">日期时间选择组件(React版本)</h2>
      <WeektimeSelector
        weektimeData={weektimeData}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
        clearData={clearData}
        selectGoldTime={selectGoldTime}
      />
    </div>
  );
}

export default App;
