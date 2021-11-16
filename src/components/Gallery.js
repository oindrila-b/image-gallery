import React from 'react'
import { GridList } from '@material-ui/core';
import { GridListTile } from '@material-ui/core';
import { GridListTileBar } from '@material-ui/core';


export const Gallery = (props) => {
        return (
            <GridList cellHeight={380} cols={3} style={{borderRadius : '40px'}}>
                {
                    props.images.map((image) => {
                        return (
                            <GridListTile 
                            cols={(image.width / 3600).toFixed(0)} 
                            style={{flexGrow : '1', padding : '5px'}}>
                                <img src={image.urls.regular}
                                 alt={image.alt_description} 
                                 onClick =  {() => props.setSelectedImg(image)}
                                 />
                                <GridListTileBar

                                 title=
                                 {!(image.likes) ? "Unknown Likes" : "👍  :  " +
                                  ((image.likes > 1000) ? (image.likes/1000) + "K" : image.likes) + " likes"
                                }
                                 subtitle={"Photographer : " + image.user.name}
                                 />
                            </GridListTile>
                        )
                    })
                }
            </GridList>
        );
   
};
