import React, { useState } from 'react';
import { connect } from 'react-redux';
import filterFunc from './storage/filter';


function TD(props) {
    let arr = Object.values(props.obj);
    return (
        <>
            {arr.map((key) => {
                if (typeof key === 'number' || typeof key === 'string') {
                    return (
                        <td key={key}>
                            {key}
                        </td>
                    )
                }
                return <td key={key}>No data</td>
            })}
        </>
    );
};

function TH(props) {
    let arr = Object.keys(props.obj);
    return (
        <>
            {arr.map((key) => {
                if (typeof key === 'string') {
                    return (
                        <th key={key}
                            onClick={() => {
                                props.sortFunc(props.data, key)
                            }}>
                            { key}
                        </th>
                    )
                }
                return false
            })}
        </>
    );
};

function Table(props) {

    const [direction, setDirection] = useState(true);

    const size = 50;
    const i = props.page;

    const data = props.sortedData.slice((i * size), (i * size) + size);
    const mainData = props.mainData;

    function onSortData(arr, id) {
        function compare(a, b, key = id) {
            if (direction) {
                setDirection(!direction);
                if (a[key] > b[key]) return 1;
                if (a[key] === b[key]) return 0;
                if (a[key] < b[key]) return -1;
            } else {
                setDirection(!direction);
                if (a[key] > b[key]) return -1;
                if (a[key] === b[key]) return 0;
                if (a[key] < b[key]) return 1;
            }
        };
        arr = arr.sort(compare);
        props.onSortData(arr);
    }

    return (
        <div className='table-container'>
            {props.isLoading &&
                <div className='loading-bg'>
                    <div className='loading-body'>
                        Loading...
                    </div>
                </div>
            }
            {props.error &&
                <p>
                    Error
                </p>
            }
            {data.length ?
                <table>
                    <tbody>
                        <tr>
                            <TH obj={data[0]}
                                sortFunc={onSortData}
                                data={mainData} />
                        </tr>
                        {data.map((obj, index) => {
                            return (
                                <tr key={obj.firstName + obj.id + index}>
                                    <TD obj={obj} />
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                :
                <div>
                    No data
                </div>
            }
        </div>
    );
};

export default connect(
    state => ({
        sortedData: filterFunc(state.data.state, state.filter),
        mainData: state.data.state,
        isLoading: state.data.isLoading,
        page: state.currentPage,
        error: state.data.error,
    }),
    dispatch => ({
        onSortData: (arr) => {
            dispatch({ type: 'LOADING_START' });
            dispatch({
                type: 'SORT_DATA',
                data: arr.concat([]),
            })
            dispatch({ type: 'LOADING_FINISHED' });
        },
    }),
)(Table);