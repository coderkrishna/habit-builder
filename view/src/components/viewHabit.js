import React, { useContext } from "react";

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";
import FavoriteIcon from '@material-ui/icons/Favorite';
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';
import { HabitContext } from "../context/Context";

const ViewHabit = () => {
  const { state } = useContext(HabitContext);
  // destructuring contact from the state
  // and rendering it in state

  const { habit } = state;
  // importing the array of habits
  return (
    <Container>
      <Row className="mt-5 mb-5">

        <Col md="5" className="offset-md-3">
          <Card className="pt-3 pb-5">
            <CardBody className="text-center ">
              <CardTitle className="text-primary mt-3">
                <FavoriteIcon />
                <h1>{habit?.name}</h1>
              </CardTitle>
              <CardSubtitle>
                 <span><AccessAlarmsIcon/>
                 <h2>{habit?.time}</h2>
                 </span>
              </CardSubtitle>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewHabit;
