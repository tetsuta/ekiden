$(document).ready(function(){

    // the following is defined in config.js
    // var server = "http://localhost/ekiden/call";
    // var server = "http://18.179.8.46/ekiden/call";

    var selected_ku = null;
    var selected_team = null;
    var team = null;

    // ------------------------------
    // set selected_ku variable
    $('.ktab').on('click', function() {
	selected_ku = $(this).attr('id');
	//mon("selected:" + selected_ku);
	showCurrentList();
	$('#resultInput').html("");
    })

    // ------------------------------
    // set selected_ku variable
    $('.ttab').on('click', function() {
	selected_team = $(this).attr('id');
	//mon("selected:" + selected_ku);
	showCurrentTeamResult();
    })

    // ------------------------------
    // reset all data
    $('#allreset').on('click', function() {
    	var parameter = {
	    mode: "allreset"
    	};
    	jQuery.post(server, parameter, function(data) {
	    $('#feedback_message').html(data.body);
	    // $(this).css('background','#FFFFFF');
    	}, "json");
    })

    // ------------------------------
    // start
    $('#start').on('click', function() {
    	var parameter = {
	    mode: "start"
    	};
    	jQuery.post(server, parameter, function(data) {
	    $('#feedback_message').html(data.body);
	    // $(this).css('background','#FFFFFF');
    	}, "json");
    })

    // ------------------------------
    $('#reloadList').on('click', function() {
	$('#resultInput').html("");
	showCurrentList();
    })

    // ------------------------------
    // set selected_ku variable
    $('.team').on('click', function() {
	team = $(this).data('id');
	//mon(team);

    	var parameter = {
	    mode: "input",
    	    ku: selected_ku,
	    team: team
    	};
    	jQuery.post(server, parameter, function(data) {
	    $('#resultInput').html(data.body);
	    // $(this).css('background','#FFFFFF');
    	}, "json");


    })


    // ------------------------------
    function showCurrentTeamResult() {
    	var parameter = {
	    mode: "get_team_result",
    	    teamid: selected_team
    	};
    	jQuery.post(server, parameter, function(data) {
	    $('#teamList').html(data.body);
    	}, "json");
    }

    // ------------------------------
    function showCurrentList() {
    	var parameter = {
	    mode: "get_all_data",
    	    ku: selected_ku
    	};
    	jQuery.post(server, parameter, function(data) {
	    $('#currentList').html(data.body);
    	}, "json");
    }

    // ------------------------------
    function mon(text) {
	$('#monitor').text(text);
    }


    // ------------------------------
    // ------------------------------
    // $('#aira').on('click', function() {
    // 	var parameter = {
    // 	    mode: "getNextEvalText"
    // 	};
    // 	jQuery.post(server, parameter, function(data) {
    // 	    mon(data.body);
    // 	}, "json");
    // })

});
