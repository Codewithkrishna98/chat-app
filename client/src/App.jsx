  import { useEffect, useMemo, useState } from "react";
import  {io} from  "socket.io-client"
  import { Button, Container, Stack, TextField, Typography } from "@mui/material";
  const App = () => {

    const [meassage,setMeassage] = useState("")
    const [room,setRoom] = useState("")
    const [socketId,setSocketId] = useState("")
    const [allmeassage,setAllmeassage] = useState([])
    const [joinRoom,setJoinroom] = useState("")
    const socket = useMemo(()=>io("http://localhost:3000"), []);

    useEffect(()=>{
      socket.on("connect",()=>{
        setSocketId(socket.id)
        console.log("connected", socket.id);
      })
      // socket.on( "welcome" , (msg) =>{
      //   console.log(msg)
      // }
      // )
      socket.on(  "meassage-recieved" , (data)=>{
         console.log(data)
         setAllmeassage((allmeassage)=>[...allmeassage,data])
      })
       return ()=>{
        socket.disconnect();
       }
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ,[])
    
    const handleSubmit =(e)=>{
         e.preventDefault();
           socket.emit("meassage",{meassage,room});
           setMeassage("");
    }

    const handleOnjoin = (e)=>{
       e.preventDefault();
      socket.emit("join-room",joinRoom);
      setJoinroom("")
    }
    return (
      <Container >
        <Typography  >
          Welcome to Socket.io
        </Typography>
        <h3>
          Room: {socketId}
        </h3>
         <form  onSubmit={handleOnjoin}  >

        <TextField  label="join-room" value={joinRoom}  onChange={e=>setJoinroom(e.target.value)}/>

        <Button type="submit">
          Join
          </Button>
         </form>

       <form onSubmit={handleSubmit}>
         <TextField  label="room" value={room}  onChange={e=>setRoom(e.target.value)}
         
         />
         <TextField  label="meassage" value={meassage}  onChange={e=>setMeassage(e.target.value)}/>
         <Button type="submit">
          Send
          </Button>
       </form>
       <Stack>
         { allmeassage.map((msg,i)=>(
          <h5 key={i.id}>
             {msg}
          </h5>
         ))}
       </Stack>
      </Container>
    )
  }
  
  export default App
  