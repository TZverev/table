import React, { useState } from 'react';
import { connect } from 'react-redux';

function Header(props) {
    const [lastRequest, setLastRequest] = useState(null);

    function onGetLowData() {
        const url = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
        props.onGetData(url);
    };

    function onGetBigData() {
        const url = 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
        props.onGetData(url);
    };

    function onSaveFilter(value) {
        clearTimeout(lastRequest);
        setLastRequest(setTimeout(() => { props.onSetFilter(value) }, 500));
    }

    return (
        <header>
            <button onClick={onGetLowData}>
                Get low data
            </button>
            <button onClick={onGetBigData}>
                Get big data
            </button>
            <input onChange={(e) => { onSaveFilter(e.target.value) }}
                placeholder='Searching' />
        </header>
    );
};


export default connect(
    state => ({}),
    dispatch => ({
        onGetData: async function (url) {
            let data;
            dispatch({ type: 'LOADING_START' });
            const response = await fetch(url);
            if (response.ok) {
                data = await response.json();
                dispatch({
                    type: 'GET_DATA',
                    data: data,
                });
                dispatch({ type: 'LOADING_FINISHED' });
                return response.status;
            } else {
                dispatch({ type: 'LOADING_FINISHED' });
                return response.status;
            };
        },
        onSetFilter: (string) => {
            dispatch({ type: 'LOADING_START' });
            dispatch({
                type: 'SAVE_FILTER',
                filter: string,
            })
            dispatch({ type: 'LOADING_FINISHED' });
        }
    }),
)(Header);