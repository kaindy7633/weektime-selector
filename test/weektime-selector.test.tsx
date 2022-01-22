import React from 'react';
import {
  render,
  // screen,
  cleanup,
  fireEvent,
  RenderResult,
} from '@testing-library/react';
import WeektimeSelector from '../src/WeektimeSelector';

let wrapper: RenderResult;
beforeEach(() => {
  wrapper = render(<WeektimeSelector getSelectedData={() => {}} />);
});

afterEach(cleanup);

describe('should be test weektime selector component', () => {
  it('should take a snapshot', () => {
    // 生成快照
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('test some text rendered', () => {
    // 测试文本是否正常渲染
    const { getByText } = wrapper;

    expect(getByText(/已选/i)).toBeInTheDocument;
    expect(getByText(/可选/i)).toBeInTheDocument;
    expect(getByText(/星期\/时间/i)).toBeInTheDocument;
    expect(getByText(/星期一/i)).toBeInTheDocument;
    expect(getByText(/星期二/i)).toBeInTheDocument;
    expect(getByText(/星期三/i)).toBeInTheDocument;
    expect(getByText(/星期四/i)).toBeInTheDocument;
    expect(getByText(/星期五/i)).toBeInTheDocument;
    expect(getByText(/星期六/i)).toBeInTheDocument;
    expect(getByText(/星期日/i)).toBeInTheDocument;
  });

  it('have some style when click td of time', () => {
    // 当点击某个单元时间格时
    const { getByTestId } = wrapper;
    // 获取第一个时间单元格
    const _td = getByTestId('tid-0-0');
    fireEvent.click(_td);
  });
});
