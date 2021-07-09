import React, { useState, useContext, useEffect } from "react";

import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
  CustomInput
} from "reactstrap";


import axios from "axios"

// context stuffs
import { HabitContext } from "../context/Context";
import { HABIT_TO_UPDATE } from "../context/action.types";

import { useHistory } from "react-router-dom";

import { toast } from "react-toastify";

const AddHabit = () => {
  // destructuring state and dispatch from context state
  const { state, dispatch } = useContext(HabitContext);

  const { habitToUpdate, habitToUpdateKey } = state;

  // history hooks from react router dom to send to different page
  const history = useHistory();

  // simple state of all component
  const [habitName, setHabitName] = useState("");
  const [time, setTime] = useState("");
  const [frequency, setFrequency] = useState("");
  const [star, setStar] = useState(false);
  const [isUpdate , setIsUpdate] = useState(false);
  // when their is the habit to update in the Context state
  // then setting state with the value of the habit
  // will changes only when the habit to update changes
  useEffect(() => {
    if (habitToUpdate) {
      setHabitName(habitToUpdate.name);
      setTime(habitToUpdate.time);
      setFrequency(habitToUpdate.frequency);
      setStar(habitToUpdate.star);

      // also setting is update to true to make the update action instead the addHabit action
      setIsUpdate(true);
    }
  }, [habitToUpdate]);

  
  // setting Habit to firebase DB
  const addHabit = async () => {
    try {
      await axios.post("http://localhost:8080/api/v1/addHabit",{ name : habitName,time : time , frequency : frequency})
    } catch (error) {
       toast(error)
    }

  };

  // to handle update the Habit when there is Habit in state and the user had came from clicking the Habit update icon
  const updateHabit = async () => {
    //TODO: update Habit method
    try {
        await axios.put("http://localhost:8080/api/v1/updateHabit")
        .then(() => {
            toast("succesfully updated")
        })      
    } catch (error) {
      toast(error)
    }
  };

  // firing when the user click on submit button or the form has been submitted
  const handleSubmit = e => {
    e.preventDefault();
    
     isUpdate ?  updateHabit() : addHabit()

     toast("success",{type:"success"})
    // isUpdate wll be true when the user came to update the Habit
    // when their is Habit then updating and when no Habit to update then adding Habit
    //TODO: set isUpdate value

    // to handle the bug when the user visit again to add Habit directly by visiting the link
    dispatch({
      type: HABIT_TO_UPDATE,
      payload: null,
      key: null
    });

    // after adding/updating Habit then sending to the Habits
    // TODO :- also sending when their is any errors
    history.push("/home");
  };

  // return the spinner when the image has been added in the storage
  // showing the update / add Habit based on the  state
  return (
    <Container fluid className="mt-5">
      <Row>
        <Col md="6" className="offset-md-3 p-2">
          <Form onSubmit={handleSubmit}>
            <div className="text-center">
            </div>
            <FormGroup>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                value={habitName}
                onChange={e => setHabitName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
            <Label for="exampleTime">Time</Label>
          <Input
          type="time"
          name="time"
          id="exampleTime"
          placeholder="time placeholder"
          />
         </FormGroup>
         <FormGroup>
         <Label for="exampleCustomSelect">Select Frequency</Label>
         <CustomInput type="select" id="exampleCustomSelect" name="customSelect">
           <option value = "1">7 days</option>
           <option value = "2">21 days</option>
         </CustomInput>
       </FormGroup> 
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  onChange={() => {
                    setStar(!star);
                  }}
                  checked={star}
                />{" "}
                <span className="text-right">Mark as Star</span>
              </Label>
            </FormGroup>
            <Button
              type="submit"
              color="primary"
              block
              className="text-uppercase"
            >
              {isUpdate ? "Update Habit" : "Add Habit"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddHabit;