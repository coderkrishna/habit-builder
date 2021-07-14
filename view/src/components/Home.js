import React from 'react'
import { useState,useEffect } from "react"
import "./Home.css"
import AddCircleIcon from '@material-ui/icons/AddCircle';
import axios from "axios";
import { Container, ListGroup, ListGroupItem } from "reactstrap"
import Habit from "./Habit"
import { useHistory } from 'react-router-dom'
function Home() {
     
    const [habits,setHabits] = useState([]);

     useEffect(() => {
        axios.get("https://habit-builder-api.herokuapp.com/api/v1/getHabits")
        .then(response => {
              setHabits([...response]);                        
        })
    },[])
     
    const history = useHistory();

    const AddHabit = () => {
         history.push('/habit-form')
    }

    return (
        <Container className="mt-4">
        <ListGroup>
          {Object.entries(habits).map(([key,value]) => {
            <ListGroupItem key={key}>
               <Habit habit = {value}/>
            </ListGroupItem>
          })}
        </ListGroup>
    <div class = "habit-display">
            <button onClick = {AddHabit}><AddCircleIcon/></button> 
            <h1>ADD A NEW HABIT!</h1>
      </div>
      </Container>
    )
}

export default Home;
