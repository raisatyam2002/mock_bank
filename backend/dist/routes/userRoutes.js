"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControlller_1 = require("../controller/userControlller");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.send({
        message: "hi from user routes",
    });
});
router.post("/login", userControlller_1.loginController);
exports.default = router;
