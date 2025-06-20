import { z as zod } from "zod";

const schema = zod.object({
    minHours: zod.coerce.number()
        .min(2, { message: "Minimum is 4 hours" })
        .max(14, { message: "Maximum is 8 hours" }),
    preferredHours: zod.coerce.number()
        .min(2, { message: "Minimum is 4 hours" })
        .max(14, { message: "Maximum is 8 hours" }),
    maxHours: zod.coerce.number()
        .min(2, { message: "Minimum is 4 hours" })
        .max(14, { message: "Maximum is 8 hours" }),
    delay: zod.coerce.number()
        .min(0, { message: "Minimum is 0 hours" })
        .max(1, { message: "Maximum is 1 hour" }),
    logCap: zod.coerce.number()
        .min(0, { message: "Minimum is 1 log" })
        .max(31, { message: "Maximum is 31 logs" }),
});

export default schema;