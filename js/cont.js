$(document).ready(function(){

    // the following is defined in config.js
    // var server = "http://localhost/ekiden/call";
    // var server = "http://18.179.8.46/ekiden/call";

    var selected_tab = null;
    var team = null;

    // ------------------------------
    // set selected_tab variable
    $('.ktab').on('click', function() {
	selected_tab = $(this).attr('id');
	//mon("selected:" + selected_tab);
	showCurrentList();
	$('#resultInput').html("");
    })


    // ------------------------------
    $('#reloadList').on('click', function() {
	$('#resultInput').html("");
	showCurrentList();
    })

    // ------------------------------
    // set selected_tab variable
    $('.team').on('click', function() {
	team = $(this).data('id');
	//mon(team);

    	var parameter = {
	    mode: "input",
    	    ku: selected_tab,
	    team: team
    	};
    	jQuery.post(server, parameter, function(data) {
	    $('#resultInput').html(data.body);
	    // $(this).css('background','#FFFFFF');
    	}, "json");


    })


    // ------------------------------
    function showCurrentList() {
    	var parameter = {
	    mode: "get_all_data",
    	    ku: selected_tab
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
