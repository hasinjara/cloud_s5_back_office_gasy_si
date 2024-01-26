import React from 'react';
import InputPlus from './InputPlus';

const TableCreator = ({ tableName, columns,button }) => {
    return (
        <div>
            <h2>{tableName}</h2>
            <table>
                <thead>
                    <tr>
                        {columns.map((columnName, index) => (
                            <th key={index}>{columnName}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {columns.map((columnName, index) => (
                            <td key={index}>
                                <InputPlus
                                    key={index}
                                    label={""}
                                    name={columnName}
                                    placeholder={columnName}
                                    type="text"
                                />
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default TableCreator;
