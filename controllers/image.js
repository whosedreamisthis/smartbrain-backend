const Clarifai = require( 'clarifai');

console.log(process.env.CLARIFAI_API_KEY);
const appClarifai = new Clarifai.App({
    apiKey: process.env.API_CLARIFAI
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
