import * as http from 'http';
import * as tf from '@tensorflow/tfjs';
import { Tensor, Rank } from '@tensorflow/tfjs';
import '@tensorflow/tfjs-node';

export let startLTDietDaemon = (): void => {

    console.log('LTDiet daemon - STARTED');

    // first run
    analyzePreferences();

    // register thread for repeated execution
    setInterval(analyzePreferences, 60000);

};

async function analyzePreferences() {

    console.log('LTDiet daemon - Analyzing users preferences');

    extractAllGroupsToAnalyze(groups => {

        groups.forEach(group => {


            extractAllGroupsVotationsToAnalyze(group.id, votations => {

                extractAllResturantsToAnalyze(resturants => {

                    console.log('LTDiet daemon - Analyzing group ' + group.id + ' preferences');

                    const inputMap: Map<string, Array<Number>> = new Map;

                    resturants.forEach(resturant => {

                        const arr = Array<number>(13).fill(0);

                        votations.forEach(foodvote => {

                            let found = false;

                            resturant.foods.forEach(cibo => {
                                if (Number(foodvote.food_id) === Number(cibo.id)) {
                                    found = true;
                                }
                            });

                            if (found) {
                                arr[Number(foodvote.food_id)] = Number(foodvote.votations);
                            }

                        });

                        inputMap.set(resturant.nome, arr);

                    });

                    // console.log(inputMap);
                    tensorMath(inputMap);
                });

            });
        });
    });

}

async function tensorMath(inputMap: Map<string, Array<Number>>) {

    const votesMap: Map<string, Tensor<Rank>> = new Map;
    const outputMap: Map<string, number> = new Map;

    inputMap.forEach((votes: Number[], restaurantId: string) => {
        let votesSum = 0;
        votes.forEach((vote: number) => { votesSum += vote; });
        votesMap.set(restaurantId, tf.tensor(votesSum).asScalar());
    });

    let totalVotesSum: Tensor<Rank> = tf.tensor(0);
    votesMap.forEach((votesSum: Tensor<Rank>, restaurantId: string) => {
        // console.log('Totalsum = ' + totalVotesSum);
        totalVotesSum = totalVotesSum.add(votesSum);
    });

    votesMap.forEach((votesSum: Tensor<Rank>, restaurantId: string) => {
        outputMap.set(restaurantId, quickMath(votesSum, totalVotesSum));
    });

    outputMap.forEach((percentage: number, restaurantId: string) => {
        // salva a DB la previsione
        console.log(restaurantId + ' => ' + percentage.valueOf().toFixed(2) + ' %');
    });

}

function quickMath(x: Tensor<Rank>, sum: Tensor<Rank>): number {

    const perc: Tensor<Rank> = tf.scalar(100);
    const xpercent: Tensor<Rank> = x.mul(perc);

    let num = (Math.random() * 2) + 1; // this will get a number between 1 and 2;
    num *= Math.floor(Math.random() * 2) === 1 ? 1 : -1; // this will add minus sign in 50% of cases

    if (sum.asScalar().dataSync()[0] === 0) {
        return 0;
    }

    const result = xpercent.div(sum).asScalar().dataSync()[0];
    return result > 0 ? result + num : result;

}

function extractAllGroupsToAnalyze(callback: Function): any {

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
            callback(JSON.parse(body));
        });

    });
}

function extractAllResturantsToAnalyze(callback: Function): any {

    const options: http.RequestOptions = {
        host: 'localhost',
        port: '4200',
        path: '/locations/'
    };

    http.get(options, function (response) {

        let body = '';

        response.on('data', function (d) {
            body += d;
        });

        response.on('end', function () {
            callback(JSON.parse(body));
        });

    });
}

function extractAllGroupsVotationsToAnalyze(groupId: number, callback: Function): any {

    const options: http.RequestOptions = {
        host: 'localhost',
        port: '4200',
        path: '/groupvotations/' + groupId + '/2018-10-24'
    };

    http.get(options, function (response) {

        let body = '';

        response.on('data', function (d) {
            body += d;
        });

        response.on('end', function () {
            callback(JSON.parse(body));
        });

    });
}


