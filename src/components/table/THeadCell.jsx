import {v4} from "uuid";

export const THeadCell = ({data}) => {
    return (
        <thead className={"thead"}>
            <tr>
                {data?.map((th_d) => <th className={"th"} key={v4()}>{th_d.name}</th>)}
            </tr>
        </thead>
    );
}
