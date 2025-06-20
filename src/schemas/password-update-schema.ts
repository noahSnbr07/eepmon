import { string, z as zod } from "zod";

const schema = zod.object({
    password: string()
        .min(4, "Minimum Length: 4")
        .max(24, "Max Length: 24")
});

export default schema;