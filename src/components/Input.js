import { TextField } from '@material-ui/core'
import React from 'react'

export const Input = (props) => {
    return (
        <form
        onSubmit={props.submit}>
           <TextField
            style={{margin : '30px'}}
            fullWidth
            label = " Search for anything"
            onChange ={props.change}
           
           />
        </form>
    )
}
