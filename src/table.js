import React from 'react';
import { connect } from 'react-redux';


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
                        <th key={key}>
                            { key}
                        </th>
                    )
                }
            })}
        </>
    );
};

function Table(props) {

    return (
        <table>
            <tbody>
                <tr>
                    <TH obj={props.data[0]} />
                </tr>
                {props.data.map((obj) => {
                    return (
                        <tr key={obj.id + obj.id}>
                            <TD obj={obj} />
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );
};

export default connect(
    state => ({
        data: state
    }),
    dispatch => ({}),
)(Table);