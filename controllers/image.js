const Clarifai = require( 'clarifai');


const appClarifai = new Clarifai.App({
    apiKey: '6db181cd35e74f609d3956b56cb11f6f'
   });

   const handleAPICall = (req,res) => {
    appClarifai.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
       // console.log(data);

        res.json(data);
    })
   .catch(err => res.status(400).json("unable to work api"));

   }

const handleImage = (db) => (req,res) => {
    const {id} = req.body;

    db ('users').where('id', '=', id)
    .increment('entries',1)
    .returning('entries')
    .then(entries => res.json(entries[0]))
    .catch(err => res.status(400).json("unable to get entries."))
    
}

module.exports = {
    handleImage,
    handleAPICall
};
