import * as http from 'http';
import { Group } from '../models/Group';
import * as tf from '@tensorflow/tfjs';

export let startLTDietDaemon = (): void => {

    tensorTest();

    console.log('LTDiet daemon - STARTED');

    // first run
    analyzePreferences();

    // register thread for repeated execution
    setInterval(analyzePreferences, 60000);

};

async function tensorTest() {
    const model = tf.sequential();
    // config for layer
    const config_hidden = {
        inputShape: [4],
        activation: 'sigmoid',
        units: 4
    };
    const config_output = {
        units: 1,
        activation: 'sigmoid'
    };
    // defining the hidden and output layer
    const hidden = tf.layers.dense(config_hidden);
    const output = tf.layers.dense(config_output);
    // adding layers to model
    model.add(hidden);
    model.add(output);
    // define an optimizer
    const optimize = tf.train.sgd(0.1);
    // config for model
    const config = {
        optimizer: optimize,
        loss: 'meanSquaredError'
    };
    // compiling the model
    model.compile(config);

    console.log('Model Successfully Compiled');
    console.log('input size: ' + JSON.stringify(model.inputs[0].shape));
    console.log('output size: ' + JSON.stringify(model.outputs[0].shape));


    // Dummy training data
    const x_train = tf.tensor([
        [1, 1, 1, 1], [2, 2, 2, 2], [5, 4, 3, 9], [8, 3, 9, 1],
        [1, 2, 1, 3], [3, 2, 2, 1], [2, 1, 3, 5], [6, 8, 5, 3],
        [3, 4, 1, 2], [2, 1, 1, 4], [3, 4, 5, 6], [7, 2, 3, 1],
        [1, 2, 3, 4], [5, 6, 7, 8], [2, 2, 1, 1], [2, 3, 4, 5],
        [3, 4, 2, 1], [1, 3, 4, 2], [2, 4, 3, 1], [1, 2, 3, 4],
        [2, 3, 4, 5], [22, 1, 3, 5], [12, 8, 8, 7], [5, 4, 3, 2],
        [8, 9, 12, 15], [3, 1, 2, 1], [22, 10, 15, 17], [6, 7, 8, 9],
        [8, 9, 12, 15], [3, 4, 2, 2], [22, 10, 15, 17], [6, 7, 8, 9],
        [8, 9, 12, 15], [3, 4, 2, 2], [22, 10, 15, 17], [6, 1, 8, 2],
        [1, 4, 3, 2], [3, 4, 2, 2], [22, 10, 15, 17], [6, 1, 8, 2],
        [2, 3, 3, 2], [3, 2, 2, 3], [3, 2, 3, 2], [2, 3, 2, 3],
        [20, 23, 50, 10], [12, 56, 20, 33], [40, 41, 42, 43], [51, 52, 53, 54],
        [4, 4, 4, 4], [2, 2, 2, 2], [1, 1, 1, 1], [8, 8, 8, 8],
        [11, 12, 13, 14], [14, 13, 12, 11], [11, 14, 13, 12], [12, 11, 13, 14],
        [3, 2, 4, 5], [3, 3, 7, 5], [3, 2, 5, 6], [2, 4, 6, 1]
    ]);

    // Dummy training labels
    const y_train = tf.tensor([
        [0.074074074], [0.148148148], [0.388888889], [0.388888889],
        [0.145833333], [0.166666667], [0.229166667], [0.458333333],
        [0.204081633], [0.163265306], [0.367346939], [0.265306122],
        [0.178571429], [0.464285714], [0.107142857], [0.25],
        [0.25], [0.25], [0.25], [0.25],
        [0.14893617], [0.329787234], [0.372340426], [0.14893617],
        [0.303448276], [0.048275862], [0.44137931], [0.206896552],
        [0.295302013], [0.073825503], [0.429530201], [0.201342282],
        [0.323529412], [0.080882353], [0.470588235], [0.125],
        [0.098039216], [0.107843137], [0.62745098], [0.166666667],
        [0.25], [0.25], [0.25], [0.25],
        [0.171666667], [0.201666667], [0.276666667], [0.35],
        [0.266666667], [0.133333333], [0.066666667], [0.533333333],
        [0.25], [0.25], [0.25], [0.25],
        [0.229508197], [0.295081967], [0.262295082], [0.213114754]
    ]);

    // Dummy testing data
    const x_test = tf.tensor([
        [1, 0, 0, 1], [0, 1, 1, 0], [2, 0, 1, 2], [0, 0, 0, 1]
    ]);




    await model.fit(x_train, y_train, {
        batchSize: 1,
        epochs: 20000
    });


    console.log('Predizione: ' + model.predict(x_test));
}

async function analyzePreferences() {

    console.log('LTDiet daemon - Analyzing users preferences');

    extractAllGroupsToAnalyze().forEach(element => {
        console.log(element);
    });


}

function extractAllGroupsToAnalyze(): Group[] {

    const options: http.RequestOptions = {
        host: 'localhost',
        port: '4200',
        path: '/groups/'
    };

    http.get(options, function (response) {
        let body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            return JSON.parse(body);
        });
    });

    return new Array;
}

