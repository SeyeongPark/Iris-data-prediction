const tf = require('@tensorflow/tfjs');
    // require('@tensorflow/tfjs-node');
    //load iris training and testing data
    const iris = require('../../iris.json');
    // const irisTesting = require('../../iris-testing.json');
    var lossValue;
    //
exports.trainAndPredict = function (req, res) {
    //
    // convert/setup our data for tensorflow.js
    //
    //tensor of features for training data
    // include only features, not the output
    const trainingData = tf.tensor2d(iris.map(item => [
        item.sepal_length, item.sepal_width, item.petal_length,
        item.petal_width
    ]))
    //console.log(trainingData.dataSync())
    //
    //tensor of output for training data
    //the values for species will be:
    // setosa:       1,0,0
    // virginica:    0,1,0
    // versicolor:   0,0,1
    const outputData = tf.tensor2d(iris.map(item => [
        item.species === "setosa" ? 1 : 0,
        item.species === "virginica" ? 1 : 0,
        item.species === "versicolor" ? 1 : 0
    ]))
    //console.log(outputData.dataSync())
    //


    //   // call value from InputData component
    // const sepalLength = props.location.state?.sepalLength;
    // const sepalWidth = props.location.state?.sepalWidth;
    // const petalLength = props.location.state?.petalLength;
    // const petalWidth = props.location.state?.petalWidth;


    const testData = [
        {
            sepal_length: req.body.sepalLength,
            sepal_width: req.body.sepalWidth,
            petal_length: req.body.petalLength,
            petal_width: req.body.petalWidth
        }
    ]
    // need to modify -> input parameter
    //tensor of features for testing data
    const testingData = tf.tensor2d(testData.map(item =>[
        item.sepal_length, item.sepal_width,
        item.petal_length, item.petal_width,
    ])
        // [5.7,3.9,1.7,0.4], [1,4]
        // [5.9,3,5.1,1.8], [1,4]
        // [5.7,2.9,4.2,1.3], [1,4]
        // [{sepalLength}, {sepalWidth}, {petalLength}, {petalWidth}], [1,4]
        )

    //console.log(testingData.dataSync())    
    //
    // build neural network using a sequential model
    const model = tf.sequential()
    //add the first layer
    model.add(tf.layers.dense({
        inputShape: [4], // four input neurons
        activation: "sigmoid",
        units: 5, //dimension of output space (first hidden layer)
    }))
    //add the hidden layer
    model.add(tf.layers.dense({
        inputShape: [5], //dimension of hidden layer
        activation: "sigmoid",
        units: 3, //dimension of final output (setosa, virginica, versicolor)
    }))
    //add output layer
    model.add(tf.layers.dense({
        activation: "sigmoid",
        units: 3, //dimension of final output (setosa, virginica, versicolor)
    }))
    //compile the model with an MSE loss function and Adam algorithm
    model.compile({
        loss: "meanSquaredError",
        optimizer: tf.train.adam(.06), // need to modify --> input param
    })
    console.log(model.summary())
    //
    //Train the model and predict the results for testing data
    //
    // train/fit the model for the fixed number of epochs
    // async function run() {
        const startTime = Date.now()
        //train the model
        model.fit(trainingData, outputData,         
            {
                epochs: 10,  // the number need to modify --> input param
                callbacks: { //list of callbacks to be called during training
                    onEpochEnd: async (epoch, log) => {
                        lossValue = log.loss;
                        console.log(`Epoch ${epoch}: lossValue = ${log.loss}`);
                        elapsedTime = Date.now() - startTime;
                        console.log('elapsed time: ' + elapsedTime)
                    }
                }
            }
            
        ).then(()=>{
            const results = model.predict(testingData);

            results.array().then(array => {
            var resultForData = array[0];
            var dataToSent = {row: resultForData}
            // res.status(200).send({dataToSent});
            res.status(200)
            .send(dataToSent)
            .end();
            console.log('send data')
        })
        });
            
        // const results = model.predict(testingData);
        // console.log('prediction results: ', results.dataSync())
        // results.print()
        
        // get the values from the tf.Tensor
        //var tensorData = results.dataSync();
        // results.array().then(array => {
        //     var resultForData = array[0];

        //     var dataToSent = {row: resultForData}
        //     // res.status(200).send({dataToSent});
        //     res.status(200)
        //     .send({resultForData: resultForData, testStatus: true})
        //     .end();
        // })
        // //

    // } //end of run function
    // run()

};
