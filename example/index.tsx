import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Toggle } from '../src/index';
import { useState } from 'react';

const App = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <div>
      <Toggle isOn={isOn} handleChange={() => setIsOn(!isOn)} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
