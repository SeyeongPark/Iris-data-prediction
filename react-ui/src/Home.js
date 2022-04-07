import React from 'react';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home()
{
    return (
        <div class="jumbotron jumbotron-fluid">
            <div class="container">
                <h1 class="display-4">COMP308 - Assignment 4</h1>
                <h3> Seyeong Park (301088175)</h3>
                <br/>

                <form action="/test">
         <button className="favorite styled">Go to Test</button>
             </form>

                <p class="lead">
                This application will load the data from json files, convert the data into tensor format for TensorFlow.js, build the three-layer neural network using a sequential model, train the model, and predict the new entries using testing data.
                In this program, it will allow the user to enter new data to be tested (sepal length, sepal width, petal length, petal width), the number of epochs and learning rate in a React component, and display the prediction results in another React component.
                </p>
                <p class="lead">
                This application is written an Express app that builds and tests a three-layer neural network based on iris data, and it is written a React UI to display the results. The shape of the network is given below:
                </p>
                <br/>
                <img alt="shapeOfNetwork" src="../shapeOfNetwork.png" />
               
            </div>
            </div>
    );
}

