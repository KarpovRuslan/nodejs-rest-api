const express = require("express");

const ctrl = require("../../controllers/contacts-controller");

const { validateBody } = require("../../decorators");

const isValidId = require("../../middlewares/isValidId");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:id", isValidId, ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

router.put(
  "/:id",
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

router.delete("/:id", ctrl.removeContact);

module.exports = router;
