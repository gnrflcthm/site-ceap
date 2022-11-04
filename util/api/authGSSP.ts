import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getAuth } from "firebase-admin/auth";
import "../../firebase/admin";
import axios from "axios";
import { AccountType } from "@util/Enums";

export interface GetServerSidePropsContextWithUser
    extends GetServerSidePropsContext {
    uid?: string;
}

export default function AuthGetServerSideProps(
    handler: GetServerSideProps,
    authorizedRoles?: AccountType[]
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

            if (authorizedRoles) {
                const { customClaims } = await auth.getUser(tokenResult.uid);

                if (customClaims) {
                    if (!customClaims.role) {
                        return {
                            props: {},
                            redirect: {
                                destination: "/",
                                statusCode: 307,
                            },
                        };
                    }
                    if (!authorizedRoles.includes(customClaims.role)) {
                        return {
                            props: {},
                            redirect: {
                                destination: "/",
                                statusCode: 307,
                            },
                        };
                    }
                } else {
                    return {
                        props: {},
                        redirect: {
                            destination: "/",
                            statusCode: 307,
                        },
                    };
                }
            }
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
