import React from 'react';
import { cleanup} from '@testing-library/react'
import { createMemoryHistory } from 'history';
import App from '../App';
import Home from '../containers/Home';
import ListContainer from '../components/ListContainer/ListContainer';

import {render} from '../test-utils';

afterEach(cleanup)

test('register snapshot', () => {
  const history = createMemoryHistory();
  history.push('/');
  const { asFragment } = render(<App />, { history });
  
  expect(asFragment(<Home />)).toMatchSnapshot()
})

test('gets the information from API', () => {

  const {getByTestId} =  render(<Home />);

  const list = getByTestId('list-container');
  expect(dataToDisplay).toHaveBeenCalled();
  expect(list.children.length).toEqual(6);
});

