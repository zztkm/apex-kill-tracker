function getStats(platform: string, user: string, apiToken: string): GoogleAppsScript.URL_Fetch.HTTPResponse {
    const url = `https://public-api.tracker.gg/v2/apex/standard/profile/${platform}/${user}`;
    const headers = {
        'TRN-Api-Key': apiToken
    };
    const params: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
        method: 'get',
        headers: headers
    };

    const res = UrlFetchApp.fetch(url, params);
    return res;
}

function checkHttpStatus(res: GoogleAppsScript.URL_Fetch.HTTPResponse): boolean {
    const code = res.getResponseCode();
    if (code === 200) {
        return true
    } else {
        return false
    }
}

function getLegendData(resBody: any, legend: string): any {
    let legendStats
    for (const segment of resBody.data.segments) {
        if (segment.metadata.name === legend) {
            legendStats = segment.stats;
        }
    }
    return legendStats
}

function postPixela(graphId: string, apiToken: string, kills: string) {
    const url = `https://pixe.la/v1/users/zztkm/graphs/${graphId}`
    const headers = {
        'X-USER-TOKEN': apiToken
    };
    const date = new Date();
    const formatDate = Utilities.formatDate(date, 'Asia/Tokyo', 'yyyyMMdd')
    const data = {
        "date": formatDate,
        "quantity": kills
    }
    const params: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
        method: 'post',
        contentType: 'application/json',
        headers: headers,
        payload: JSON.stringify(data)
    };

    const res = UrlFetchApp.fetch(url, params);
    return res
}

function main() {
    const platform = 'origin';
    const user = '999tkm';
    const TrnApiToken = PropertiesService.getScriptProperties().getProperty('TRN_API_TOKEN');
    const legend = PropertiesService.getScriptProperties().getProperty('LEGEND');
    const graphId = PropertiesService.getScriptProperties().getProperty('GRAPH_ID');
    const pixelaUserToken = PropertiesService.getScriptProperties().getProperty('PIXELA_USER_TOKEN');

    const response = getStats(platform, user, TrnApiToken);
    const resBody = JSON.parse(response.getContentText());

    if (checkHttpStatus(response)) {
        const octaneStats = getLegendData(resBody, legend);
        const octaneKills: string = String(octaneStats.kills.value)
        const pixelaRes = postPixela(graphId, pixelaUserToken, octaneKills)
        Logger.log(octaneStats);
        Logger.log(pixelaRes)
    } else {
        Logger.log(response.getContentText());
    }
}