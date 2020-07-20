import React from 'react';
import App, { SearchInput, SearchButton, ClearButton, List } from "./App";

export default {
    component: App,
    title: 'App',
};

export const app = () => (
    <div>
        <h1>App</h1>
        <h2>the whole component</h2>
        <App></App>
    </div>
);

export const searchInput = () => {
    return (
        <div>
            <h1>SearchInput</h1>
            <h2>the input</h2>
            <SearchInput></SearchInput>
        </div>
    );
};

export const searchButton = () => {
    return (
        <div>
            <h1>Graphic, right bottom corner</h1>
            <SearchButton></SearchButton>
        </div>
    )
};

export const clearButton = () => {
    return (
        <div>
            <h1>Graphic, right bottom corner</h1>
            <ClearButton></ClearButton>
        </div>
    )
};

const data = [
    {
        "searchterm": "heren truien",
        "nrResults": 1100
    },
    {
        "searchterm": "dames truien",
        "nrResults": 1501
    },
    {
        "searchterm": "kenzo trui",
        "nrResults": 62
    },
    {
        "searchterm": "kenzo trui dames",
        "nrResults": 21
    }
]

export const list = () => {
    return (
        <div>
            <h1>List</h1>
            <h2>dropdown list after entering input</h2>
            <List list={data} userInput="trui"></List>
        </div>
    )
};