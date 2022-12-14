const cheerio = require("cheerio");
const axios = require("axios");
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
	let final = [];
	// $(`.m-detail--body ul li`)
	// 	.get()
	//     .map((li) => captions.push($(li).text())
	//     );

	$(`.m-detail--body ul`).each((_, ul) => {
		let title = $(ul.previousSibling.previousSibling).text();
		let captions = [];
		$(ul)
			.children()
			.each((_, li) => {
				captions.push($(li).text());
			});

		let data = { title, captions };
		final.push(data);
	});

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
