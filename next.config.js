global.__basedir = __dirname;

module.exports = {
    async redirects() {
        return [
            {
                source: "/registration",
                destination: "/registration/user_registration",
                permanent: true,
            },
        ];
    },
};
