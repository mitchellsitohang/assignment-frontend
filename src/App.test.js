import React from 'react';
import { unmountComponentAtNode, render } from 'react-dom';
import { act } from "react-dom/test-utils";
import App, { SearchButton, ClearButton, SearchInput, fetchDataFromServer } from './App';
import { shallow } from 'enzyme';

let container = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('DataFetch Test:', () => {
  it('Fetches Data using Fetch API', () => {
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });

    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    act(() => {
      fetchDataFromServer();
    })
    
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://my-json-server.typicode.com/m3otis/fakeapi/suggestions');
  });

  it('Fetches Data using the right url', () => {
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    act(() => {
      fetchDataFromServer();
    })
    expect(global.fetch).toHaveBeenCalledWith('https://my-json-server.typicode.com/m3otis/fakeapi/suggestions');
  });
});

describe('App Tests:', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('should contain div with correct classNames', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('.searchInputContainer').length).toEqual(1);
    expect(wrapper.find('.App').length).toEqual(1);
  });
})

describe('SearchInput Tests:', () => {
  it('renders without crashing', () => {
    shallow(<SearchInput />);
  });

  it('should contain div and correct children', () => {
    const wrapper = shallow(<SearchInput />);
    expect(wrapper.find(SearchButton).length).toEqual(1);
    expect(wrapper.find(ClearButton).length).toEqual(0);
    expect(wrapper.find('.searchInput').length).toEqual(1);
  });

  it('should contain input', () => {
    const wrapper = shallow(<SearchInput />);
    expect(wrapper.find('input').length).toEqual(1);
  });
})

describe('SearchButton Tests:', () => {
  it('renders without crashing', () => {
    shallow(<SearchButton />);
  });

  it('should render graphic', () => {
    act(() => {
      render(<SearchButton />, container);
    });
    expect(container.textContent).toEqual('searchIcon.svg');
  })
})

describe('ClearButton Tests:', () => {
  it('renders without crashing', () => {
    shallow(<ClearButton />);
  });

  it('should render graphic', () => {
    act(() => {
      render(<ClearButton />, container);
    });
    expect(container.textContent).toEqual('Close.svg');
  })
})
