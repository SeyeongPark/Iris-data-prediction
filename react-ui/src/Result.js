import React from 'react';
import './Result.css';
import { Form } from 'react-bootstrap';
import { useLocation } from "react-router-dom";
import { Jumbotron } from 'react-bootstrap';

function Result() {

    let { state } = useLocation();
    const largestNum = Math.max(...state);
    var chanceSpecies;
    if(state[0] === largestNum){
      chanceSpecies = "setosa";
    }
    else if(state[1] === largestNum){
      chanceSpecies = "virginica";
    }
    else if(state[2] === largestNum){
      chanceSpecies = "versicolor";
    }

  return (
    <div> 
         <Jumbotron>
            <h1>Prediction Results</h1>
            <h2> the values for species will be:</h2>

            <Form>
              <Form.Group>
                <Form.Label>setosa :</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  defaultValue={state[0]}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>virginica :</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  defaultValue={state[1]}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>versicolor : </Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  defaultValue={state[2]}
                />
              </Form.Group>

              <h2>Probability, it is a <span class="stress">{chanceSpecies}</span> </h2>
            </Form>

            </Jumbotron>
              
          </div>
  );
}
//
export default Result;
