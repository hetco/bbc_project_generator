let ids = [
	'Pattern',
	'Stake_Research',
	'Stake_UXD',
	'Stake_Audiences',
	'Stake_Marketing',
	'Stake_Editorial',
	'Stake_Engineering',
	'Stake_RD',
	'Stake_Product',
	'Target_100_','Target_80_','Target_50_',
	'Time_this_month','Time_this_quarter','Time_next_quarter','Time_Unknown','Time_Speculative',
	'Deliverables_100_','Deliverables_80_','Deliverables_50_',
	'Audience_Internal','Audience_External',
	'Capability_new_relationship','Capability_new_team_better_understanding','Capability_new_skill','Capability_new_tech',
	'Effort_L','Effort_M','Effort_S',
	'OVER_35','UNDER_35','Under_17',
	'Exploratory','Evaluative','Foundational','Generative','Practise'
];

let colorLookup = {
   "iPlayer": {
      "Colour": "#DB4C7D"
   },
   "Sounds": {
      "Colour": "#EB5829"
   },
   "Home": {
      "Colour": "#3579C1"
   },
   "News": {
      "Colour": "#AC2D24"
   },
   "News (World Service)": {
      "Colour": "#AC2D24"
   },
   "LIVE": {
      "Colour": "#FF0032"
   },
   "Sport": {
      "Colour": "#f5c20a"
   },
   "Weather": {
      "Colour": "#2b93d4"
   },
   "CBBC": {
      "Colour": "#9ED040"
   },
   "CBeebies": {
      "Colour": "#e1c705"
   },
   "Children’s Apps": {
      "Colour": "#e1c705"
   },
   "Bitesize": {
      "Colour": "#5C328D"
   },
   "Short form video (AVKX)": {
      "Colour": "#53ADA0"
   },
   "Audience Platform": {
      "Colour": "#4ab5a0"
   },
   "Enterprise and Production Systems (internal)": {
      "Colour": "#c7c752"
   },
   "GEL (Global Experience Language) (internal)": {
      "Colour": "#f0c400"
   },
   "Emerging Experiences": {
      "Colour": "#FFBC30"
   },
   "Portfolio Level Initiatives": {
      "Colour": "#ff6678"
   },
   "Research Ops (internal)": {
      "Colour": "#A37177"
   }
};

function init(){
	$('#buttons').hide();
	//$('#screen1').hide();
	$('#screen2').hide();
	$('#screen3').hide();
	initQuestions(questions);
	initIcon();
	updateScreen1('', '', '', '');
}

function initQuestions(questions){

	$('.form-select').on('change',
		function(){
			questions.screen1 = onChangeFunctionScreen1(questions.screen1);
			onChangeFunctionScreen2();
		}	
	);
	$('.form-control').on('input',
		function(){
			questions.screen1 = onChangeFunctionScreen1(questions.screen1);
		}	
	);

	$('.checkboxanswer').change(function () {
    	onChangeFunctionScreen2();
 	});

 	$('.checkboxanswer2').change(function () {
    	onChangeFunctionScreen2();
 	});

 	$('.checkboxanswer3').change(function () {
    	onChangeFunctionScreen2();
 	});

  	$('.checkboxanswer4').change(function () {
    	onChangeFunctionScreen2();
 	});

	$('#next1').on('click',function(){
		$('#screen1').hide();
		$('#screen2').show();
	});

	$('#next2').on('click',function(){
		let url = $('#next2').attr('data-url');
		window.location.href = url;
	});

	$('#screen2questions').height(window.innerHeight-50);
}

function initIcon(){
	ids.forEach(function(id){
		$('#'+id).hide();
	});
	$('#audience_circle').css('stroke-width',2);
}

function onChangeFunctionScreen1(questions){
	questions.forEach(function(q){
		q.value = $('#'+q.id).val();
	});

	updateScreen1(questions[0].value,questions[1].value,questions[2].value,questions[3].value);
	return questions;
}

function onChangeFunctionScreen2(){
	let questions = {'q1':'','q2':'','q3':'','q4':'','q5':[],'q6':'','q7':'','q8':'','q9':'','q10':[],'q11':'','q12':[],'q13':[]}
	questions.q5 = getAnswerQ5();
	questions.q6 = $('#q6').val();
	questions.q7 = $('#q7').val();
	questions.q8 = $('#q8').val();
	questions.q9 = $('#q9').val();
	questions.q10 = getAnswerQ10();
	questions.q11 = $('#q11').val();
	questions.q1 = $('#q1').val();
	questions.q2 = $('#q2 option:selected').text();
	questions.q3 = $('#q3 option:selected').text();
	questions.q4 = $('#q4').val();
	questions.q12 = getAnswerQ12();
	questions.q13 = getAnswerQ13();
	updateIcon(questions);
	generateURL(questions);
	return questions;
}

function getAnswerQ5(){
	let list = [];
	$(".checkboxanswer:checked").each(function() {
        list.push($(this).val());
    });

	return list;
}

function getAnswerQ10(){
	let list = [];
	$(".checkboxanswer2:checked").each(function() {
        list.push($(this).val());
    });

	return list;
}

function getAnswerQ12(){
	let list = [];
	$(".checkboxanswer3:checked").each(function() {
        list.push($(this).val());
    });

	return list;
}

function getAnswerQ13(){
	let list = [];
	$(".checkboxanswer4:checked").each(function() {
        list.push($(this).val());
    });

	return list;
}

function updateIcon(questions){
	initIcon();
	let color = '';
	if(colorLookup[questions.q1]!=undefined){
		color = colorLookup[questions.q1]['Colour'];

		$('.cls-4').css('stroke',color);
		//$('.st4').css('fill',color);
		$('.cls-0').css('stroke',color);
		$('.cls-0').css('fill',color);
		$('.cls-1').css('stroke',color);
		$('.cls-1').css('fill',color);
		$('#generatedsentence2').css('color',color);
		$('.answertext').css('color',color);
	}

	questions.q5.forEach(function(stakeholder){
		$('#Stake_'+stakeholder).show();
		$('#Stake_'+stakeholder +' circle').css('fill',color);
		$('#Stake_'+stakeholder +' text').css('fill','#ffffff');
	});
	$('#'+questions.q6).show();
	$('#'+questions.q7).show();
	$('#'+questions.q8).show();
	if(questions.q9=='external_audience'){
		$('#audience_circle').css('stroke-width',6);
	}
	questions.q10.forEach(function(id){
		$('#'+id).show();
	});

	$('#'+questions.q11).show();
	if(colorLookup[questions.q1]!=undefined){
		let color = colorLookup[questions.q1]['Colour'];

		$('.cls-4').css('stroke',color);
		//$('.st4').css('fill',color);
		$('.cls-0').css('stroke',color);
		$('.cls-0').css('fill',color);
		$('.cls-1').css('stroke',color);
		$('.cls-1').css('fill',color);
		$('#generatedsentence2').css('color',color);
		$('.answertext').css('color',color);
	}

	let goalWordList = questions.q2.split(' ');
	let text1 = '';
	let text2 = '';
	let text3 = '';
	let breakpoint = 2
	if(goalWordList.length>6){
		breakpoint = 3
	}
	goalWordList.forEach(function(word,i){
		if(i<breakpoint){
			text1 += word+' ';
		}
		if(i<breakpoint*2&&i>breakpoint-1){
			text2 += word+' ';
		}
		if(i>breakpoint*2-1){
			text3 += word+' ';
		}
	});
	$('#goal1').html(text1);
	$('#goal2').html(text2);
	$('#goal3').html(text3);
	if(questions.q3=='Practise/Process Improvements'){
		questions.q3='Practise';
	}
	$('#'+questions.q3).show();

	
	questions.q12.forEach(function(id){
		$('#'+id).show();
	});
	console.log(questions);
	questions.q13.forEach(function(id){
		$('#Stake_'+id).show();
		$('#Stake_'+id +' circle').css('fill','#FFFFFF');
		$('#Stake_'+id +' text').css('fill','#000000');
	});
}

function updateScreen1(answer1, answer2, answer3, answer4){
	let complete = true;
	if(answer1=='' || answer1==undefined){answer1='...';complete=false;}
	if(answer2=='' || answer2==undefined){answer2='...';complete=false;}
	if(answer3=='' || answer3==undefined){answer3='...';complete=false;}
	if(answer4=='' || answer4==undefined){answer4='...';complete=false;}
	if(complete){
		$('#buttons').show();
	} else {
		$('#buttons').hide();
	}
	let sentenceHTML = 'A project to <span class="answertext">' +answer2+ '</span> on <span class="answertext">'+answer1+'</span> by <span class="answertext">' + answer3+ '</span> <span class="answertext">'+answer4+'</span>';

	$('#generatedsentence').html(sentenceHTML);
	$('#generatedsentence2').html(sentenceHTML);
	if(colorLookup[questions.q1 = $('#q1').val()]!=undefined){
		let color = colorLookup[questions.q1]['Colour'];
		$('.answertext').css('color',color);
	}
}

function generateURL(questions){
	let baseURL = 'summary/?';
	for(key in questions){
		if(Object.prototype.toString.call(questions[key]) === '[object Array]'){
			let answers = '';
			questions[key].forEach(function(answer){
				answers+=answer+'|'
			})
			baseURL+= key + '=' + answers +'&';
		} else {
			baseURL+= key + '=' + questions[key] +'&';
		}
	};
	$('#next2').attr('data-url',baseURL);
}

init()