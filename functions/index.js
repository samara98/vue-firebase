const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.checkAlias = functions.https.onCall(data => {
	const ref = admin
		.firestore()
		.collection("users-geo-ninjas")
		.doc(data.slug);

	return ref
		.get()
		.then(doc => {
			return { unique: !doc.exists };
		})
		.catch(() => {
			throw new functions.https.HttpsError("failed to connect");
		});
});
