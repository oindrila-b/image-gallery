import { Button, GridListTile, GridListTileBar } from '@material-ui/core'
import FileSaver from 'file-saver'
import React from 'react'
import axios from 'axios'
import './index.css'

export const Modal = ({selectedImg, setSelectedImg}) => {

    const accessKey = process.env.REACT_APP_ACCESS_KEY;

    const handleClick = (event) => {
        if(event.target.classList.contains('backdrop')){
            setSelectedImg(null)
        }
    }

    const downloadPhoto = async (event) => {
        console.info(selectedImg);
        const headers = {
            "Authorization": `Client-ID ${accessKey}`
        };
        const options = {
            headers: headers
        }
        const resp = await axios.get(selectedImg.links.download_location, options);
        const url = resp.data.url;
        FileSaver.saveAs(url, "image.jpeg");
    }

    return (
        <div className = "backdrop"
        onClick = {handleClick}>
            <img src={selectedImg.urls.regular} alt="enlarged selected image"/>
            <button type="button" className = "btn" onClick={downloadPhoto}>Download</button>
          
           <GridListTileBar
           style={{borderRadius : '60px'}}

           title={!(selectedImg.user.name ) ? "Photographer : Unknown" : "Phototgrapher : " + selectedImg.user.name  } 
           subtitle = {!(selectedImg.user.bio) ? "No User Bio Available" : "Bio : " + selectedImg.user.bio}
           >
           </GridListTileBar>
         
        </div>
    )
}
