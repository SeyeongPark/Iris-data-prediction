import React, { useState }  from 'react';
import axios from 'axios';
import './bootstrap.min.css';
import { Form } from 'react-bootstrap';
import { Jumbotron, Button } from 'react-bootstrap';
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from 'react-router-dom';



export default function InputData(){

    const [testSet, setTestSet] = useState({
        sepalLength: '',
        sepalWidth: '',
        petalLength: '',
        petalWidth: '',
        epochs: 100});

    const [showLoading, setShowLoading] = useState(false);

    const [resultTest, setResultTest] = useState();
    
    const apiUrl = "http://localhost:3000/test";
    const navigate = useNavigate();
    const SaveData = async (e) => {
        setShowLoading(true);
        e.preventDefault();
        const data = {
            sepalLength: parseFloat(testSet.sepalLength),
            sepalWidth: parseFloat(testSet.sepalWidth),
            petalLength: parseFloat(testSet.petalLength),
            petalWidth: parseFloat(testSet.petalWidth),
            epochs: parseInt(testSet.epochs),
        };

        if(testSet.epochs < 1){
          window.alert('Epoches should be more than 1');
          setShowLoading(false);
        }
        else{
          const resultTest = await axios.post(apiUrl, data);
          axios.post(apiUrl, data)
              .then((res) => {
                  setShowLoading(false);
                  setResultTest(res.data.resultForData);
              }).catch((err) => setShowLoading(false));
  
              if(resultTest !== undefined){
                  navigate('/result', { state: resultTest.data.resultForData });
              }
              else{
                  window.alert('The result is undefined. Please check inputs')
              }
        }
        
    };

    const onChange = (e) => {
        e.persist();
        setTestSet({...testSet, [e.target.name]: e.target.value});
    }
      
    return (
        <div>
        {showLoading === true ?
          showLoading && 
          <Spinner animation="border" role="status">
              <span className="sr-only"></span>
            </Spinner> 
        
        :

        <Jumbotron>
          <Form>
            <Form.Group>
              <Form.Label> sepalLength</Form.Label>
              <Form.Control name="sepalLength" id="sepalLength" 
            value={testSet.studentNum} onChange = {onChange} required/>
            </Form.Group>
            <Form.Group>
              <Form.Label> sepalWidth</Form.Label>
              <Form.Control name="sepalWidth" id="sepalWidth" 
               value={testSet.sepalWidth} onChange = {onChange} required/>
            </Form.Group>
            <Form.Group>
              <Form.Label> petalLength</Form.Label>
              <Form.Control  name="petalLength" id="petalLength" 
              value={testSet.petalLength} onChange = {onChange} required/>
            </Form.Group>
            <Form.Group>
              <Form.Label> petalWidth</Form.Label>
              <Form.Control  name="petalWidth" id="petalWidth" value={testSet.petalWidth} onChange = {onChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label> Epochs</Form.Label>
              <Form.Control name="epochs" id="epochs" value={testSet.epochs} min="1" onChange = {onChange} />
            </Form.Group>

            <Button onClick={SaveData} variant="primary" type="submit">
                Save
            </Button>
            </Form>
        </Jumbotron>
        }




        </div>
      );
    }
    