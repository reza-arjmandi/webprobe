import * as React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

export default function ControlledCheckbox(props) {
    const { enable, disable } = props;
    const [checked] = React.useState(true);

    return (
        <div>
            {checked &&
                <Checkbox
                    onChange={
                        () => { enable() }}
                >
                </Checkbox>
            }
            {!checked &&
                <Checkbox
                    onChange={
                        () => { disable() }}
                >
                </Checkbox>
            }
            Enable Virtual Card
        </div>
    );
}


