import './App.css';
import React, { Component, useState, useRef, useEffect } from 'react';
import { ReactComponent as CloseIcon } from './assets/Close.svg';
import { ReactComponent as SearchIcon } from './assets/searchIcon.svg';

class App extends Component {
  userInput = { current: null };

  render() {
    return (
      <div className="App">
        <div className="searchInputContainer">
          <SearchInput userInput={this.userInput}></SearchInput>
        </div>
      </div>
    );
  }
}

export default App;

export async function fetchDataFromServer() {
    const res = await fetch(`https://my-json-server.typicode.com/m3otis/fakeapi/suggestions`);
    return await res.json();
}

export function SearchInput(props) {
  const [userInput, setUserInput] = useState(null);
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState(false);
  const elementRef = useRef();
  const setElementRef = (ref) => elementRef.current = ref;
  const setElementValue = (value) => elementRef.current.value = value;
  const setProp = (userInput) => props.userInput.current = userInput;

  const handleChange = (userInput) => {
    setProp(userInput);
    setUserInput(userInput);
    setSelected(false);
  };

  useEffect(() => {
    if (userInput && userInput.length > 1) {
      fetchData(userInput);
    }
  }, [userInput])

  const fetchData = async (userInput) => {
    await fetchDataFromServer().then(res => {
      const filtered = () => res.filter(d => d.searchterm.toLowerCase().includes(userInput.toLowerCase()));
      setList(filtered);
    })
      .catch(err => console.log('err :>> ', err));
  }

  const selectOption = (userInput) => {
    setElementValue(userInput)
    setProp(userInput);
    setUserInput(userInput);
    setSelected(true);
  }

  const onFocus = () => {
    setSelected(false);
    if (!userInput) {
      setElementValue('trui');
      handleChange('trui');
    }
  }

  return (
    <div>
      <div className="searchInput">
        <input
          type="text"
          title="Zoeken"
          placeholder="Zoeken"
          ref={(ref) => setElementRef(ref)}
          onKeyUp={(e) => handleChange(e.currentTarget.value)}
          onFocus={() => onFocus()}
        ></input>
        {
          userInput && <ClearButton handleClick={selectOption}></ClearButton>
        }
        {
          <SearchButton userInput={userInput}></SearchButton>
        }
      </div>
      {
        userInput && !selected && <List userInput={userInput} handleClick={selectOption} list={list}></List>
      }
    </div>
  )
}

export function SearchButton(props) {
  const className = () => props.userInput ? ('inputButton searchButton focus') : ('inputButton searchButton');

  return (
    <div title={'Zoek'} className={className()}>
      <SearchIcon></SearchIcon>
    </div>
  )
}

export function ClearButton(props) {
  const handleClick = () => props.handleClick(null);

  return (
    <div title={'Maak leeg'} onClick={handleClick} className="inputButton clearButton focus">
      <CloseIcon ></CloseIcon>
    </div>
  )
}

export function List(props) {
  const handleClick = (value) => {
    props.handleClick(value);
  };

  const CreateRow = (props) => {
    const handleClick = (value) => {
      props.handleClick(value.searchterm);
    }

    const userInput = props.userInput;
    const value = props.value;
    const index = value.searchterm.toLowerCase().indexOf(userInput.toLowerCase());
    const highlight = props.value.searchterm.slice(index, (index + userInput.length));
    const start = props.value.searchterm.slice(0, index);
    const end = props.value.searchterm.slice(index + highlight.length);

    return (<div className="row" onClick={() => handleClick(props.value)}> {start}<span className="highlight">{highlight}</span>{end} <span className="highlight">({value.nrResults})</span></div>);
  }

  return (
    <div className="list">
      {
        props.list.map((value, index) => {
          return <CreateRow key={index} handleClick={handleClick} userInput={props.userInput} value={value}></CreateRow>
        })
      }
    </div>
  )
}