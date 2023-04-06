import React from 'react';
import {THeadCell} from "./THeadCell.jsx";
import {TBodyCell} from "./TBodyCell";

function Table({th_data = [], tb_data = [], action1, showDetails, action2}) {

    return (
        <table className={"table"}>
            <THeadCell data={th_data}/>
            <TBodyCell
                data={tb_data}
                th_data={th_data}
                action1={action1}
                action2={action2}
                showDetails={showDetails}
            />
        </table>
    );
}

export default Table;