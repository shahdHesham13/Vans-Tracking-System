import express from 'express';
import mongoose from 'mongoose';
import { PORT , mongoDBURL} from './config.js';
import dotenv from 'dotenv';
import { Van } from './models/vansModel.js';
import vansRoute from './routes/vansRoute.js';

dotenv.config();

const app = express();
app.use(express.json());


//get a resource from a server
app.get('/', (request, response) => {
    console.log(request);
    return response.status(200).send('VANS!');
  });


app.use('/vans', vansRoute);

//connect to MongoDB using mongoose
mongoose.connect(mongoDBURL)
    .then(() => {  //start the server only if connection is successful
     console.log('Successful Connection to Database');
     app.listen(PORT, () => { console.log(`App is listening to port: ${PORT}`); });
    })
    .catch((error) => {console.log(error);});