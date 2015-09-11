
var datasrc = dataRepoAbcAdloader;
//var datasrcAll = dataReposAll;
var datasrcAll = dataReposSome;

// Sort datasource array by date
// ------------------------------------------------------------
datasrc.sort(function(a, b) {
    return a.author_date_unix_timestamp - b.author_date_unix_timestamp;
});
//console.log(datasrc);

datasrcAll.sort(function(a, b) {
    return a.author_date_unix_timestamp - b.author_date_unix_timestamp;
});
//console.log(datasrcAll);

// Round up the date so that we can sort commits from different repost by date
// ------------------------------------------------------------
var roundDate = function(timeStamp) {
    var d = new Date(timeStamp);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0)
};

// Create object array based on key and its value
// ------------------------------------------------------------
var groupByKeyAndValue = function(data, key, val) {
    var arr = [];
    for (var i in data) {
        if (data[i][key] == val) {
            arr.push(data[i]);
        }
    }
    return arr;
};
var weekMondayAll = groupByKeyAndValue(datasrcAll, 'date_day_week', 'Mon');
//console.log(weekMondayAll);

// Create array based on key value
// ------------------------------------------------------------
var arrayByKey = function(data, key) {
    var arr = [];
    for (var i in data) {
        if (data[i][key] === undefined) {
            data[i][key] = '0';
        }
        arr.push(data[i][key]);
    }
    return arr;
};
var datasrcArrayCommitNr = arrayByKey(datasrc, 'commit_nr');
//console.log(datasrcArrayCommitNr);
var datasrcArrayCommitNrAll = arrayByKey(datasrcAll, 'commit_nr');
//console.log(datasrcArrayCommitNrAll);
var datasrcArrayImpact = arrayByKey(datasrc, 'impact');
//console.log(datasrcArrayImpact);
var datasrcArrayImpactAll = arrayByKey(datasrcAll, 'impact');
//console.log(datasrcArrayImpactAll);
var datasrcArrayTimestamp = arrayByKey(datasrc, 'author_date_unix_timestamp');
//console.log(datasrcArrayTimestamp);
var datasrcArrayTimestampAll = arrayByKey(datasrcAll, 'author_date_unix_timestamp');
//console.log(datasrcArrayTimestampAll);

// Create array based on key value, sorted
// ------------------------------------------------------------
var arrayByKeySorted = function(data, key) {
    var arr = [];
    for (var i in data) {
        arr.push(data[i][key]);
    }
    arr.sort(function(a, b) {
        return a - b;
    });
    return arr;
};
var datasrcArrayByKeySorted = arrayByKeySorted(datasrc, 'author_date_unix_timestamp');
//console.log(datasrcArrayByKeySorted);
var datasrcArrayByKeySortedAll = arrayByKeySorted(datasrcAll, 'author_date_unix_timestamp');
//console.log(datasrcArrayByKeySortedAll);

// Create array based on key values added to themselves
// ------------------------------------------------------------
var totalSum = function(data) {
    var sum = 0;
    for (var i = 0; i < data.length; i++) {
        sum += parseInt(data[i]);
      //console.log(sum);
    }
    return sum;
};
var datasrcImpactTotal = totalSum(datasrcArrayImpact);
//console.log(datasrcImpactTotal);
var datasrcImpactTotalAll = totalSum(datasrcArrayImpactAll);
//console.log(datasrcImpactTotalAll);

// Create array based on key values added to themselves
// ------------------------------------------------------------
var sumArray = function(data) {
    var sum = 0;
    var arr = [];
    for (var i in data) {
        sum += parseInt(data[i]);
        arr.push(sum);
      //console.log(sum);
    }
    return arr;
};
var datasrcArrayImpactSum = sumArray(datasrcArrayImpact);
//console.log(datasrcArrayImpactSum);
var datasrcArrayImpactSumAll = sumArray(datasrcArrayImpactAll);
//console.log(datasrcArrayImpactSumAll);

// Create object array based on key
// ------------------------------------------------------------
var groupByAuto = function(data, key) {
    var groups = {};
    for (var i in data) {
        if (!groups.hasOwnProperty(data[i][key])) {
            groups[data[i][key]] = [];
        }
        groups[data[i][key]].push(data[i]);
    }
    return groups;
};
var objDateDayWeek = groupByAuto(datasrc, 'date_day_week');
//console.log(objDateDayWeek);
var objDateDayWeekAll = groupByAuto(datasrcAll, 'date_day_week');
//console.log(objDateDayWeekAll);
var objRepositoryAll = groupByAuto(datasrcAll, 'repository');
//console.log(objRepositoryAll);

// Create array based on key value
// ------------------------------------------------------------
var arrayAllRepos = function(data) {
    var arr = [];
    for (var i in data) {
        arr.push(data[i]);
    }
    return arr;
};
var arrayAllReposLength = function(data) {
    var arr = [];
    for (var i in data) {
        arr.push(data[i].length);
    }
    return arr;
};
var arrayAllReposVar = arrayAllRepos(Object.keys(objRepositoryAll));
//console.log(arrayAllReposVar);
var arrayAllReposValueArrayLength = arrayAllReposLength(Object.keys(objRepositoryAll));
//console.log(arrayAllReposValueArrayLength);

console.log(datasrcArrayImpactAll);

new Chartist.Line('.ct-chart-impact', {
    labels: datasrcArrayCommitNr,
    series: [
      datasrcArrayImpact
    ]
}, {
    height: '400px',
    high: 3000,
    low: -10000,
    showArea: true,
    showLine: true,
    showPoint: false,
    fullWidth: true,
    axisX: {
        showLabel: false,
        showGrid: false
    }
});

new Chartist.Line('.ct-chart-impact-cumulative', {
    labels: datasrcArrayCommitNr,
    series: [
      datasrcArrayImpactSum
    ]
}, {
    height: '400px',
    high: 18000,
    showArea: true,
    showLine: true,
    showPoint: false,
    fullWidth: true,
    axisX: {
        showLabel: false,
        showGrid: false
    }
});

new Chartist.Line('.ct-chart-impact-all', {
    labels: datasrcArrayCommitNrAll,
    series: [
      datasrcArrayImpactAll
    ]
}, {
    height: '300px',
    high: 30000,
    low: -30000,
    showArea: true,
    showLine: true,
    showPoint: false,
    fullWidth: true,
    axisX: {
        showLabel: false,
        showGrid: false
    }
});

new Chartist.Line('.ct-chart-impact-cumulative-all', {
    labels: datasrcArrayCommitNrAll,
    series: [
      datasrcArrayImpactSumAll
    ]
}, {
    height: '300px',
    high: 1400000, // 3700000 with all repos
    showArea: true,
    showLine: true,
    showPoint: false,
    fullWidth: true,
    axisX: {
        showLabel: false,
        showGrid: false
    }
});

new Chartist.Pie('.ct-chart-all-repos-commits-compare', {
  labels: arrayAllReposVar,
  series: arrayAllReposValueArrayLength
}, {
  donut: true,
  donutWidth: 140,
  width: 800,
  height: 600,
  chartPadding: 10,
  labelOffset: 5,
  labelDirection: 'explode',
  showLabel: true
});
