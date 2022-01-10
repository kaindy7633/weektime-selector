import React = require('react');
import WeektimeSelector from '../src/WeektimeSelector';

const App: React.FC = () => {
  return (
    <div className="App">
      <h2 className="app-title">日期时间选择组件(React版本)</h2>
      <WeektimeSelector />
    </div>
  );
};

export default App;
