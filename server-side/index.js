require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors({
    origin: ['https://b10a12.web.app',
        'https://b10a12.firebaseapp.com',
        'http://localhost:5173'
    ],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8irzt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        //await client.connect();

        const db = client.db("FitnessTrackerDB");
        const usersCollection = db.collection("users");
        const articlesCollection = db.collection("articles");
        const reviewsCollection = db.collection("reviews");
        const classesCollection = db.collection("classes");
        const transactionCollection = db.collection("transactions");
        const subscriberCollection = db.collection("subscribers");

        // jwt related api
        app.post('/jwt', async (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.JWT_SECRET_TOKEN, { expiresIn: '6h' });
            res.send({ token });
        })

        // middlewares
        const verifyToken = (req, res, next) => {
            console.log(req.headers);
            if (!req.headers.authorization) {
                return res.status(401).send({ message: 'forbidden access' });
            }
            const token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err, decoded) => {
                if (err) {
                    return res.status(401).send({ message: 'forbidden access' })
                }
                req.decoded = decoded;
                next();
            })
        }

        // ALL GET METHOD TO-DOs
        // get all articles information
        app.get("/articles", async (req, res) => {
            const result = await articlesCollection.find().toArray();
            res.send(result);
        })

        // get all reviews information
        app.get("/reviews", async (req, res) => {
            const result = await reviewsCollection.find().toArray();
            res.send(result);
        })

        // get all classes information
        app.get("/classes", async (req, res) => {
            const result = await classesCollection.find().toArray();
            res.send(result);
        })

        // get all payment information
        app.get("/save-payment-info", async (req, res) => {
            const result = await transactionCollection.find().toArray();
            res.send(result);
        })


        // get one class information
        app.get('/classes/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await classesCollection.findOne(query);
            res.send(result);
        })

        // get all users information
        app.get("/users", async (req, res) => {
            //console.log(req.headers)
            const result = await usersCollection.find().toArray();
            res.send(result);
        })

        // get all users information
        app.get("/usersbyadmin", verifyToken, async (req, res) => {
            //console.log(req.headers)
            const result = await usersCollection.find().toArray();
            res.send(result);
        })

        // get one trainer (from user) information
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            // Updated query to include role filter along with _id
            const query = { _id: new ObjectId(id), role: 'trainer' };

            const result = await usersCollection.findOne(query);

            // Check if a trainer was found; if not, return an appropriate message
            if (result) {
                res.send(result);
            } else {
                res.status(404).send({ message: 'Trainer not found' });
            }
        });

        // get one article information
        app.get('/articles/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await articlesCollection.findOne(query);
            res.send(result);
        })

        // get user information from the email
        app.get('/users', async (req, res) => {
            const email = req.query.email;  // Get email from query parameters
            console.log("Received email for query:", email); // Debug: Log the received email

            if (!email) {
                return res.status(400).json({ message: 'Email is required' });
            }

            try {
                const user = await usersCollection.findOne({ email: email });
                console.log("Database query result:", user); // Debug: Log the result of the query

                if (user) {
                    res.json(user);  // Return only the found user object
                } else {
                    res.status(404).json({ message: 'User not found' });
                }
            } catch (error) {
                console.error('Database error:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });

        // app.get('/save-payment-info', async (req, res) => {
        //     const email = req.query.email;
        //     console.log("Received email for query:", email);

        //     if (!email) {
        //         return res.status(400).json({ message: 'Email is required' });
        //     }

        //     try {
        //         const user = await transactionCollection.findOne({ email: email });
        //         console.log("Database query result:", user);

        //         if (user) {
        //             res.json(user);
        //         } else {
        //             res.status(404).json({ message: 'User not found' });
        //         }
        //     } catch (error) {
        //         console.error('Database error:', error);
        //         res.status(500).json({ message: 'Internal server error' });
        //     }
        // });

        // update user(member information) to user(trainer information)
        app.patch('/users/updateByEmail', async (req, res) => {
            const { email } = req.body; // email is passed in the request body
            const updateData = {
                $set: {
                    request_status: "requested",
                    biography: req.body.biography,
                    areas_of_expertise: req.body.areas_of_expertise,
                    years_of_experience: req.body.years_of_experience,
                    available_slots: req.body.available_slots,
                    social_url: req.body.social_url
                }
            };

            if (!email) {
                return res.status(400).send({ message: 'Email address is required for updating the profile.' });
            }

            try {
                const result = await usersCollection.updateOne({ email: email }, updateData);
                if (result.modifiedCount === 0) {
                    return res.status(404).send({ message: 'No user found with the provided email address' });
                }
                res.send({ message: 'User updated successfully', result });
            } catch (error) {
                res.status(500).send({ message: 'Error updating user', error });
            }
        });

        // add slot information to the user
        app.patch('/users/updateByEmail2', async (req, res) => {
            const { email } = req.body; // email is passed in the request body
            const updateData = {
                $set: {
                    slot_duration: req.body.slot_duration,
                    available_classes: req.body.available_classes,
                }
            };

            if (!email) {
                return res.status(400).send({ message: 'Email address is required for updating the profile.' });
            }

            try {
                const result = await usersCollection.updateOne({ email: email }, updateData);
                if (result.modifiedCount === 0) {
                    return res.status(404).send({ message: 'No user found with the provided email address' });
                }
                res.send({ message: 'User updated successfully', result });
            } catch (error) {
                res.status(500).send({ message: 'Error updating user', error });
            }
        });

        // cancel member request status from requested to none
        app.patch('/users/:id', async (req, res) => {
            const { id } = req.params;
            const { request_status } = req.body;
            const query = { _id: new ObjectId(id) };
            const update = { $set: { request_status: request_status } };
            const result = await usersCollection.updateOne(query, update);

            if (result.modifiedCount > 0) {
                res.send({ message: "Request status updated successfully" });
            } else {
                res.status(404).send({ message: "User not found" });
            }
        });

        // admin approve user from member to trainer
        app.patch('/users/:id/approve', async (req, res) => {
            try {
                await client.connect();
                const result = await usersCollection.updateOne(
                    { _id: new ObjectId(req.params.id) },
                    { $set: { request_status: "approved", role: "trainer" } }
                );

                if (result.modifiedCount === 0) {
                    return res.status(404).send({ message: "User not found or no changes made" });
                }

                res.send({ message: "User approved and role updated to trainer" });
            } catch (error) {
                res.status(500).send({ message: error.message });
            }
        })

        // admin reject user from trainer
        app.patch('/users/:id/reject', async (req, res) => {
            try {
                await client.connect();
                const result = await usersCollection.updateOne(
                    { _id: new ObjectId(req.params.id) },
                    { $set: { request_status: "rejected" } }
                );

                if (result.modifiedCount === 0) {
                    return res.status(404).send({ message: "User not found or no changes made" });
                }

                res.send({ message: "User request status updated to rejected" });
            } catch (error) {
                res.status(500).send({ message: error.message });
            }
        })

        // post article information
        app.post('/articles', async (req, res) => {
            const newArticle = req.body;
            const result = await articlesCollection.insertOne(newArticle);
            res.send(result);
        })

        // post subscriber information
        app.post('/subscribers', async (req, res) => {
            const newSubscriber = req.body;
            const result = await subscriberCollection.insertOne(newSubscriber);
            res.send(result);
        })

        // post class information
        app.post('/classes', async (req, res) => {
            const newArticle = req.body;
            const result = await classesCollection.insertOne(newArticle);
            res.send(result);
        })

        // post article vote information
        app.post('/articles/:id/vote', async (req, res) => {
            const articleId = req.params.id;
            const voteType = req.body.type;
            const updateField = voteType === 'upvote' ? { upvote: 1 } : { downvote: 1 };

            try {
                // Use 'articlesCollection' directly instead of fetching it again
                await articlesCollection.updateOne(
                    { _id: new ObjectId(articleId) },
                    { $inc: updateField }
                );
                const updatedArticle = await articlesCollection.findOne({ _id: new ObjectId(articleId) });
                res.status(200).send({ upvote: updatedArticle.upvote, downvote: updatedArticle.downvote });
            } catch (error) {
                console.error('Error updating vote:', error);
                res.status(500).send('Error updating vote');
            }
        });

        // post user information
        app.post('/users', async (req, res) => {
            let newUser = req.body;

            // Set default role to "member" if it's not provided
            if (!newUser.role) {
                newUser.role = "member";
            }

            if (!newUser.request_status) {
                newUser.request_status = "none";
            }

            // Create a query to check if the user already exists
            const query = { email: newUser.email }; // Make sure to use newUser.email

            // Check if the user already exists
            const existingUser = await usersCollection.findOne(query);
            if (existingUser) {
                return res.status(409).send({ message: 'User already exists!', insertedId: null }); // It's good to use status codes for errors
            }

            // Insert the new user into the database
            const result = await usersCollection.insertOne(newUser);
            res.send(result);
        });

        // insert payment information the transactions collection
        app.post('/create-payment-intent', async (req, res) => {
            const { price } = req.body;
            try {
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: price,
                    currency: 'usd',
                });
                res.json({ clientSecret: paymentIntent.client_secret });
            } catch (error) {
                console.error("Error creating payment intent:", error.message);
                res.status(500).send({ error: error.message });
            }
        });

        // Save transaction details in the db collection
        app.post('/save-payment-info', async (req, res) => {
            const newTransaction = req.body;
            try {
                // First, find the trainer with the matching trainerId from the usersCollection
                const trainer = await usersCollection.findOne({ _id: new ObjectId(newTransaction.trainerId) });

                if (trainer) {
                    // Convert slot_duration from string to number
                    let slotDuration = parseInt(trainer.slot_duration, 10);

                    // Check if slot_duration can be decreased
                    if (slotDuration > 0) {
                        // Decrease slot_duration by 1
                        slotDuration -= 1;

                        // Convert slot_duration back to string
                        const updatedTrainer = await usersCollection.updateOne(
                            { _id: new ObjectId(newTransaction.trainerId) },
                            { $set: { slot_duration: slotDuration.toString() } }
                        );

                        // Ensure the trainer was updated successfully
                        if (updatedTrainer.modifiedCount === 1) {
                            // Proceed with saving the transaction
                            const result = await transactionCollection.insertOne(newTransaction);
                            res.send(result);
                        } else {
                            throw new Error('Failed to update trainer slot duration');
                        }
                    } else {
                        throw new Error('No available slots to decrease');
                    }
                } else {
                    throw new Error('Trainer not found');
                }
            } catch (error) {
                console.error('Error processing the transaction:', error.message);
                res.status(500).send({ error: error.message });
            }
        });

        // delete user information
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await usersCollection.deleteOne(query);
            res.send(result);
        })

        // Send a ping to confirm a successful connection
        //await client.db("admin").command({ ping: 1 });
        //console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

// Route to test if the server is running
app.get('/', (req, res) => {
    res.send("Fitness Tracker is running");
});

// Start the server
app.listen(port, () => {
    console.log(`Fitness Tracker is running on port ${port}`);
});
