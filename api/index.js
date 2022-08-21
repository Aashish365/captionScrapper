const scapper = require("./scrapper");
const express = require("express");
const { env } = require("process");
const cors = require("cors");

const app = express();
app.use(cors());

async function scrape() {
	res = await axios.get(
		`https://turbofuture.com/internet/Short-Captions-for-Profile-Pictures`
	);
	const body = await res.data;
	const $ = cheerio.load(body);

	const caption = $(`ul`).text();

	const final = [];
	final.push(caption);
	return final;
}

app.get("/api", async (req, res) => {
	const result = await scrape();
	res.send(JSON.stringify(result));
});

port = env.PORT || 3000;
app.listen(port, () => {
	console.log(`Listening to port ${port}`);
});
