import React, {ChangeEvent, KeyboardEvent, useState, useCallback} from 'react';
import {Button} from '@material-ui/core'
import TextField from "@mui/material/TextField";
import { IconButton } from '@mui/material';
import {ControlPoint} from "@mui/icons-material";
type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const  AddItemForm  = React.memo ((props: AddItemFormPropsType)=> {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = useCallback( () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    },[props.addItem]
)
    const onChangeHandler = useCallback( (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    },[]
)
    const onKeyPressHandler = useCallback( (e: KeyboardEvent<HTMLInputElement>) => {
        if(error!== null){
            setError(null);
        }

        if (e.charCode === 13) {
            addItem();
        }
    },[]
)
    return <div>

        <TextField value={title}
               onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}
               error={!!error}
                   label='Type value'
                   helperText={error}
        />

        <IconButton onClick={addItem}  > <ControlPoint />  </IconButton>


    </div>
}
)
