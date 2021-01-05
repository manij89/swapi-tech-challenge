import React from 'react';
import { cleanup} from '@testing-library/react'
import { createMemoryHistory } from 'history';
import App from '../App';
import Home from '../containers/Home';
import ListContainer from '../components/ListContainer/ListContainer';

import {render} from '../test-utils';

afterEach(cleanup)

test('register snapshot', async () => {
  const history = createMemoryHistory();
  history.push('/');
  const { asFragment } = await (render(<App />, { history }));
  expect(asFragment(<Home />)).toMatchSnapshot()
})

// test('gets the information from API', () => {
//   const {getByTestId} =  render(<ListContainer />);
//   const list = getByTestId('list-container');
//   console.log(list)
//   expect(list.child.length).toEqual(6);
// });

