// import axios from "axios";

// import React, { Component } from 'react';
// import  {getCookies} from "../utils/utils";

// class Service extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       user:""
//     }
//     }

//     componentDidMount() {
//       const user = getCookies("mail");
//       console.log("user--->", user);
//        if(!user) {
//          this.props.history.push("/login")
//         //  this.setState({user})
//        }
//     }


//   render() {
//     return (
//       <div>
//        {this.state.user &&  <p> Service page !!!!!!!!</p>}
//       </div>
//     );
//   }
// }

// export default Service;
import axios from 'axios';
import React, {useEffect, useState} from 'react'
import InputField from '../components/InputField';
import Select from '../components/Select';
import { getCookies } from '../utils/utils';
import '../App.css';

const Service = ({history}) => {

  const [bikeNumber, setBikeNumber] = useState("");
  const [serviceType, setServiceType] = useState("");

   const handleService = (e) => {
     e.preventDefault(); 
     console.log("bikeNumber-->", bikeNumber);
     console.log("serviceTpe---<", serviceType);
     history.push("/dashboard");
     axios.get(`http://localhost:1999/type/${serviceType}?userBike=${bikeNumber}`).then(res=> {
       console.log(res)
     })
   }
  // useEffect(() => {
  //   const user = getCookies("mail");
  //     console.log("user--->", user);
  //     console.log("")
  //      if(!user) {
  //       history.push("/login")
  //      }
  // },[history] );
  return (
    <div id="dropDown">
     <form onSubmit={(e)=> handleService(e)}>
      <InputField  name="Bike Number" value={bikeNumber} onChange={(e)=> e && setBikeNumber(e.target.value)} />  <br/>
      <Select name="Service Type"   options={["oil","water","common"]}   onChange={(e)=> e && setServiceType(e.target.value)} />
      <br/>
      <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default Service;
