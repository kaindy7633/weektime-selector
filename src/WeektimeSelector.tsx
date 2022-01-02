import React, { useEffect, useState } from 'react';
import { IWeektimeSelectorProps, ITdData } from './interface';

const WeektimeSelector: React.FC<IWeektimeSelectorProps> = () => {
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

  return <></>;
};

export default WeektimeSelector;
