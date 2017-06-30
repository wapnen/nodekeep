module.exports = function(app, db){

var ObjectId = require('mongodb').ObjectId;

	app.post('/notes' ,(req,res)=>{

		db.collection('notes');
		const note = {text: req.body.body , title: req.body.title};
		db.collection('notes').insert(note, (err, result)=>{
			if(err){
				res.send({'error': "error dey o!"});

			}
			else{
				res.send(result.ops[0]);
			}
		});

		 console.log(req.body);
		
	});
	

	//read a single note 
	app.get('/notes/:id', (req, res)=>{
		const id = req.params.id;
			
		const details = {'_id' : new ObjectId(id)};
		db.collection('notes').findOne(details, (err, item)=>{

			if(err){
				res.send({'error' : 'baba error de o '});
			}
			else{

			res.send(item);	
			}
		});
	});

		//read all notes 
	app.get('/notes', (req, res)=>{
		db.collection('notes').find({}, (err, item)=>{

			if(err){
				res.send({'error' : 'baba error de o '});
			}
			else{

			res.send(item);	
			}
		});
	});

	//delete a note
	app.delete('/notes/:id', (req, res)=>{
		const id = req.params.id;
		const details = {'_id' : new ObjectId(id)};
		db.collection('notes').remove(details, (err, item) =>{
			if(err){
				res.send({'error' : 'baba error de o '});
			}
			else{

			res.send("Note " +id + " deleted");	
			}
		});
	});

	//update a note 
	app.put('/notes/:id', (req, res)=>{
		const id = req.params.id;
		const details = {'_id' : ObjectId(id)};
		const note = {text: req.body.body, title : req.body.title};
		db.collection('notes').update(details, note, (err, item)=>{
			if(err){
				res.send({'error' : "baba this one no correct so"});
			}
			else{
				res.send(note);
			}
		});
	});

};