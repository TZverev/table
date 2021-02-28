import React, { useState } from 'react';
import { connect } from 'react-redux';

function Header(props) {

    const [status, setStatus] = useState('');

    function onGetLowData() {
        const url = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
        props.onGetData(url);
    };

    function onGetBigData() {
        const url = 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
        props.onGetData(url);
    };

    return (
        <header>
            <button onClick={onGetLowData}>
                Get low data
            </button>
            <button onClick={onGetBigData}>
                Get big data
            </button>
            <div>
                {status}
            </div>
        </header>
    );
};


export default connect(
    state => ({}),
    dispatch => ({
        onGetData: async function (url) {
            let data;
            const response = await fetch(url);
            if (response.ok) {
                data = await response.json();
                dispatch({
                    type: 'GET_DATA',
                    data: data,
                });
                return response.status;
            } else {
                return response.status;
            };
        },
    }),
)(Header);