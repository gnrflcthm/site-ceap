import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getAuth } from "firebase-admin/auth";
import "../../firebase/admin";
import { serialize } from "cookie";

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
            context.res.setHeader(
                "Set-Cookie",
                serialize("token", "", {
                    expires: new Date(0),
                    maxAge: 0,
                    httpOnly: true,
                    sameSite: true,
                    // secure: true
                    path: "/",
                })
            );
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
