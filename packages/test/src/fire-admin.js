"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const optica_f5ca7_firebase_adminsdk_vcmxv_ae1007907e_json_1 = __importDefault(require("./optica-f5ca7-firebase-adminsdk-vcmxv-ae1007907e.json"));
let fireAdmin = firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(optica_f5ca7_firebase_adminsdk_vcmxv_ae1007907e_json_1.default),
});
exports.default = fireAdmin;
//# sourceMappingURL=fire-admin.js.map