import { Box } from '@chakra-ui/react';
import {React,useState,useEffect} from 'react'
import ManagerBills from '../components/ManagerBills';
import CoordBills from '../components/CoordBills';
import CoordBillprop from '../components/CoordBillprop';
import axios from 'axios';
function Pay() {

  const [bills, setBills] = useState([]);

  useEffect(() => {
    axios.get('https://teambudgeter-2tdd.vercel.app/')
      .then(res => {
        setBills(res.data);
      })
  }, []);
  console.log(bills);


  const sortedBills = bills.sort((a, b) => new Date(a.date) - new Date(b.date));




  return (
    <Box >
      {sortedBills.filter(bills => bills.status == "Pending").map(group => (
      <CoordBillprop key={group._id} billname= {group.billname} itemname = {group.itemname} amount = {group.amount} proof={group.proof}  status={group.status} id={group._id} date={group.date}/>
    ))
  }
    </Box>
  )
}

export default Pay





















// import React from 'react'
// import ManagerBills from '../components/ManagerBills';
// import { Box,Tabs,Tab,TabList,TabPanels,TabPanel,Button } from '@chakra-ui/react';
// function Pay() {
//   return (
//     <Box>
//       <Box h="630px">
//    <Tabs >
//   <TabList justifyContent={'space-around'}>
//     <Tab w="150px">Pending</Tab>
//     <Tab w="150px">Done</Tab>
//   </TabList>

//   <TabPanels>
//     <TabPanel>
//      <ManagerBills />
//     </TabPanel>
//     <TabPanel>
//     <ManagerBills />
//     </TabPanel>
//     <TabPanel>
//     <ManagerBills />
//     </TabPanel>
//   </TabPanels>
// </Tabs>
//   </Box>
//     </Box>
//   )
// }

// export default Pay
