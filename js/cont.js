$(document).ready(function(){

    // the following is defined in config.js
    // var server = "http://localhost/ekiden/call";
    // var server = "http://18.179.8.46/ekiden/call";

    var selected_ku = null;
    var selected_team = null;
    var team = null;
    var edit_target_key = null;


    // ------------------------------
    // modal
    $('.js-modal-open').on('click',function(){
        $('.js-modal').fadeIn();
        return false;
    });
    $('.js-modal-close').on('click',function(){
        $('.js-modal').fadeOut();
        return false;
    });


    // ------------------------------
    $('#edit_name_button').on('click', function() {
	var team = $('#editteam').text();
    	var parameter = {
	    mode: "edit_name",
	    team: team,
	    key: edit_target_key
    	};
    	jQuery.post(server, parameter, function(data) {
	    $('#feedback_message').html(data.body);
	    $('.js-modal').fadeOut();
	    showCurrentList();
    	}, "json");
    })


    // ------------------------------
    $('#edit_time_button').on('click', function() {
	var time = $('#edittime').val();
    	var parameter = {
	    mode: "edit_time",
	    time: time,
	    key: edit_target_key
    	};
    	jQuery.post(server, parameter, function(data) {
	    $('#feedback_message').html(data.body);
	    $('.js-modal').fadeOut();
	    showCurrentList();
    	}, "json");
    })


    // ------------------------------
    $('#delete_button').on('click', function() {
    	var parameter = {
	    mode: "delete_data",
	    key: edit_target_key
    	};
    	jQuery.post(server, parameter, function(data) {
	    $('#feedback_message').html(data.body);
	    $('.js-modal').fadeOut();
	    showCurrentList();
    	}, "json");
    })


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
	    hilight_button(data.passed);
	    setupEditButton();
	    $('#feedback_message').html("");
    	}, "json");
    }

    // ------------------------------
    $('.dropdown-menu .dropdown-item').click(function(){
	$('#editteam').text($(this).attr('value'));
    });


    // ------------------------------
    function setupEditButton() {
	$('.editbutton').on('click', function() {
	    edit_target_key = $(this).data('id');

	    var key_list = edit_target_key.split(/__/)
	    var teamname = key_list[0];
	    var time = key_list[1];

	    $('#editteam').text(teamname);
	    $('#edittime').val(time);
            $('.js-modal').fadeIn();
            // return false;


    	    // var parameter = {
	    // 	mode: "delete",
    	    // 	key: key
    	    // };
    	    // jQuery.post(server, parameter, function(data) {
	    // 	$('#currentList').html(data.body);
    	    // }, "json");
	})
    }

    // ------------------------------
    function mon(text) {
	// $('#monitor').text(text);

	var current_monitor = $('#monitor').text();
	$('#monitor').html(current_monitor + ";;;" + text);
    }

    // ------------------------------
    function hilight_button(gray_list) {
	var ku_num = selected_ku.replace("ktab","");

	for(let index=1; index <= 12; index++){
	    button_name = "#b" + ku_num + "_" + index.toString();
	    $(button_name).css('background', '#FFFFFF');
	}
	for(let i=0; i<gray_list.length; i++){
	    button_name = "#b" + ku_num + "_" + gray_list[i]
	    $(button_name).css('background', '#AAAAAA');
	}
    }

    // ------------------------------
    // $('#trialrun').on('click', function() {
    // 	var button_name = ".team" + "1" + "_" + "姶良"
    // 	// $('.team1').css('background', '#AAAAAA');
    // 	// $(button_name).css('background', '#AAAAAA');
    // })


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
