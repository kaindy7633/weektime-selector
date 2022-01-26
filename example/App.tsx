import { useState, useCallback } from 'react';
import React = require('react');
import { ISelectedData } from '../src/interface';
import WeektimeSelector from '../src/WeektimeSelector';

const App: React.FC = () => {
  const [data, setData] = useState<ISelectedData[]>([]);
  const [selectAllWorkDayTime, setSelectAllWorkDayTime] =
    useState<boolean>(false);

  const getData = useCallback((value: ISelectedData[]) => {
    setData(value);
  }, []);

  return (
    <div className="App">
      <h2 className="app-title">日期时间选择组件(React版本)</h2>
      <WeektimeSelector
        getSelectedData={getData}
        selectAllWorkDayTime={selectAllWorkDayTime}
      />
      <p>
        <button onClick={() => setSelectAllWorkDayTime(true)}>
          选中所有工作日时间
        </button>
      </p>

      <div>
        {data &&
          data.map((_it: any) => (
            <div key={_it.id}>
              {_it.value && (
                <p style={{ textAlign: 'left', marginLeft: '15px' }}>
                  <span style={{ marginRight: '15px' }}>{_it.name}</span>
                  <span>{_it.value}</span>
                </p>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default App;
