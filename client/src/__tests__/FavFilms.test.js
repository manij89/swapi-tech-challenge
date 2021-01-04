import React from 'react';
import { cleanup} from '@testing-library/react'
import { createMemoryHistory } from 'history';
import App from '../App';
import FavFilms from '../containers/FavFilms';

import {render} from '../test-utils';

afterEach(cleanup)

it('register snapshot', () => {
  const history = createMemoryHistory();
  history.push('/favFilms');
  const { asFragment } = render(<App />, { history });
  
  expect(asFragment(<FavFilms />)).toMatchSnapshot()
})