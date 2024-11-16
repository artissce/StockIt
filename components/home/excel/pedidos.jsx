import React, { useRef } from 'react';
import { RangeDirective, SheetDirective, SpreadsheetComponent } from '@syncfusion/ej2-react-spreadsheet';
import '@syncfusion/ej2-react-spreadsheet/styles/material.css';
import './Spreadsheet.css';

const Spreadsheet = () => {
    const spreadsheetRef = useRef(null);

    return (
        <div className="spreadsheet-container">
            <SpreadsheetComponent
                ref={spreadsheetRef}
                allowOpen={true}
                allowSave={true}
            >
                <SheetDirective>
                    <SheetDirective>
                        <RangeDirective>
                            <RangeDirective>
                                
                            </RangeDirective>
                        </RangeDirective>
                    </SheetDirective>
                </SheetDirective>
            </SpreadsheetComponent>
        </div>
    );
};

export default Spreadsheet;
