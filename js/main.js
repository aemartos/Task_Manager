

/*----------- SORTABLE ELEMENTS JQUERY --------------------*/

$( "#sortable_list" ).sortable();
$( "#sortable_list" ).disableSelection();


/*------------------ SOME FUNCTIONS ------------------------*/

var capitalize = function (string_in) {
	var string_out = '';
	string_out += string_in.toUpperCase();
	return string_out;
};

var pretty_date = function (date_in) {
	var date_out = new Date(date_in);
	return date_out.getDate() + '/' + (date_out.getMonth() + 1) + '/' + date_out.getFullYear();
};

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
};

var toggle = function(element, class_in) {
	element.toggleClass(class_in);
}; 

var add_class = function(element, class_in) {
	element.addClass(class_in);
	has_class = true;
}; 

var remove_class = function(element, class_in) {
	element.removeClass(class_in);
	has_class = false;
}; 


/*------------------ CALDENDAR POP-UP ---------------------*/

var calendar = $('.calendar');
var overley = $('.overley');
var cal_open_button = $('.header_calendar');
var cal_close_button = $('.close_button');


var toggleCalendar = function(){
	toggle(calendar, 'closed');
	toggle(overley,'closed');
};

cal_open_button.on('click', toggleCalendar);

cal_close_button.on('click', toggleCalendar);

overley.on('click',	toggleCalendar);


/*------------------ ADD TASK POP-UP ---------------------*/

var add_task = $('.add_task');
var overley2 = $('.overley2');
var task_open_button = $('.name_list_icon');
var task_close_button = $('.close_task_button');
var add_button = $('.add_button');

var toggleAdd_task = function(){
	toggle(add_task, 'closed');
	toggle(overley2,'closed');
};

task_open_button.on('click', toggleAdd_task);

task_close_button.on('click', toggleAdd_task);

overley2.on('click',	toggleAdd_task);



//////////OPEN GENERIC //////////


var accordion = function (className) {
  var item = $(className);
  item.toggleClass("closed");
  if (item.css('max-height') == '0px'){
  	item.css('max-height', item.prop("scrollHeight") + 20 + "px");
  } else {
  	item.css('max-height', '0');
  } 
};


//////////OPEN STATUS //////////

var add_status = $(".add_status");

add_status.on("click", function() {
	accordion(".type_status");
});

//////////CHANGE STATUS //////////

var all_status = $(".status_item");
var pre_status = $(".pre_status");
var final_status;

all_status.on("click", function() {
	//final_status = $(this).text().replace("●", "");
	final_status = $(this).html();
	pre_status.html(final_status);
});


//////////OPEN CATEGORY //////////

var add_category = $(".add_category");

add_category.on("click", function() {
	accordion(".type_category");
});

//////////CHANGE CATEGORY //////////

var all_category = $(".category_item");
var pre_category = $(".pre_category");
var final_category;

all_category.on("click", function() {
	final_category = $(this).html();
	pre_category.html(final_category);
});


//////////ADD GENERIC//////////
var files__ = '';
var add_attch = function(ev) {

  var file = ""; //this.files[0].name;
  for (var f = 0; f < this.files.length ; f++){
  	file += this.files[f].name 
  	if(f !== this.files.length -1) {
  		file +=", "
  	}
  }
  var dflt = $(this).attr("placeholder");
  if($(this).val()!=""){
    $(this).next().text(file);
  } else {
    $(this).next().text(dflt);
  }
};

//////////ADD IMG //////////

$(".input_img").on("change", add_attch);

//////////ADD FILE//////////

$(".input_file").on("change", add_attch);


//////////ADD NEW TASK//////////

add_button.on('click', function () {
	
	var filename= $(".file_text").text().trim();
  filename = filename !== 'Choose a file' ? filename.split(',') : [];
  
	var newSubtasks = $('#add_subtasks').val().split(',');
	if (newSubtasks.length == 1 && newSubtasks[0].length < 1) {
		newSubtasks = [];
	};

  var newTask = {
    "subtasks": newSubtasks,
    "attachments": filename,
    "images": [
      "img/guyicon.png",
      "img/guyicon.png",
      "img/girlicon.png",
      "img/guyicon.png"
    ],
    "category": final_category ? final_category.substr(13,10) : 'category01',
    "status": final_status ? final_status.replace("●", "").toLowerCase() : 'todo' ,
    "date": Date.now(),
    "description": $('#add_description').val(),
    "title": $('#add_title').val(),
    "index": data.length,
    "id": randomString(24, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
  };

  data.push(newTask);

  createTaskList(data.length-1, newTask);
  list_items = $('.list_item');
  var thisTask = list_items.last();
  thisTask.on('click', function() {
		select_el($(this), false);
	});
  select_el(thisTask , true);
  
  $('.add_task_body input').val("");
  $('.add_task_body .img_text').text("Choose an image");
  $('.add_task_body .file_text').text("Choose a file");
  $('.pre_status').text("Add status");
  $('.pre_category').text("Add category");
  
  toggleAdd_task();


 list_items.on('click', function() {
	if (window.screen.availWidth <= 480 || 737) {
		$('.container_item.container_task').removeClass('closed');
		$('.container_item.container_statuslist').addClass('closed');
  }
	select_el($(this), false);
});

closed_mob_task.on('click', function() {
	if (window.screen.availWidth <= 480 || 737) {
		$('.container_item.container_task').addClass('closed');
		$('.container_item.container_statuslist').removeClass('closed');
  }
});

});


/*---------------- DESK SELECTION ------------------------*/

var desk = $('.type_desk');
var desk_button = $('.desk_arrows');


desk_button.on('click', function() {
	toggle(desk, 'closed');
});


/*---------------- MENU USER OPTIONS ---------------------*/

var user_menu = $('.header_user_menu');
var user_menu_button = $('.user_arrow');


user_menu_button.on('click', function() {
	toggle(user_menu, 'closed');
	startTimer();
});

/*------------------ TIMER MENU USER OPTIONS -----------------*/

var timer;

function startTimer (){
	timer = window.setTimeout(function(){
		toggle(user_menu, 'closed');
	}, 4000);
}


/*------------------ INPUT SEARCH WITH HIGHLIGHT ------------------------*/

var taskSearch = $("#taskSearch");

var search = function () {
  
  var input = $(this);
  var filter = input.val().toUpperCase();
  var list = $("#sortable_list");
  var items = $(".list_item");
  var title;

  // remove any old highlighted terms
  $('.search_highlight').removeHighlight();
  // disable highlighting if empty
  if (filter) {
      // highlight the new term
      $('.search_highlight').highlight(filter);
  }

  items.each(function (i, e) {

    title = $(items[i]).find(".task_title");
    var len = filter.length
    var ind = title.html().toUpperCase().indexOf(filter);
    	if (ind > -1) {
    		$(items[i]).removeClass('hidden');
      } else {
      	$(items[i]).addClass('hidden');
      };

    });
  select_el(items.not('.hidden').first(), true);
};

taskSearch.on('keyup', search);
 

///////////HIGHLIGHT///////////////
$.fn.highlight = function(pat) {
 function innerHighlight(node, pat) {
  var skip = 0;
  if (node.nodeType == 3) {
   var pos = node.data.toUpperCase().indexOf(pat);
   if (pos >= 0) {
    var spannode = document.createElement('span');
    spannode.className = 'highlight';
    var middlebit = node.splitText(pos);
    var endbit = middlebit.splitText(pat.length);
    var middleclone = middlebit.cloneNode(true);
    spannode.appendChild(middleclone);
    middlebit.parentNode.replaceChild(spannode, middlebit);
    skip = 1;
   }
  }
  else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
   for (var i = 0; i < node.childNodes.length; ++i) {
    i += innerHighlight(node.childNodes[i], pat);
   }
  }
  return skip;
 }
 return this.each(function() {
  innerHighlight(this, pat.toUpperCase());
 });
};

$.fn.removeHighlight = function() {
 function newNormalize(node) {
    for (var i = 0, children = node.childNodes, nodeCount = children.length; i < nodeCount; i++) {
        var child = children[i];
        if (child.nodeType == 1) {
            newNormalize(child);
            continue;
        }
        if (child.nodeType != 3) { continue; }
        var next = child.nextSibling;
        if (next == null || next.nodeType != 3) { continue; }
        var combined_text = child.nodeValue + next.nodeValue;
        new_node = node.ownerDocument.createTextNode(combined_text);
        node.insertBefore(new_node, child);
        node.removeChild(child);
        node.removeChild(next);
        i--;
        nodeCount--;
    }
 }

 return this.find("span.highlight").each(function() {
    var thisParent = this.parentNode;
    thisParent.replaceChild(this.firstChild, this);
    newNormalize(thisParent);
 }).end();
};




/*------------------ SHORT INPUT SEARCH ------------------------*/

/* highlight matches text */
// var highlight = function (string) {
//     $("#sortable_list .task_title.match").each(function () {
//         var matchStart = $(this).text().toLowerCase().indexOf("" + string.toLowerCase() + "");
//         var matchEnd = matchStart + string.length - 1;
//         var beforeMatch = $(this).text().slice(0, matchStart);
//         var matchText = $(this).text().slice(matchStart, matchEnd + 1);
//         var afterMatch = $(this).text().slice(matchEnd + 1);
//         $(this).html(beforeMatch + "<span class='highlight'>" + matchText + "</span>" + afterMatch);
//     });
// };


// /* filter list */
// $("#taskSearch").on("keyup click input", function () {
//     if (this.value.length > 0) {
//     		$('#sortable_list .task_title span').removeClass("highlight");
//         $("#sortable_list .task_title").removeClass("match").filter(function () {
//             return $(this).text().toLowerCase().indexOf($("#taskSearch").val().toLowerCase()) != -1;
//         }).addClass("match").show();
//         $('.list_item .task_title').not('.match').parent().parent().parent().hide();
//         highlight(this.value);
//         $("#sortable_list").show();
//     }
//     else {
//         $("#sortable_list, #sortable_list .task_title").removeClass("match");
//     }

// });



/*-------------------------- DATA ----------------------------------*/


/*------------------ CROSS OUT SUBTASKS ------------------------*/

var crossing = function () {
	var cross_out = $('.list');
	var checkbox = $('.list_checkbox');
		
	checkbox.on('click', function (ev) {

		var checkbox_value = ev.target.value;
			$(cross_out[checkbox_value]).css('textDecoration', ev.target.checked == true ?'line-through':'none');
	});
};


/*------------------ TASK LIST ------------------------*/

var items_cat = {
	category01: 'e',
	category02: 'f',
	category03: 'J',
	category04: '!',
	category05: '&amp;',
	category06: '¡',
	category07: 'ç',
	category08: '¿',
	category09: 'Ç',
	category10: 'á',
};

var sortable_list = $('#sortable_list');
var letter, list_task, task_all, task_icon, task_information, task_information_title, task_information_date, task_arrows, task_arrow_up, task_arrow_down;

var createTaskList = function (i, data_item) {
	
	letter = items_cat[data_item.category];

	list_task = $(document.createElement('DIV'));
	list_task.addClass( ((i === 0) ? 'selected ' : '') + 'list_item list_task list_task' + ((i < 9) ? '0' + (data_item.index + 1) : data_item.index + 1) + ' ' + data_item.status + ' ' + data_item.category);
	list_task.attr({
		'data-id': data_item.id, 
		'id': i
	});

	task_all = $(document.createElement('DIV'));
	task_all.addClass('task_all');
	task_all.appendTo(list_task);

	task_icon = $(document.createElement('DIV'));
	task_icon.html(letter);
	task_icon.addClass('task_icon ' + data_item.category + ' ' + data_item.status);
	task_icon.appendTo(task_all);

	task_information = $(document.createElement('DIV'));
	task_information.addClass('task_information');
	task_information.appendTo(task_all);
	
	task_information_title = $(document.createElement('DIV'));
	task_information_title.html((data_item.index + 1) + ' ' + data_item.title);
	task_information_title.addClass('task_information_item task_title');
	task_information_title.appendTo(task_information);

	task_information_date = $(document.createElement('DIV'));
	task_information_date.html(pretty_date(data_item.date));
	task_information_date.addClass('task_information_item task_date');
	task_information_date.appendTo(task_information);

	task_arrows = $(document.createElement('DIV'));
	task_arrows.addClass('task_arrows');
	task_arrows.appendTo(list_task);

	task_arrow_up = $(document.createElement('DIV'));
	task_arrow_up.html('>');
	task_arrow_up.addClass('task_arrow_up');
	task_arrow_up.appendTo(task_arrows);

	task_arrow_down = $(document.createElement('DIV'));
	task_arrow_down.html('>');
	task_arrow_down.addClass('task_arrow_down');
	task_arrow_down.appendTo(task_arrows);


	list_task.appendTo(sortable_list);
};

$.each(data, createTaskList);


/*------------------ FULL TASK ------------------------*/

var item_data = null;
var full_task = function (className, content) {
			$(className).html(content);
};

var load_info_by_id = function (id) {
	var filteredData = data.filter(function (data_element) {
		return (data_element.id == id);
	});
	
	var selected_data_element = filteredData[0];
	item_data = selected_data_element;

	// Taking data from the selected element with the function full_task
	full_task('.taskbody_status', capitalize(selected_data_element.status));
	full_task('.taskbody_content_title', (selected_data_element.index + 1 ) + ' ' + selected_data_element.title);
	full_task('.taskbody_info_item.taskbody_icon', items_cat[selected_data_element.category]);

	// Add status
	var classes = $('.taskbody_info_item.taskbody_icon');

	var class_set = classes.attr('class').split(' ');
	if (class_set.length > 2) {
		classes.removeClass(classes.attr('class').split(' ').pop());
	}
	classes.addClass(selected_data_element.status);

	full_task('.taskbody_date', pretty_date(selected_data_element.date));
	full_task('.taskbody_content_text', selected_data_element.description);


	var task_images = selected_data_element.images;
	var images;
	var gallery = $('.taskbody_content_images_gallery');
	gallery.empty();

	$.each(task_images, function (i, e) {
		images = $(document.createElement('DIV'));
		images.addClass('taskbody_img');
		img = $(document.createElement('IMG'));
		img.attr({
			src: e
		});
		img.appendTo(images);

		images.appendTo(gallery);
	});


	var task_attach = selected_data_element.attachments;
	var attachments;
	var box = $('.taskbody_content_attachments_box');
	box.empty();

	$.each(task_attach, function (i, e) {
		attachments = $(document.createElement('DIV'));
		attachments.addClass('taskbody_attachment');

		span_icon = $(document.createElement('SPAN'));
		span_icon.addClass('attch_icon');
		span_icon.html('¢');
		span_icon.appendTo(attachments);

		span_text = $(document.createElement('SPAN'));
		span_text.addClass('attch_text');
		span_text.html(e.indexOf('.') > -1 ? e : (e + '.pdf'));
		span_text.appendTo(attachments);

		attachments.appendTo(box);
	});

	var task_subt = selected_data_element.subtasks;
	var subtasks;
	var list = $('.taskbody_content_list');
	list.empty();

	$.each(task_subt, function (i, e) {
		subtasks = $(document.createElement('DIV'));
		subtasks.addClass('list_box_option');

		input = $(document.createElement('INPUT'));
		input.attr({
			class: 'list_checkbox',
			type: 'checkbox',
			name: 'task',
			value: i
		});
		input.appendTo(subtasks);

		span = $(document.createElement('SPAN'));
		span.addClass('list');
		span.html(e);
		span.appendTo(subtasks);

		subtasks.appendTo(list);
	});

	crossing();

} //load_info_by_id end of function

		

/*------------------ SELECT TASK OF THE LIST ------------------------*/

var list_items = $('.list_item');
var selected_element = $('.list_item').first();
var closed_mob_task = $('.taskbody_close.taskbody_close_icon span');


//////////// MOB CONFIGURATION FULL-TASK ////////////

list_items.on('click', function() {
	if (window.screen.availWidth <= 480 || 737) {
		$('.container_item.container_task').removeClass('closed');
		$('.container_item.container_statuslist').addClass('closed');
  }
  //////////// NORMAL CONFIGURATION FULL-TASK ////////////
	select_el($(this), false);
});

closed_mob_task.on('click', function() {
	if (window.screen.availWidth <= 480 || 737) {
		$('.container_item.container_task').addClass('closed');
		$('.container_item.container_statuslist').removeClass('closed');
  }
});



//onload FULL TASK
load_info_by_id(data[0].id);

var select_el = function(selected, stopScroll) {

	if(!selected || selected.length == 0 ){return;}
	selected_element = selected;
	var id = selected.attr('data-id');

	sortable_list.find('.selected').removeClass('selected');

	selected.addClass('selected');

	load_info_by_id(id);

	if(stopScroll){
		selected[0].scrollIntoView(/*{block: "start", behavior: "smooth"}*/);
		document.getElementById('container_list_id').scrollTop -= 77.59;
	}
};



/*------------------ CHANGE BETWEEN TASKS -> ARROWS ------------------------*/

var left_arrow = $('.taskbody_arrow_left');
var right_arrow = $('.taskbody_arrow_right');

var filteredList = $('.list_item').not('.hidden');

right_arrow.on('click', function (ev) {
	filteredList = $('.list_item').not('.hidden');
	if (selected_element === null || filteredList.length < 2) {
		return;
	}
	
	var foundElement = selected_element

	filteredList.each(function (i, e) {

		if(e.id === selected_element.attr('id')) {
			if(i == filteredList.length - 1) {
				foundElement = filteredList.first();
			} else {
				foundElement = filteredList.eq(i+1);
			}
			return;
		}
	});
   select_el(foundElement, true);
});	


left_arrow.on('click', function (ev) {
	filteredList = $('.list_item').not('.hidden');

	if (selected_element === null || filteredList.length < 2) {
		return;
	}
	var foundElement = selected_element;


	filteredList.each(function (i, e) {
		if(e.id === selected_element.attr('id')) {
			if(i == 0) {
				foundElement = filteredList.last();
			} else {
				foundElement = filteredList.eq(i-1);
			}
			
			return;
		}
	});
	select_el(foundElement, true);
});	

/*------------------ COMMON FILTERS ------------------------*/


var filterApplied = null;

var filter = function (item, filter) {
	item.has('.' + filter).removeClass('hidden');
	item.not('.' + filter).addClass('hidden');
	select_el($('.list_item').not('.hidden').first(), true);
	filterApplied = filter;
};

var clean_filter = function (item) {
	item.removeClass('hidden');
	select_el(selected_element, true);
	filterApplied = null;
};


/*------------------ TASK FILTER STATUS ------------------------*/

var filter_items_st = $('.status_title');
var clean_filter_st = $('.status_main_title');

filter_items_st.on('click', function (ev) {
	filter(list_items, ev.target.id);
	console.log(ev.target.id);
});

clean_filter_st.on('click', function (ev) {
	clean_filter(list_items);
});


/*------------------ TASK FILTER CATEGORY ------------------------*/

var filter_items_cat = $('.category:not(.category00)');
var clean_filter_cat = $('.category00');


filter_items_cat.on('click', function (ev) {
	filter(list_items, ev.target.id);
});

clean_filter_cat.on('click', function (ev) {
	clean_filter(list_items);
});


/*------------------ COMPLETED AND DELETED BUTTONS ------------------------*/

var todo = $('.icon_todo');
var doing = $('.icon_doing');
var done = $('.icon_done');
var overdue = $('.icon_overdue');
var canceled = $('.icon_canceled');
var deleted = $('.icon_delete');

var change_status = function (status_task, status) {
	
	status_task.on('click', function (ev) {
    var prevStatus = data[selected_element.attr('id')].status 

		var status_task_classes = $('.taskbody_icon').first()
		status_task_classes.removeClass(prevStatus);
		status_task_classes.addClass(status);

		full_task('.taskbody_status', capitalize(status));

		data[selected_element.attr('id')].status = status;

		var list_st_icon_classes = $(".list_item.selected .task_icon");
		list_st_icon_classes.removeClass(prevStatus);
		list_st_icon_classes.addClass(status);
		selected_element.addClass(status)
		selected_element.removeClass(prevStatus);
		progress();

		 //reapply filter after changing status
		if (filterApplied && filterApplied!== status) { 
			var filterStat = filterApplied;
			selected_element.addClass('hidden')
			select_el($('.list_item.' + filterStat).first());
		}
		
	});
};

change_status(todo, 'todo');
change_status(doing, 'doing');
change_status(done, 'done');
change_status(overdue, 'overdue');
change_status(canceled, 'canceled');


deleted.on('click', function (ev) {
	var id = selected_element.attr('id');
	filteredList = $('.list_item').not('.hidden');
	var foundElement = selected_element;

	$.each(filteredList, function (i, e) {
		if(e.id === id) {
			if(i == filteredList.length - 1) {
				foundElement = filteredList.first();
			} else {
				foundElement = filteredList.eq(i+1);
			}
		}
	});
	selected_element.remove();
	select_el(foundElement, true);
	data.splice(id, 0);

	  //////////// MOB CONFIGURATION FULL-TASK ////////////
	if (window.screen.availWidth <= 480 || 737) {
		$('.container_item.container_task').addClass('closed');
		$('.container_item.container_statuslist').removeClass('closed');
  }
});



/*------------------ PROGRESS BAR ------------------------*/

var progress_bar = $('.progress_fill');
var progress_percent = $('.progress_percent');


var progress = function () {
	var done_tasks = $('.done').length - 1;
	var total_tasks = data.length;

	var progress_done = Math.round((done_tasks*98)/total_tasks);
	progress_bar.css('width', progress_done + '%');
	progress_percent.html(progress_done + '% COMPLETED');

	if (progress_done == 100) {
		progress_bar.css('border-bottom-right-radius', '.2em');
	}
};

progress();







