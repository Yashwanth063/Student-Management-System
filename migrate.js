const admin = require("firebase-admin");
const fs = require("fs");

// Initialize Firebase Admin
const serviceAccount = require("./serviceAccountKey.json"); // Download from Firebase Console
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore();

// Read JSON data
const data = JSON.parse(fs.readFileSync("realtime-db.json", "utf8")); // Your exported JSON

async function migrateData() {
  for (const [key, value] of Object.entries(data)) {
    await firestore.collection("your_collection_name").doc(key).set(value);
    console.log(`Migrated ${key}`);
  }
  console.log("Migration complete!");
}

migrateData();
