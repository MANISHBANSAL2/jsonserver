
$(document).ready(function()  {

	var $tableData = $('#tableData');
	
	var $input_name 	= $('#inputName');
	var $input_company  = $('#inputCompany');
	var $input_phone    = $('#inputPhone');
	

	var addTemplate = $("#add-Template").html();

	function addPeople(people) {	

		$('.table_data').append(Mustache.render(addTemplate, people));
	}

	$("#load").click(function() {
		$('.table_data').empty();

		$.ajax({
			type : 'GET',
			url : "http://localhost:8080/friends",
			success : function(data) {

				var abc= JSON.stringify(data);
				alert(abc);
				
				$('.table_data').append("<thead><tr><th>ID</th><th>NAME</th><th>COMPANY</th><th>PHONE</th></tr></thead>");
				
				$.each(data, function(i, detail){

			
			addPeople(detail);


       }); // each function ends

				

		}, // success function ends

		error : function() {
			alert("Error loading page");
		}

	     }); // ajax search ends

	}); // load click function ends


	$("#find").click(function()  {

		$(".table_data").empty();

		var name = $("#searchtext").val();


		var str1 = 'http://localhost:8080/friends?q='+name;

		alert(str1);

		//console.log(str1);

		// var addTemplate = "<tr><td>{{id}}</td><td>{{name}}</td><td>{{company}}</td><td>{{phone}}</td><td><button data-id='{{id}}' class='btn remove'>DELETE</button></td></tr>";
		// function addPeople(people) {

		// 	//$('.table_data').append("<tr><td>"+people.id+"</td><td>"+people.name+"</td><td>"+people.company+"</td><td>"+people.phone+"</td></tr>");

		// 	$('.table_data').append(Mustache.render(addTemplate, people));
		// }

		$.ajax({
			type : 'GET',
			url : str1,
			success : function(data) {

				//alert(data);

				var abc= JSON.stringify(data);
				alert(abc);

	      // var keys= Object.keys(data.Search);
       //    alert(data.Search);
       
       $('.table_data').append("<thead><tr><th>ID</th><th>NAME</th><th>COMPANY</th><th>PHONE</th></tr></thead>");
       
       $.each(data, function(i, detail){
       	
         //$('.table_data').append("<tr><td><img src="+detail.Poster+"</img></td><td>"+detail.Title+"</td><td>"+detail.Year+"</td><td>"+detail.imdbID+"</td><td><button id="+detail.ID+">UPDATE</button></td><td><button id="+detail.ID+">DELETE</button></td></tr>");
         
        //$('.table_data').append("<tr><td>"+detail.id+"</td><td>"+detail.name+"</td><td>"+detail.company+"</td><td>"+detail.phone+"</td><td><button id="+detail.ID+">UPDATE</button></td><td><button id="+detail.ID+">DELETE</button></td></tr>");

        addPeople(detail);

       }); // each function ends



		}, // success function ends

		error : function() {
			alert("Error loading page");
		}

	}); // ajax search ends

}); // search click function ends

	$tableData.delegate('.remove', 'click', function()  {

		var $tr = $(this).closest('tr');

		$.ajax({
			type: 'DELETE',
			url : "http://localhost:8080/friends/" + $(this).attr('data-id'),
			success : function() {
				$tr.fadeOut(300, function() {
					$(this).remove();
				});


			} //success function ends

		}); //ajax remove ends

});  // remove click function ends

	
	$('#save').on('click', function() { 

		var peopleObject = {
			name    : $input_name.val(),
			company : $input_company.val(),
			phone   : $input_phone.val()
		};

			
			$.ajax({
			type: 'POST',
			url : "http://localhost:8080/friends/",
			data : peopleObject,
			success : function(newPeople) {
				addPeople(newPeople);
			}

		}); // ajax post ends


}); // save click ends


	$('#cancel').on('click', function() { 

		$('#inputName').val("");
		$('#inputCompany').val("");
		$('#inputPhone').val("");

	}); // cancel click ends


	$tableData.delegate('.editPeople', 'click', function()  {

		var $tr = $(this).closest('tr');
		$tr.find('input.name').val($tr.find('span.name').html());
		$tr.find('input.company').val($tr.find('span.company').html());
		$tr.find('input.phone').val($tr.find('span.phone').html());
		$tr.addClass('edit');

	}); // edit click ends

	$tableData.delegate('.cancelEdit', 'click', function()  {

		$(this).closest('tr').removeClass('edit');

	}); // cancel edit ends

	$tableData.delegate('.saveEdit', 'click', function()  {

		var $tr = $(this).closest('tr');

		var peopleObject = {
			name : $tr.find('input.name').val(),
			company : $tr.find('input.company').val(),
			phone : $tr.find('input.phone').val()
		};

		$.ajax({
			type: 'PUT',
			url : "http://localhost:8080/friends/" + $tr.attr('data-id'),
			data : peopleObject,
			success : function(newPeople) {
				$tr.find('span.name').html(peopleObject.name);
				$tr.find('span.company').html(peopleObject.company);
				$tr.find('span.phone').html(peopleObject.phone);
				$tr.removeClass('edit');
			}

		}); // ajax put ends


	}); // save edit ends


	window.onscroll = yHandler;
	var start = 19;

	function yHandler() {
		"use strict"
		//var wrap = document.getElementbyId('wrap');

		
		var $wrap = $('#wrap');
		var contentHeight = wrap.offsetHeight;
		var yOffset = window.pageYOffset;
		var y = yOffset + window.innerHeight;

		if(y >= contentHeight) {

			wrap.innerHTML += 'div class= "newData"></div>';

			$.ajax({
				type : 'GET',
				url : "http://localhost:8080/friends/?_start="+start+"&_limit=10",
				success : function(data) {

					var abc= JSON.stringify(data);
					//alert(abc);
					
					//$('.table_data').append("<thead><tr><th>ID</th><th>NAME</th><th>COMPANY</th><th>PHONE</th></tr></thead>");
					
					$.each(data, function(i, detail){
						
						addPeople(detail);


       }); // each function ends

					start+=10;

		}, // success function ends

		error : function() {
			alert("Error loading page");
		}

	     }); // ajax search ends
			
		} // if ends

	} // yHandler ends	



}); // ready function ends


function validateName(str) {

	var regex = /^[a-zA-Z ]*$/;


	//var pName = $('#inputName').val();
	alert(str);

	if(regex.test(str)) {
		return true;
	 	//$('#inputName').focus();
	 }

	 else {
	 	alert("Name should be valid");
		return false;
	 }


} // validateName ends

function validateCompany(str) {

	var regex = /^[a-zA-Z ]*$/;


	//var pcompany = $('#inputCompany').val();
	alert(str);

	if(regex.test(pCompany)) {
		return true;
		//$('#inputCompany').focus();
	}

	else {
		alert("Company should be valid");
		return false;
	}


} // validateCompany ends


function validatePhone(str) {

	var regex = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/;
    alert(str);

    if (regex.test(str)) {
    	return true;
    }

	else {
		alert("Phone number should be valid");
		return false;
	}

} // validatePhone ends



























// var str1, strImg;

// $(document).ready(function()  {

// 	$("#moreCourses").hide();

//    $("#find").click(function()  {

//    	$("p.para").empty();

//    	$("#moreCourses").show();

//    	var title = $("#textbox").val();

//    	alert(title);

//    	 $.get("http://www.omdbapi.com/", {s: title}, function(data, status){
//         if(status === "success")
//             alert("External content loaded successfully!");
//         if(status === "error")
//             alert("Error: " + xhr.status);

//         alert("callback function executed successfully");
//         str1 = JSON.stringify(data);

//         alert(str1);

//         var index1 = str1.search("http");

//         var index2 = str1.search("jpg");

//         strImg = str1.substring(index1,index2+3);

//         alert(strImg);

//         $(".para").append(str1);

//         $("img.image").attr("src", strImg);

//      }); //get function ends here  

//      alert("click function ends");   

//    });  //click function ends

//   //$("p").append(str1); 

//  }); //ready function ends