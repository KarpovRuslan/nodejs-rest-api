const express = require("express");

const ctrl = require("../../controllers/contacts-controller");

const { validateBody } = require("../../decorators");

const { isValidId, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, ctrl.listContacts);

router.get("/:id", authenticate, isValidId, ctrl.getContactById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.addContact
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

router.delete("/:id", authenticate, ctrl.removeContact);

module.exports = router;
