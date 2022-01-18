import React from 'react';
// import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { render, screen, cleanup } from '@testing-library/react';

import WeektimeSelector from '../src/WeektimeSelector';

afterEach(cleanup);

const getSelectedData = () => {};

describe('should be test weektime selector component', () => {
  render(<WeektimeSelector getSelectedData={getSelectedData} />);

  it('test some text rendered', () => {
    expect(screen.getByText(/已选/i)).toBeInTheDocument;
    expect(screen.getByText(/可选/i)).toBeInTheDocument;
    expect(screen.getByText(/星期\/时间/i)).toBeInTheDocument;
    expect(screen.getByText(/星期一/i)).toBeInTheDocument;
    expect(screen.getByText(/星期二/i)).toBeInTheDocument;
    expect(screen.getByText(/星期三/i)).toBeInTheDocument;
    expect(screen.getByText(/星期四/i)).toBeInTheDocument;
    expect(screen.getByText(/星期五/i)).toBeInTheDocument;
    expect(screen.getByText(/星期六/i)).toBeInTheDocument;
    expect(screen.getByText(/星期日/i)).toBeInTheDocument;
  });
});
