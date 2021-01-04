import React from 'react';
import { cleanup} from '@testing-library/react'
import { createMemoryHistory } from 'history';
import App from '../App';
import Home from '../containers/Home';

import {render} from '../test-utils';

afterEach(cleanup)

it('register snapshot', () => {
  const history = createMemoryHistory();
  history.push('/');
  const { asFragment } = render(<App />, { history });
  
  expect(asFragment(<Home />)).toMatchSnapshot()
})

