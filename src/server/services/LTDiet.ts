import * as http from 'http';
import { Group } from '../models/Group';
import * as tf from '@tensorflow/tfjs';
// import '@tensorflow/tfjs-node-gpu';Kamehameha8

export let startLTDietDaemon = (): void => {

    tensorTest();

    // console.log('LTDiet daemon - STARTED');

    // first run
    // analyzePreferences();

    // register thread for repeated execution
    // setInterval(analyzePreferences, 60000);

};

async function tensorTest() {
    const model = tf.sequential();
    // config for layer
    const config_hidden = {
        inputShape: [4, 4],
        activation: 'relu',
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
        [[1, 1, 1, 2], [2, 2, 2, 4], [3, 3, 3, 5], [7, 7, 7, 8]],
        [[2, 3, 4, 5], [2, 1, 6, 4], [7, 3, 2, 5], [1, 7, 5, 8]],
        [[10, 22, 15, 5], [5, 9, 3, 4], [10, 8, 2, 1], [8, 7, 9, 8]],
        [[2, 10, 6, 8], [1, 5, 7, 2], [8, 4, 3, 9], [2, 4, 3, 7]],
        [[9, 1, 3, 7], [4, 6, 2, 8], [7, 8, 9, 1], [0, 0, 18, 5]],
        [[8, 5, 2, 0], [0, 6, 8, 7], [0, 8, 5, 2], [2, 20, 18, 5]],
        [[2, 0, 8, 7], [3, 2, 1, 0], [9, 2, 4, 2], [3, 5, 1, 0]],
        [[11, 12, 15, 7], [22, 8, 15, 4], [7, 9, 5, 1], [8, 2, 8, 9]],
        [[2, 1, 0, 3], [0, 2, 2, 4], [4, 0, 5, 2], [3, 0, 6, 7]],
        [[1, 3, 2, 0], [2, 1, 3, 1], [1, 4, 2, 5], [7, 3, 2, 4]],
        [[5, 5, 2, 1], [5, 2, 4, 7], [9, 3, 2, 1], [5, 2, 5, 6]],
        [[2, 3, 4, 1], [3, 2, 1, 1], [2, 3, 4, 5], [2, 1, 3, 2]],
        [[2, 2, 3, 1], [2, 3, 4, 2], [2, 2, 2, 2], [3, 3, 3, 3]],
        [[1, 1, 1, 1], [2, 2, 2, 2], [3, 3, 3, 3], [4, 4, 4, 4]],
        [[1, 0, 1, 0], [0, 2, 0, 2], [0, 3, 0, 3], [0, 4, 0, 4]],
        [[1, 2, 1, 2], [2, 2, 2, 2], [2, 3, 2, 3], [2, 4, 2, 4]],
        [[3, 2, 3, 2], [1, 2, 2, 5], [5, 3, 2, 3], [2, 4, 5, 4]],
        [[1, 2, 0, 2], [1, 0, 2, 5], [5, 3, 0, 3], [2, 4, 0, 4]],
        [[6, 2, 6, 2], [1, 6, 2, 5], [7, 3, 0, 3], [2, 4, 7, 4]],
        [[10, 5, 6, 1], [5, 8, 3, 1], [0, 5, 0, 3], [0, 9, 7, 4]],
        [[1, 2, 1, 3], [3, 2, 1, 1], [1, 0, 2, 3], [3, 4, 2, 0]],
        [[5, 2, 1, 3], [3, 2, 6, 1], [1, 4, 2, 3], [0, 4, 2, 0]],
        [[2, 0, 1, 2], [0, 2, 4, 1], [2, 4, 2, 3], [1, 4, 2, 5]],
        [[2, 1, 1, 4], [2, 2, 4, 5], [2, 7, 2, 3], [5, 4, 2, 5]],
        [[2, 3, 2, 4], [1, 2, 4, 7], [2, 0, 2, 0], [2, 4, 2, 0]],
        [[0, 3, 2, 0], [1, 0, 4, 7], [2, 0, 0, 0], [2, 0, 2, 0]],
        [[1, 0, 0, 1], [0, 1, 1, 0], [2, 0, 1, 2], [0, 0, 0, 1]],
        [[0, 1, 1, 0], [1, 0, 0, 1], [0, 1, 2, 2], [1, 0, 0, 0]],
        [[2, 0, 0, 0], [2, 0, 0, 0], [5, 0, 0, 0], [0, 0, 0, 1]],
        [[0, 0, 0, 2], [0, 0, 0, 2], [0, 0, 0, 5], [1, 0, 0, 0]],
        [[0, 2, 0, 0], [0, 2, 0, 0], [0, 5, 0, 0], [0, 1, 0, 0]],
        [[0, 5, 0, 0], [0, 2, 0, 0], [0, 2, 0, 0], [0, 1, 0, 0]],
        [[0, 1, 0, 0], [0, 2, 0, 0], [0, 2, 0, 0], [0, 5, 0, 0]],
        [[0, 1, 0, 0], [0, 5, 0, 0], [0, 2, 0, 0], [0, 2, 0, 0]],
        [[3, 1, 1, 0], [4, 4, 0, 0], [1, 1, 1, 0], [0, 2, 0, 0]],
        [[5, 0, 0, 0], [8, 0, 0, 0], [3, 0, 0, 0], [2, 0, 0, 0]],
        [[0, 5, 0, 0], [0, 8, 0, 0], [0, 3, 0, 0], [0, 2, 0, 0]],
        [[0, 0, 5, 0], [0, 0, 8, 0], [0, 0, 3, 0], [0, 0, 2, 0]],
        [[0, 0, 0, 5], [0, 0, 0, 8], [0, 0, 0, 3], [0, 0, 0, 2]],
        [[1, 1, 1, 2], [1, 1, 1, 5], [1, 1, 1, 0], [1, 1, 0, 0]],
        [[0, 0, 0, 2], [0, 0, 0, 3], [0, 0, 0, 8], [0, 0, 0, 5]]
    ]);

    // Dummy training labels
    const y_train = tf.tensor([
        [[0.08], [0.17], [0.24], [0.50]],
        [[0.21], [0.20], [0.26], [0.32]],
        [[0.41], [0.16], [0.16], [0.25]],
        [[0.32], [0.18], [0.29], [0.19]],
        [[0.22], [0.22], [0.28], [0.26]],
        [[0.15], [0.21], [0.15], [0.46]],
        [[0.34], [0.12], [0.34], [0.18]],
        [[0.31], [0.34], [0.15], [0.18]],
        [[0.15], [0.20], [0.27], [0.39]],
        [[0.15], [0.17], [0.29], [0.39]],
        [[0.20], [0.28], [0.23], [0.28]],
        [[0.26], [0.18], [0.36], [0.21]],
        [[0.21], [0.28], [0.21], [0.31]],
        [[0.10], [0.20], [0.30], [0.40]],
        [[0.10], [0.20], [0.30], [0.40]],
        [[0.17], [0.22], [0.28], [0.33]],
        [[0.21], [0.21], [0.27], [0.31]],
        [[0.15], [0.24], [0.32], [0.29]],
        [[0.27], [0.23], [0.22], [0.28]],
        [[0.33], [0.25], [0.12], [0.30]],
        [[0.24], [0.24], [0.21], [0.31]],
        [[0.28], [0.31], [0.26], [0.15]],
        [[0.14], [0.20], [0.31], [0.34]],
        [[0.16], [0.25], [0.27], [0.31]],
        [[0.30], [0.38], [0.11], [0.22]],
        [[0.22], [0.52], [0.09], [0.17]],
        [[0.20], [0.20], [0.50], [0.10]],
        [[0.20], [0.20], [0.50], [0.10]],
        [[0.20], [0.20], [0.50], [0.10]],
        [[0.20], [0.20], [0.50], [0.10]],
        [[0.20], [0.20], [0.50], [0.10]],
        [[0.50], [0.20], [0.20], [0.10]],
        [[0.10], [0.20], [0.20], [0.50]],
        [[0.10], [0.50], [0.20], [0.20]],
        [[0.28], [0.44], [0.17], [0.11]],
        [[0.28], [0.44], [0.17], [0.11]],
        [[0.28], [0.44], [0.17], [0.11]],
        [[0.28], [0.44], [0.17], [0.11]],
        [[0.28], [0.44], [0.17], [0.11]],
        [[0.28], [0.44], [0.17], [0.11]],
        [[0.11], [0.17], [0.44], [0.28]]
    ]);

    // Dummy testing data
    const x_test = tf.tensor([
        [[1, 0, 0, 1], [0, 1, 1, 0], [2, 0, 1, 2], [0, 0, 0, 1]]
    ]);
    // risultato atteso: 0.20, 0.20, 0.50, 0.10

    const x_test2 = tf.tensor([
        [[1, 2, 0, 1], [0, 1, 1, 1], [0, 0, 1, 0], [4, 0, 0, 1]]
    ]);
    // risultato atteso: 0.31, 0.23, 0.8, 0.38

    const x_test3 = tf.tensor([
        [[1, 0, 0, 0], [3, 1, 1, 0], [2, 2, 1, 2], [0, 0, 2, 1]]
    ]);
    // risultato atteso: 0.6, 0.31, 0.44, 0.18

    await model.fit(x_train, y_train, {
        batchSize: 1,
        epochs: 1000,
        verbose: 0
    });

    console.log('Predizione: ' + model.predict(x_test));
    console.log('Predizione: ' + model.predict(x_test2));
    console.log('Predizione: ' + model.predict(x_test3));

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

