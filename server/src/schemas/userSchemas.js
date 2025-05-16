const { z } = require('zod');

const userSchema = z.object({
    id: z.string(),
    username: z.string().transform(val => val.replaceAll(' ', '')).pipe(z.string().min(3)),
    password: z.string().transform(val => val.replaceAll(' ', '')).pipe(z.string().min(3)),
    picture: z.string().url(),
    data: z.object({
        info: z.object({
            name: z.string().trim().nonempty(),
            location: z.string().trim().nonempty(),
            bio: z.string().trim().nonempty().max(50)
        }),
        links: z.array(z.object({
            name: z.string().trim().nonempty(),
            url: z.string().transform(async (val) => {
                    let returnString;
                    let newString = val.replaceAll(' ', '')
                    if (!URL.canParse(newString)) {
                        returnString = new URL(`https://${newString}`).toString();
                    } else {
                        const input = new URL(newString)
                        input.protocol = 'https:'
                        returnString = input.toString();
                    }
                    const response = await fetch(returnString);
                    if (response.status == 200) {
                        return returnString;
                    } return '';
                })
                .pipe(z.string().url().nonempty())
        })).min(1)
    })
});

const newUserSchema = userSchema.omit({ picture: true, id: true }).partial({ data: true });

const userJSONResponseSchema = userSchema.omit({ password: true });

const userUpdateSchema = userSchema.pick({ data: true }).deepPartial();

module.exports = {
    userSchema,
    newUserSchema,
    userJSONResponseSchema,
    userUpdateSchema
}