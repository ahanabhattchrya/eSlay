import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

let currTable = []

function makeItemRow(itemId, name, price, description, status, currBid, maxBid, minBid) {
    return { itemId, name, price, description, status, currBid, maxBid, minBid };
}

axios({
    method : 'GET',
    url : '/all-items',
})
.then((response) => {
    let decodedResponse = JSON.parse(response);
    if (decodedResponse["status_code"] == 200) {
        currTable = decodedResponse["item"]
    }
});

for (let idx = 0; idx < currTable.length; idx++) {
    currItem = currTable[idx]
    currTable[idx] = makeItemRow(
        currItem["itemId"],
        currItem["name"],
        currItem["price"],
        currItem["description"],
        currItem["status"],
        currItem["currBid"],
        currItem["maxBid"],
        currBid["minBid"]
    )
}

export default function ItemListTable() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple_table">
                <TableHead>
                    <TableRow>
                        <TableCell>Item ID</TableCell>
                        <TableCell align="right">Image</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Description</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Current Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currTable.map((row) => (
                        <TableRow
                            key={row.itemId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.image}
                            </TableCell>
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">{row.description}</TableCell>
                            <TableCell align="right">{row.price}</TableCell>
                            <TableCell align="right">{row.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}