'use strict';


$(function () {
    google.charts.load('current', {'packages':['table']});
    
    function getQueryParam(param) {
        location.search.substr(1)
            .split("&")
            .some(function(item) { // returns first occurence and stops
                return item.split("=")[0] == param && (param = item.split("=")[1])
            })
        return param
    }
    
    function drawTable(jsonData) {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Nome');
        data.addColumn('string', 'Telefono');
        data.addColumn('date', 'Data');
        data.addColumn('string', 'ID/CRO bonifico');
        data.addColumn('string', 'Versamento');
        data.addColumn('string', 'Messaggio');
        console.log(jsonData);
        for (var i = 0; i < jsonData.length; i++) {
            //Row: 'id'=>$id,'name'=>$name,'email'=>$email,'phone'=>$phone,'cro'=>$cro,'money'=>$money,'msg'=>$msg,'ts'=>$time
			var row = jsonData[i];
			var splittedDate = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/.exec(row.ts)
            var date = new Date(splittedDate[1], splittedDate[2]-1, splittedDate[3], splittedDate[4], splittedDate[5], splittedDate[6]);
            try {
				data.addRow([
					{v: row.name, f: '<a href="mailto:' + row.email + '">' + row.name + '</a>'},
					row.phone,
					{v: date, f: date.toLocaleString()},
                    row.cro,
                    row.money,
                    row.msg
				]);
			} catch (e) {
				alert('Error with file "' + row.name + '" : ' + e);
			}
		}

        var table = new google.visualization.Table(document.getElementById('table_div'));

        table.draw(data, {showRowNumber: true, width: '100%', height: '100%', allowHtml: true});
    }
    
    function load() {
        $.ajax('/messaggi.php', {
            method: 'POST',
            data: {pwd: getQueryParam('pwd')}
        })
        .done(function(data) {
            drawTable(data.messaggi);    
        });
    }
    
    $("h3").bind('click', function(ev) {
        load();
    });
    
    google.charts.setOnLoadCallback(load);
});
