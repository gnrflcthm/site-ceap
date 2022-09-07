import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getAuth } from "firebase-admin/auth";
import "../../firebase/admin";

export interface GetServerSidePropsContextWithUser
    extends GetServerSidePropsContext {
    uid?: string;
}

export default function AuthGetServerSideProps(
    handler: GetServerSideProps
): GetServerSideProps {
    return async (context: GetServerSidePropsContextWithUser) => {
        const { req } = context;
        const { token } = req.cookies;

        if (!token) {
            return {
                props: {},
                redirect: {
                    destination: "/",
                    statusCode: 307,
                },
            };
        }

        var tokenResult;

        const auth = getAuth();
        try {
            tokenResult = await auth.verifyIdToken(token);
        } catch (err) {
            console.log("Invalid Token.");
            return {
                props: {},
                redirect: {
                    destination: "/",
                    statusCode: 307,
                },
            };
        }

        context.uid = tokenResult.uid;

        return handler(context);
    };
}
