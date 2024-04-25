import React, {useState, useEffect} from 'react'
import { Form,Link,useNavigate } from 'react-router-dom'
import axios from "axios";
import { addbillRoute } from '../utils/APIRoutes';



import {
    Box, 
    FormControl, 
    FormLabel, 
    FormHelperText, 
    Input, 
    Textarea, 
    Button, 
    Checkbox,
    Container,
  } from '@chakra-ui/react'  
  

export var pid = "";

function Billupload() {


  const navigate = useNavigate();

  const [values,setValues]=useState({
    billname:"",
    itemanme:"",
    amount:"",
    proof:"",
  });




  const handleValidation = () => {
    const { billname,itemname,amount,proof } = values;
    return true;
  };



  


  const handleSubmit = async (event)=>{
    event.preventDefault();
    if(handleValidation()){
        console.log("in validation", addbillRoute)
        const { billname,itemname,amount,proof} = values;
  const { data } = await axios.post(addbillRoute,{
    billname,
    itemname,
    amount,
    proof,
    // teamname:"saarang",
  });
  if(data.status===true)
  {
    localStorage.setItem("bill", JSON.stringify(data.bill));
  }
  navigate("/");
    }
};





const handleChange = (event)=>{
  setValues({ ...values, [event.target.name]: event.target.value });

};
const [imageSelected,setImageSelected]=useState("");
const uploadImage=()=>{
  const formData = new FormData();
  formData.append("file",imageSelected);
  formData.append("upload_preset", "biibbnu4");
  axios.post("https://api.cloudinary.com/v1_1/dtpp08tmi/image/upload",formData).
  then((response)=>{
    updateproof(response.data.secure_url);
    console.log(response);
  });
};




const updateproof = async (pid) => {
  const { billname,itemname,amount,proof} = values;
  const newProof = pid;

  try {
    const response = await fetch(`https://teambudgeter-2tdd.vercel.app/api/updatebill`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ proof: newProof , billname })
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

  return (
    <Container  pb="40px" px="50px" mt="50px" borderRadius="25px" border="1px solid black" style={{
        boxShadow: '2px 2px 5px #656566',
        width: "450px",
        height: "500px",
        }}>
    <Form action='' method='post' onSubmit={(event) => handleSubmit(event)}>
    <FormControl isRequired mt="40px" mb="20px">
        
          <Input type="text" name="billname" placeholder='Bill Name' onChange={(e) => handleChange(e)}/>
          
        </FormControl>

        <FormControl isRequired mb="20px">
          <Input type="text" name="itemname" placeholder='Item Name' onChange={(e) => handleChange(e)}/>
          
        </FormControl>

        <FormControl isRequired mb="20px">
         
          <Input type="text" name="amount" placeholder='Amount (in Rs)' onChange={(e) => handleChange(e)}/>
          
        </FormControl>

        <FormControl isRequired mb="20px">

        <>
            <div> 
               <FormLabel style={{ marginLeft: "6px"}}>Proof:</FormLabel>
            </div>
            <div style={{marginLeft: "0px",}}> 
            <Input border="0px" type="file" name="proof" onChange={(e) => {
            handleChange(e);
            setImageSelected(e.target.files[0]);
            }} />
            </div>
      </>
     
          
          
        </FormControl>
        <Button type='submit' onClick={uploadImage}>Submit</Button>

    </Form>
    </Container>
  )
}

export default Billupload;