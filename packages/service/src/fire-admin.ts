import admin from "firebase-admin"
import serviceAccount from "./optica-f5ca7-firebase-adminsdk-vcmxv-ae1007907e.json";
let fireAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
});
export default fireAdmin
