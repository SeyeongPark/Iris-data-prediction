import React from 'react';
import './Result.css';
import { Form } from 'react-bootstrap';
import { useLocation } from "react-router-dom";
import './Design.css';

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
    <div className="wrapper">
        <div class="jumbotron">
            <h1>Prediction Results</h1>
            <h5> the values for species will be:</h5>
            <Form>
              <Form.Group>
                <label>setosa :</label>
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

              <h4>Probability, it is a <span class="stress">{chanceSpecies}</span> </h4>
            </Form>

            </div>
              
          </div>
  );
}
//
export default Result;
