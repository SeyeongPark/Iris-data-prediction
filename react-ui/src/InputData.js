import React, { useState }  from 'react';
import axios from 'axios';
import './bootstrap.min.css';
import { Form } from 'react-bootstrap';
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from 'react-router-dom';
import './Design.css';

export default function InputData(){

    const [testSet, setTestSet] = useState({
        sepalLength: '',
        sepalWidth: '',
        petalLength: '',
        petalWidth: '',
        epochs: 100});

    const [showLoading, setShowLoading] = useState(false);    
    const apiUrl = "http://localhost:3000/test";
    const navigate = useNavigate();
    const SaveData = async () => {
        setShowLoading(true);
        const data = {
            sepalLength: parseFloat(testSet.sepalLength),
            sepalWidth: parseFloat(testSet.sepalWidth),
            petalLength: parseFloat(testSet.petalLength),
            petalWidth: parseFloat(testSet.petalWidth),
            epochs: parseInt(testSet.epochs),
        };
        if(testSet.sepalLength > 0 && testSet.sepalWidth > 0 && testSet.petalLength > 0 && testSet.petalWidth > 0){
          if(testSet.epochs < 1){
            window.alert('Epochs should be more than 1');
            setShowLoading(false);
          }
          else{
            const resultTest = await axios.post(apiUrl, data);
            axios.post(apiUrl, data)
                .then(() => {
                    setShowLoading(false);
                }).catch(() => setShowLoading(false));
    
                if(resultTest !== undefined){
                    navigate('/result', { state: resultTest.data.resultForData });
                }
                else{
                    window.alert('The result is undefined. Please check inputs')
                }
          }
        }
        else{
          window.alert('Please check input value is valid');
          setShowLoading(false);
        }

        
    };

    const onChange = (e) => {
        e.persist();
        setTestSet({...testSet, [e.target.name]: e.target.value});
    }
      
    return (
      <div className="wrapper">
        {showLoading === true ?

          showLoading && 
          <h1>Testing.. <br/><br/>
          <Spinner animation="border" role="status">
              <span className="sr-only"></span>
          </Spinner> 
          </h1>
        :
        <div class="jumbotron">
          <Form>
            <Form.Group>
              <Form.Label> Length of sepal</Form.Label>
              <Form.Control name="sepalLength" id="sepalLength" 
            value={testSet.studentNum} onChange = {onChange} required/>
            </Form.Group>
            <Form.Group>
              <Form.Label> Width of pepal</Form.Label>
              <Form.Control name="sepalWidth" id="sepalWidth" 
               value={testSet.sepalWidth} onChange = {onChange} required/>
            </Form.Group>
            <Form.Group>
              <Form.Label> Length of petal</Form.Label>
              <Form.Control  name="petalLength" id="petalLength" 
              value={testSet.petalLength} onChange = {onChange} required/>
            </Form.Group>
            <Form.Group>
              <Form.Label> Width of petal</Form.Label>
              <Form.Control  name="petalWidth" id="petalWidth" value={testSet.petalWidth} onChange = {onChange} required/>
            </Form.Group>
            <Form.Group>
              <Form.Label> Epochs </Form.Label>
              <Form.Control name="epochs" id="epochs" placeholder='recommend more than 100' value={testSet.epochs} min="1" onChange = {onChange} required/>
            </Form.Group>

            <button className="styled-sm" onClick={SaveData} variant="primary" type="submit">
                Test
            </button>
            </Form>
        </div>
        }
        </div>
      );
    }
    