import React, { useState } from 'react';
import { connect } from 'react-redux';
import filterFunc from './storage/filter';

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

    function onNextPage() {
        if (props.currentPage >= props.pages - 1) {
            return false;
        };
        props.onNextPage();
    };

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
            <div className='button-wrapper'>
                <button onClick={props.onPreviousPage}>
                    {'<-'}
                </button>
                <p>
                    {props.currentPage + 1 + ' / ' + props.pages}
                </p>
                <button onClick={onNextPage}>
                    {'->'}
                </button>
            </div>
        </header>
    );
};


export default connect(
    state => ({
        pages: Math.ceil(filterFunc(state.data.state, state.filter).length / 50),
        currentPage: state.currentPage,
    }),
    dispatch => ({
        onGetData: async function (url) {
            dispatch({ type: 'REQUESTED_DATA' });
            dispatch({ type: 'FIRST_PAGE' })
            try {
                let response = await fetch(url);
                let json = await response.json();
                dispatch({
                    type: 'REQUESTED_DATA_SUCCEEDED',
                    data: json,
                })
            } catch {
                dispatch({
                    type: 'REQUESTED_DATA_FAILED',
                })
            };
        },
        onSetFilter: (string) => {
            dispatch({
                type: 'SAVE_FILTER',
                filter: string,
            })
        },
        onNextPage: () => {
            dispatch({
                type: 'NEXT_PAGE',
            });
        },
        onPreviousPage: () => {
            dispatch({
                type: 'PREVIOUS_PAGE',
            })
        }
    }),
)(Header);