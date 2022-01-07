/**
 * @description 创建循环体
 * @param len 循环次数
 * @returns
 */
export const createRange = (len: number): Array<number> => {
  return Array.from(Array(len)).map((_r, id) => id);
};

/**
 * @description 格式化日期时间
 * @param _date
 * @param _fmt
 * @returns
 */
export const formatDate = (_date: Date, _fmt: any) => {
  let o: any = {
    'M+': _date.getMonth() + 1,
    'd+': _date.getDate(),
    'h+': _date.getHours(),
    'm+': _date.getMinutes(),
    's+': _date.getSeconds(),
    'q+': Math.floor((_date.getMonth() + 3) / 3),
    S: _date.getMilliseconds(),
  };
  if (/(y+)/.test(_fmt)) {
    _fmt = _fmt.replace(
      RegExp.$1,
      (_date.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(_fmt)) {
      _fmt = _fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
    }
  }
  return _fmt;
};

export const formatWeektime = (_col: number) => {
  const timestamp = 1629820800000;
  const beginstamp = timestamp + _col * 1800000;
  const endstamp = beginstamp + 1800000;

  const begin = formatDate(new Date(beginstamp), 'hh:mm');
  const end = formatDate(new Date(endstamp), 'hh:mm');
  return `${begin}-${end}`;
};

export const createChild = (
  _r: string,
  _row: number,
  _max: number,
  _goldday?: string
) => {
  return createRange(_max).map((_t, _col) => {
    return {
      week: _r,
      value: formatWeektime(_col),
      begin: formatWeektime(_col).split('-')[0],
      end: formatWeektime(_col).split('-')[1],
      row: _row,
      col: _col,
      selected: !_goldday ? false : handleGoldDay(_goldday, [_row, _col]),
    };
  });
};

export const handleGoldDay = (_gd: string, local: any[]) => {
  const [row, col] = local;

  if (_gd === 'work-day') {
    if (row < 5 && col >= 18 && col <= 43) {
      return true;
    }
  }

  if (_gd === 'home-day') {
    if (row > 4 && col >= 18 && col <= 43) {
      return true;
    }
  }
};

export const filterChild = (list: any[]): string | void => {
  if (!list.length) return;

  const _arr = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i].selected) {
      _arr.push(...['、', list[i].begin, '~', list[i].end]);
    }
  }
  _arr.shift();
  return _arr.join('');
};
