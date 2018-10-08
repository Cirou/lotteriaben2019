import * as http from 'http';
import { Group } from '../models/Group';

export let startLTDietDaemon = (): void => {

    console.log('LTDiet daemon - STARTED');

    // first run
    analyzePreferences();

    // register thread for repeated execution
    setInterval(analyzePreferences, 60000);

};

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

