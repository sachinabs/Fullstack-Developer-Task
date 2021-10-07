import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { getCookies } from '../utils/utils';

const Dashboard = ({history}) => {

    const [serviceHistories, setServiceHistory] = useState([]);
    const user = getCookies("mail");
    const isAdmin = getCookies("isAdmin");
    
    
    useEffect(() => {
        
        if(isAdmin) {
            axios.get(`http://localhost:1999/allBookingStatus`).then(res=> {
                console.log("res---->", res);
                setServiceHistory(res.data);
            }) 
        } else {
            axios.get(`http://localhost:1999/userHistory?userEmail=${user}`).then(res=> {
           console.log("res---->", res);
           setServiceHistory(res.data);
       })

        }
       
    }, [history])

    // const serviceHistories = [{bikeNumber: "TN 72 AC 1234", serviceType:"water", status:"on service"}, {bikeNumber: "TN 72 AC 1234", serviceType:"water", status:"on service"}, {bikeNumber: "TN 72 AB 1234", serviceType:"oil", status:"on service"}]

    const handleNewService = () => {
         history.push("/service")
    }

    const handleStatus = (bikeNumber) => {
        axios.get(`http://localhost:1999/outForDelivery?userBike=${bikeNumber}`).then(res=> {

        });
    }
    return (
        <div>
            dashboard
            <input type="submit" value="New Service" onClick={()=> handleNewService()} />

            <table>
                <thead>
                    <tr><th>Bike Number</th><th>Service Type</th><th>Status</th></tr>
                </thead>
                <tbody>
                    {
                     serviceHistories && serviceHistories.map(serviceHistory=>
                     <tr><td>{serviceHistory.BikeNumber}</td><td>{serviceHistory.Service}</td>{!isAdmin ? <td>{serviceHistory.Status}</td> :  <td>{serviceHistory.Status === 0 ? <input type="button" value="Mark for Delivery" onClick={()=> handleStatus(serviceHistory.BikeNumber)}/>: serviceHistory.Status }</td>  }</tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Dashboard
