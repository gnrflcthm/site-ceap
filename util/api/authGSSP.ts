import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getAuth } from "firebase-admin/auth";
import "../../firebase/admin";
import { serialize } from "cookie";
import axios from "axios";

export interface GetServerSidePropsContextWithUser
    extends GetServerSidePropsContext {
    uid?: string;
}

export default function AuthGetServerSideProps(
    handler: GetServerSideProps
): GetServerSideProps {
    return async (context: GetServerSidePropsContextWithUser) => {
        const { req } = context;
        const { session } = req.cookies;

        if (!session) {
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
            tokenResult = await auth.verifySessionCookie(session);
        } catch (err) {
            console.debug(err);
            await axios.head("/api/user/logout");
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
