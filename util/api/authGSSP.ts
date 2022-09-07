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

        const auth = getAuth();
        const { uid } = await auth.verifyIdToken(token);

        context.uid = uid;

        return handler(context);
    };
}
