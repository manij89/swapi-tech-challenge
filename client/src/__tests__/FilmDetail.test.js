import React from 'react';
import { cleanup} from '@testing-library/react'
import { createMemoryHistory } from 'history';
import App from '../App';
import FilmDetail from '../containers/FilmDetail';

import {render} from '../test-utils';

afterEach(cleanup)

it('register snapshot', () => {
  const history = createMemoryHistory();
  history.push('/film/1');
  const { asFragment } = render(<App />, { history });
  
  expect(asFragment(<FilmDetail />)).toMatchSnapshot()
})