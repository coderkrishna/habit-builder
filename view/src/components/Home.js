import React from 'react'
import { useState,useEffect } from "react"
import "./Home.css"
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Container, ListGroup, ListGroupItem } from "reactstrap"
import Habit from "./Habit"
function Home() {
     
    const [habits,setHabits] = useState([]);

     useEffect(() => {
        axios.get("http://localhost:8080/api/v1/getHabits")
        .then(response => {
              setHabits(response);                        
        })
    },[])

    const AddHabit = () => {
        return <Redirect to = "/habit-form" />
    }

    return (
        <>
        <Container className="mt-4">
      {habits.length === 0 } ? (
        <div className="Center text-large text-primary">
           <div class = "habit-display">
           <AddCircleIcon onClick = {AddHabit} /> 
           <h1>ADD A NEW HABIT!</h1>
           </div> 
        </div>
      ) : (
        <ListGroup>
          {Object.entries(habits).map(([key,value])=>{
            <ListGroupItem key={key}>
               <Habit habit = {value}/>
            </ListGroupItem>
          })}
        </ListGroup>
      )
    </Container>
    <div class = "habit-display">
            <AddCircleIcon onClick = {AddHabit} /> 
            <h1>ADD A NEW HABIT!</h1>
    </div>
    </>
    )
}

export default Home;
