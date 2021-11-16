import React, {useState, useEffect} from "react";
import axios from "axios";
import { Container } from "@material-ui/core";
import { Gallery } from './components/Gallery'
import {Input} from './components/Input'
import { CircularProgress } from "@material-ui/core";
import {Pagination} from '@material-ui/lab'
import { Heading } from "./components/Heading";
import { Modal } from "./components/Modal";



function App() {

  const[images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setformData] = useState('');
  const [page, setPage] = useState('');
  const [selectedImg, setSelectedImg] = useState('');

    const accessKey = process.env.REACT_APP_ACCESS_KEY;
    const fetchData = async(input, page) => {
      setLoading(true);
        const response = await axios.get(
          `https://api.unsplash.com/search/photos?page=${page}&query=${
            !input ? 'cats' : input
          }&client_id=${accessKey}&per_page=20`
          );
         const data  = await response.data
         console.log(response.data)
         setImages(data);
         setLoading(false);
    };

    const handleChange = (event) =>{
      setformData(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchData(formData);
    }

    const pageChange= (event,value) =>{
      setPage(value);
      fetchData(formData, value);
    }

    useEffect (()=> {
      fetchData();
    } ,[]);

    if(loading)
     return (
       <div style={{
        height : '100vh',
        display : 'flex',
        color : 'violet',
        justifyContent : 'center',
        alignItems:'center'
        }}><CircularProgress size ={130} />
    </div> 
    );

  return (
    <Container>

      <Heading/>

      <Input change = {handleChange} submit = {handleSubmit}/>

      <div style={{
        margin : '10px',
        display : 'flex',
        justifyContent : 'center'}}> 
      <Pagination
       count={10} 
       variant="outlined"
        size = 'large'
        onChange={pageChange}
        page = {page}
        />
      </div>

      <Gallery images= {images.results}  setSelectedImg = {setSelectedImg}/>
      {selectedImg && <Modal selectedImg = {selectedImg} setSelectedImg = {setSelectedImg}/> }
           
    </Container>
  

  );
}

export default App;
