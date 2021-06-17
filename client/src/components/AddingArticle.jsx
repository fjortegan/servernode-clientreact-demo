import React, { Component, Fragment, useState} from 'react';
import axios from 'axios';

import '../components/css/register.css'; 

function getCookie(key) {
  var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}

const AddingArticle = (props) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState([]);

  const uploadArticle = async (e) => {
    debugger
    e.preventDefault();
    const data3 = new FormData();
    data3.append('name', name);
    data3.append('price', price);
    data3.append('image', image.selectedFile);
    await axios({
        method: 'post',
        headers: {
            "Content-Type": "multipart/form-data",
            "access-token": getCookie('token'),
        },
        url: 'http://localhost:5000/sudaderas',
        data: data3
    }).then(response => {
    console.log(response.data.id);
    props.history.push('/sudaderas');
    }).catch(err=>{
      console.log(err);
    });
  }

  
  return(
    <div className="addingArticle">
      <form encType="multipart/form-data" onSubmit={uploadArticle}>
      <input type="text" name="name" onChange={e => setName(e.target.value)}/>
      <input type="file" name="image" onChange={e => setImage({selectedFile:e.target.files[0]})}/>
      <input type="text" name="price" onChange={e => setPrice(e.target.value)}/>
      <input type="submit" value="Insertar"/>
      </form>
    </div>
  )
}
export default AddingArticle

/*
function AddingArticle(){
  const [archivos, setArchivos]=useState(null);

  const subirArchivos = e => {
    setArchivos(e);
  }

  const insertarArchivos = async() => {
    const f = new FormData();

    for(let index = 0; index < archivos.length; index++){
      f.append("files", archivos[index]);
    }

    await axios.post("https://localhost:3000/sudaderas", f)
    .then(res=>{
      console.log(res.data);
    }).catch(err=>{
      console.log(err);
    })
  }

  return(
    <div className="addingArticle">
      <input type="text" name="name"/>
      <input type="file" name="image"/>
      <input type="text" name="price"/>
      <input type="submit" value="Insertar"/>
    </div>
  )
}

export default AddingArticle;
*/