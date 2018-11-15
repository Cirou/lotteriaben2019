import * as http from 'http';
import { Group } from '../models/Group';
import * as tf from '@tensorflow/tfjs';
import { Tensor, Rank } from '@tensorflow/tfjs';
// import '@tensorflow/tfjs-node-gpu';Kamehameha8

export let startLTDietDaemon = (): void => {

    const risto1 = 'mazzat e panell';
    const voti1 = [1, 3, 6, 8];
    const risto2 = 'fann e fliglij bell';
    const voti2 = [0, 3, 2, 1];

    const inputMap: Map<string, Array<Number>> = new Map;
    inputMap.set(risto1, voti1);
    inputMap.set(risto2, voti2);

    tensorMathTest(inputMap);

    // console.log('LTDiet daemon - STARTED');

    // first run
    // analyzePreferences();

    // register thread for repeated execution
    // setInterval(analyzePreferences, 60000);

};

function tensorMathTest(inputMap: Map<string, Array<Number>>): Map<string, number> {

    const votesMap: Map<string, Tensor<Rank>> = new Map;
    const outputMap: Map<string, number> = new Map;

    inputMap.forEach((votes: Number[], restaurantId: string) => {
        let votesSum = 0;
        votes.forEach((vote: number) => { votesSum += vote; });
        votesMap.set(restaurantId, tf.tensor(votesSum).asScalar());
    });

    let totalVotesSum: Tensor<Rank> = tf.tensor(0);
    votesMap.forEach((votesSum: Tensor<Rank>, restaurantId: string) => {
        console.log('Totalsum = ' + totalVotesSum);
        totalVotesSum = totalVotesSum.add(votesSum);
    });

    votesMap.forEach((votesSum: Tensor<Rank>, restaurantId: string) => {
        outputMap.set(restaurantId, quickMath(votesSum, totalVotesSum));
    });

    outputMap.forEach((percentage: number, restaurantId: string) => {
        console.log('Ristorante: "' + restaurantId + '" ha una percentuale di: ' + percentage.valueOf() + '%');
    });
    console.log();

    return outputMap;

}

function quickMath(x: Tensor<Rank>, sum: Tensor<Rank>): number {
    console.log('(' + x.asScalar() + ' * 100)/' + sum.asScalar());
    const perc: Tensor<Rank> = tf.scalar(100);
    const xpercent: Tensor<Rank> = x.mul(perc);
    return xpercent.div(sum).asScalar().dataSync()[0];
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

