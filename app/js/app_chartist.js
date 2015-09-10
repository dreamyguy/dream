$.ajax({
    type: 'GET',
    url: 'src/json/gitlog.json',
    dataType: 'json',
    success: function(obj) {
        var datasrc = obj.commits;

        // Create object array based on key and its value
        // ------------------------------------------------------------
        var groupBy = function(data, key, val) {
            var arr = [];
            for (var i in data) {
                if (data[i][key] == val) {
                    arr.push(data[i]);
                }
            }
            return arr;
        };
        var week_monday = groupBy(datasrc, 'date_day_week', 'Mon');
      //console.log(week_monday);

        // Create object array sorted by date
        // ------------------------------------------------------------
        var groupByDate = function(data, dateField) {
            var arr = [];
            for (var i in data) {
                arr.sort(function(a, b) {
                    return new Date(b.dateField) - new Date(a.dateField);
                }).push(data[i]);
            }
            return arr;
        };
        var datasrcSortedByDate = groupByDate(datasrc, 'author_date_unix_timestamp');
      //console.log(datasrcSortedByDate);

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
        var datasrcArrayImpact = arrayByKey(datasrc, 'impact');
      //console.log(datasrcArrayImpact);

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
        var objRepository = groupByAuto(datasrc, 'repository');
      //console.log(objRepository);

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

    }
});