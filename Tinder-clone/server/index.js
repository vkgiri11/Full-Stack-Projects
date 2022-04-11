import express from "express";
import { MongoClient } from "mongodb";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const PORT = 8000;
const uri = "mongodb+srv://vkgiri:vkgiri@cluster0.q7p4j.mongodb.net/Cluster0?retryWrites=true&w=majority";

app.get("/", (req, res) => {
	res.send("App is Running !!");
});

app.post("/signup", async (req, res) => {
	const client = new MongoClient(uri);
	const { email, password } = req.body;

	const generatedUserId = uuidv4();
	const hashedPassword = await bcrypt.hash(password, 10);

	try {
		await client.connect();
		const database = client.db("app-data");
		const users = database.collection("users");

		const existingUser = await users.findOne({ email });

		if (existingUser) return res.status(409).send("User Already exists. Please Login!!");

		const data = {
			user_id: generatedUserId,
			email: email,
			hashedPassword: hashedPassword,
		};

		const insertedUSer = await users.insertOne(data);

		const token = jwt.sign(insertedUSer, email, {
			expiresIn: 60,
		});

		res.status(201).json({ token, userId: generatedUserId });
	} catch (error) {
		console.log(error);
	}
});

app.post("/login", async (req, res) => {
	const client = new MongoClient(uri);
	const { email, password } = req.body;

	try {
		await client.connect();
		const database = client.db("app-data");
		const users = database.collection("users");

		const user = await users.findOne({ email });
		const isCorrectPassword = await bcrypt.compare(password, user.hashedPassword);

		if (user && isCorrectPassword) {
			const token = jwt.sign(user, email, {
				expiresIn: 60,
			});
			res.status(201).json({ token, userId: user.user_id });
		}

		res.status(400).send("Invalid Credentials");
	} catch (error) {
		console.log(error);
	}
});

app.put("/user", async (req, res) => {
	const client = new MongoClient(uri);
	const formData = req.body.formData;

	try {
		await client.connect();
		const database = client.db("app-data");
		const users = database.collection("users");

		const query = { user_id: formData.user_id };
		const updateDocument = {
			$set: {
				first_name: formData.first_name,
				dob_day: formData.dob_day,
				dob_month: formData.dob_month,
				dob_year: formData.dob_year,
				show_gender: formData.show_gender,
				gender_identity: formData.gender_identity,
				gender_interest: formData.gender_interest,
				url: formData.url,
				about: formData.about,
				matches: formData.matches,
			},
		};

		const insertedUser = await users.updateOne(query, updateDocument);

		res.send(insertedUser);
	} finally {
		await client.close();
	}
});

app.get("/users", async (req, res) => {
	const client = new MongoClient(uri);

	try {
		await client.connect();
		const database = client.db("app-data");
		const users = database.collection("users");

		const returnedUsers = await users.find.toArray();
		res.send(returnedUsers);
	} finally {
		await client.close();
	}
});

app.listen(PORT, () => console.log("Server Running on port " + PORT));
