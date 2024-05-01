import './App.css'
import PrimarySearchAppBar from './Components/Navbar'
import { TextField, Button } from "@mui/material"
import axios from "axios";
function App() {
  async function paymentHandler() {
    const headers = {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MmU0ZTFlZjU5MWYzM2VlNmVkN2MzZSIsIlJvbGUiOiJ1c2VyIiwiZW1haWwiOiJuaWNvQGdtYWlsLmNvbSIsImlhdCI6MTcxNDU2NDc5NiwiZXhwIjoxNzE0NTY4Mzk2fQ.bjOjxOoQy7WkTMGO9gmalBy8pYDmqNi-XeYTq75oLNo",
      "Content-Type": "application/json"
    }
    try {
      let { data } = await axios.post("http://localhost:8000/api/v1/payment/execute", {
        amount: 1000,
        productName: "Tiny"
      }, {
        headers
      })
      var options = {
        "key": "rzp_test_Qvt5A5DM643dTM", // Enter the Key ID generated from the Dashboard
        "amount": data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "TMNT",
        "description": "Test Transaction",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqsycIxliOqYp6agIJZEpuALIgyuxO8oKjiQ&s",
        "order_id": data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "callback_url": "http://localhost:8000/api/v1/payment/verify",
        "redirect": true,
        "handler": function (response) {
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);
          window.location.href = "http://localhost:8000/api/v1/payment/verify"
        },
        "prefill": {
          "name": "Gaurav Kumar",
          "email": "gaurav.kumar@example.com",
          "contact": "9000090000"
        },
        "notes": {
          "address": "Razorpay Corporate Office"
        },
        "theme": {
          "color": "#3399cc"
        }
      };
      var rzp1 = new window.Razorpay(options);
      console.log(data)
      rzp1.open()
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="App">
      <PrimarySearchAppBar />
      <div style={{ margin: "0.25rem 0.5rem", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <h1>Hello world</h1>
        <form>
          <TextField
            style={{ minWidth: "20rem", margin: "5px" }}
            type="text"
            label="UserName"
            variant="outlined"
          />
        </form>
        <Button color="inherit" >Create</Button>
        <Button onClick={paymentHandler}>Make Payment</Button>
      </div>
    </div>
  )
}

export default App
