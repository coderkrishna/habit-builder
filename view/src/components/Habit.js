import React, { useContext } from "react";
import { Row, Col } from "reactstrap";
import {useHistory} from "react-router-dom"
// icons
import { FaRegStar, FaStar } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import axios from "axios";
import {toast} from "react-toastify"

function Habit({habit}) {

    const history = useHistory(); 
    const deleteHabit = () => {
          axios.delete("https://habit-builder-api.herokuapp.com/api/v1/deleteContact",)
          .then(
              () => {
                  toast('deleted',{type : "error"});
              }
          )
          .catch((err) => {
              toast(err,{type :"error"});
          })         
    }

    const updateImpHabit = () => {
        
        axios.put("https://habit-builder-api.herokuapp.com/api/v1/updateImpHabit",{isStar : true})
        .then(()=>{
          toast("updated")
        })
        .catch(err=>console.log(err))
      };

    const updateHabit = () => {
       
        axios.put("https://habit-builder-api.herokuapp.com/api/v1/updateHabit",{name : habit.name})
        .then(()=>{
          toast("updated")
        })
        .catch(err=>console.log(err))
    }  

     const viewSingleHabit = () => {
          history.push('/habit-view');
     }

    return (
        <>
        <Row>
          <Col
            md="1"
            className="d-flex justify-content-center align-items-center"
          >
            <div className="icon" onClick={() => updateImpHabit()}>
              {habit.star ? (
                <FaStar className=" text-primary" />
              ) : (
                <FaRegStar className=" text-info" />
              )}
            </div>
          </Col>

          <Col md="8" onClick={() => viewSingleHabit(habit)}>
            <div className="text-primary">{habit.name}</div>
  
            <div className="text-secondary">{habit.timing}</div>
            <div className="text-secondary">
              {habit.frequency}
            </div>
  
          </Col>
          <Col
            md="1"
            className="d-flex justify-content-center align-items-center"
          >
            <MdDelete
              onClick={() => deleteHabit()}
              color="danger"
              className="text-danger icon"
            />
            <MdEdit
              className="icon text-info ml-2"
              onClick={() => updateHabit()}
            />
          </Col>
        </Row>
      </>
    )
}

export default Habit;
