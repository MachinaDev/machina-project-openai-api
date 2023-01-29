import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const backURL = process.env.URL || 'http://localhost';
const backPORT = process.env.PORT || 5200;

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
	res.status(200).send({
		message: "Salut c'est ChatGPT d'OpenAI!",
	});
});

app.post('/', async (req, res) => {
	try {
		const prompt = req.body.prompt;

		const response = await openai.createCompletion({
			model: 'text-davinci-003',
			prompt: `${prompt}`,
			temperature: 0, // Des valeurs plus grandes amène le modèle à prendre de plus gros risques en terme de réponse.
			max_tokens: 3000, // Le nombre maximum de tokens à générer dans la complétion. La plupart des modèles ont une longueur de contexte de 2048 jetons (à l'exception des modèles les plus récents, qui prennent en charge 4096).
			top_p: 1, // Alternative à l'échantillonnage avec le paramètre 'température', appelé échantillonnage de noyau 'nucleus sampling'.
			frequency_penalty: 0.5, // Nombre compris entre -2,0 et 2,0. Les valeurs positives pénalisent les nouveaux tokens en fonction de leur fréquence existante dans le texte jusqu'à présent, ce qui réduit la probabilité que le modèle répète la même ligne textuellement.
			presence_penalty: 0, // Nombre compris entre -2,0 et 2,0. Les valeurs positives pénalisent les nouveaux tokens en fonction de leur apparition dans le texte jusqu'à présent, ce qui augmente la probabilité que le modèle parle de nouveaux sujets.
		});

		res.status(200).send({
			bot: response.data.choices[0].text,
		});
	} catch (error) {
		console.error(error);
		res.status(500).send(error || 'Quelquechose a mal tourné...');
	}
});

app.listen(backPORT, () => console.log(`Serveur Express disponible sur : ${backURL}:${backPORT}`));
