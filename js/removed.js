function generateQuestions(id,questions,screen,onChangeFunction){
	let html = `
		<div class="row questionblock">
			<div class="col-md-12">
				<p class="question">{{ question }}</p>
				<p class="notes">{{ notes }}</p>
				{{ questioninput }}
			</div>
		</div>
	`;
	questions[screen].forEach(function(q){
		let qHTML = html.replace('{{ question }}',q.question).replace('{{ notes }}',q.notes);
		if(q.type=='select'){
			let selectHTML = generateSelect(q,q.id);
			qHTML = qHTML.replace('{{ questioninput }}',selectHTML);
		}
		if(q.type=='input'){
			let inputHTML = generateInput(q.id);
			qHTML = qHTML.replace('{{ questioninput }}',inputHTML);
		}
		$(id).append(qHTML);
	});

	$('.form-select').on('change',
		function(){
			questions = onChangeFunction(questions);
		}	
	);

}

function generateSelect(q,id){
	let html = `
		<select id="{{ id }}" class="form-select">
			<option value=""></option>
			{{ options }}
		</select>
	`;
	let optionsHTML = '';
	let optionHTML = '<option value="{{ optionvalue }}">{{ option }}</option>';
	q.options.forEach(function(o){
		optionsHTML += optionHTML.replace('{{ optionvalue }}',o).replace('{{ option }}',o).replace('{{ id }}',id);
	});
	html = html.replace('{{ options }}',optionsHTML);
	return html;	
}

function generateInput(id){
	let html = `
		<input class="form-control" type="text" id="{{ id }}" style="width:100%">
	`;
	html = html.replace('{{ id }}',id);
	return html;	
}