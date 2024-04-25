import { Box } from '@chakra-ui/react';
import {React,useState,useEffect} from 'react'
import ManagerBills from '../components/ManagerBills';
import CoordBills from '../components/CoordBills';
import CoordBillprop from '../components/CoordBillprop';
import axios from 'axios';
function Approve() {

  const [bills, setBills] = useState([]);

  useEffect(() => {
    axios.get('https://teambudgeter-2tdd.vercel.app/')
      .then(res => {
        setBills(res.data);
      })
  }, []);
  // console.log(bills);


  return (
    <Box >
      {bills.filter(bills => bills.status == "Queued").map(group => (
      <CoordBillprop key={group._id} billname= {group.billname} itemname = {group.itemname} amount = {group.amount} proof={group.proof} status={group.status} id={group._id}/>
    ))
  }
    </Box>
  )
}

export default Approve
