"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fire_admin_1 = __importDefault(require("./fire-admin"));
exports.default = {
    register: async ({ strapi }) => {
        console.log('register');
        // ...
    },
    bootstrap: async ({ strapi }) => {
        //Make Firebase available everywhere
        strapi.sendPush = fire_admin_1.default.messaging().sendMulticast;
    }
};
//# sourceMappingURL=index.js.map