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
      "Colour": "#f8d455"
   },
   "Weather": {
      "Colour": "#97CAEA"
   },
   "CBBC": {
      "Colour": "#9ED040"
   },
   "CBeebies": {
      "Colour": "#FBE650"
   },
   "Children’s Apps": {
      "Colour": "#FBE650"
   },
   "Bitesize": {
      "Colour": "#5C328D"
   },
   "Short form video (AVKX)": {
      "Colour": "#53ADA0"
   },
   "Audience Platform": {
      "Colour": "#B5E1D8"
   },
   "Enterprise and Production Systems (internal)": {
      "Colour": "#D6D681"
   },
   "GEL (Global Experience Language) (internal)": {
      "Colour": "#f0c400"
   },
   "Emerging Experiences": {
      "Colour": "#FFBC30"
   },
   "Portfolio Level Initiatives": {
      "Colour": "#FFC1C8"
   },
   "Research Ops (internal)": {
      "Colour": "#A37177"
   }
};

let researchLookUp = {
	'Exploratory':'exploring',
	'Foundational':'understanding the needs and perceptions',
	'Generative':'understanding the needs',
	'Evaluative':'testing',
	'Practise':'improving'
}

function initIcon(){
	ids.forEach(function(id){
		$('#'+id).hide();
	});
	$('#audience_circle').css('stroke-width',2);
}

function getParameters(){
	let url_string = window.location.href;
	let url = new URL(url_string);
	let questions = {'q1':'','q2':'','q3':'','q4':'','q5':[],'q6':'','q7':'','q8':'','q9':'','q10':[],'q11':'','q12':[],'q13':[]}
	for(key in questions){
		if(Object.prototype.toString.call(questions[key]) === '[object Array]'){
			questions[key] = url.searchParams.get(key).split('|').slice(0, -1);
		} else {
			questions[key] = url.searchParams.get(key);
		};
	}
	
	updateIcon(questions);
	updateSentence(questions);
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
		$('#generatedsentence').css('color',color);
		$('.answertext').css('color',color);
	}

	let goalWordList = questions.q2.split(' ');
	let text1 = '';
	let text2 = '';
	let text3 = '';
	goalWordList.forEach(function(word,i){
		if(i<2){
			text1 += word+' ';
		}
		if(i<4&&i>1){
			text2 += word+' ';
		}
		if(i>3){
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

function updateSentence(questions){
	let sentenceHTML = 'A project to <span class="answertext">' +questions['q2'].toLowerCase() + '</span> on <span class="answertext">'+questions['q1']+'</span> by <span class="answertext">' + researchLookUp[questions['q3']]+ '</span> <span class="answertext">'+questions['q4']+'</span>';
	$('#generatedsentence2').html(sentenceHTML);
}

function generateSVG(){
	var svg = document.getElementById("icon_1");
	var serializer = new XMLSerializer();
	console.log(svg);
	var source = serializer.serializeToString(svg);

	//convert svg source to URI data scheme.
	var url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);
	download();
	function download(){
        var dl = document.createElement("a");
        document.body.appendChild(dl); // This line makes it work in Firefox.
        dl.setAttribute("href", url);
        dl.setAttribute("download", "project_icon.svg");
        dl.click();
    }
}

function downloadPNG(){
	$('#canvas').attr('width',1000);
	$('#canvas').attr('height',1000);
	var svg = document.getElementById("icon_1");
	var serializer = new XMLSerializer();
	var source = serializer.serializeToString(svg);

	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var DOMURL = self.URL || self.webkitURL || self;
	var img = new Image();
	var svg = new Blob([source], {
	  type: "image/svg+xml;charset=utf-8"
	});
	var url = DOMURL.createObjectURL(svg);
	img.onload = function() {
	  ctx.drawImage(img, 0, 0);
	  var imgURL = canvas.toDataURL("image/png");
	   DOMURL.revokeObjectURL(imgURL);
	  var dlLink = document.createElement('a');
	  let name = 'project_icon';
	  dlLink.download = name;
	  dlLink.href = imgURL;
	  dlLink.dataset.downloadurl = ["image/png", dlLink.download, dlLink.href]
	                              .join(':');
	  document.body.appendChild(dlLink);
	  dlLink.click();
	  document.body.removeChild(dlLink);
	}
	img.src = url;
}

$('#downloadpng').on('click',function(){
	downloadPNG();
});

$('#downloadsvg').on('click',function(){
	generateSVG();
});

getParameters();