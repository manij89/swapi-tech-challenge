import React from 'react';
import { cleanup} from '@testing-library/react'
import { createMemoryHistory } from 'history';
import App from '../App';
import CharacterDetail from '../containers/CharacterDetail';

import {render} from '../test-utils';

afterEach(cleanup)

it('register snapshot', () => {
  const history = createMemoryHistory();
  history.push('/character/Yoda');
  const { asFragment } = render(<App />, { history });
  
  expect(asFragment(<CharacterDetail />)).toMatchSnapshot()
})