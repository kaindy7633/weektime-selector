import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

import WeektimeSelector from '../src/WeektimeSelector';

// afterEach(cleanup);

describe('should be test weektime selector component', () => {
  it('render WeektimeSelector component', () => {
    render(<WeektimeSelector />);
    expect(screen.getByText('星期')).toBeInTheDocument();
  });
});
