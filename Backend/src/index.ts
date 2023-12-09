import app from './app';
import 'reflect-metadata';

const port = 3001;

app.listen(port, () => {
    console.log(`App escuchando en el puerto ${port}.`);
});
