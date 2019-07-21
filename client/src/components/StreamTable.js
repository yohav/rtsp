import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";


const StreamTable = ({streams, onSelectStream}) => (
    <Fragment>
        <Table>
            <TableBody>
                {
                    streams.map((stream)=>{
                        return <TableRow>
                            <TableCell className="stream-link" onClick={() => onSelectStream(stream.url)}>{stream.url}</TableCell>
                        </TableRow>
                    })
                }
            </TableBody>
        </Table>
    </Fragment>
);

StreamTable.propTypes = {
    streams: PropTypes.array.isRequired
};

export default StreamTable;
