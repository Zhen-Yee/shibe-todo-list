import React from 'react';
import { Checkbox } from 'semantic-ui-react';

export const CheckboxComponent = props => {
    return (
        <Checkbox onChange={props.onCheck} disabled={props.isDisable}></Checkbox>
    );
}