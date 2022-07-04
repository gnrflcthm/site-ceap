import { NextPage, GetServerSideProps, Redirect } from "next";

const NewsIndex: NextPage = () => {
    return null;
};

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        redirect: {
            destination: "/news-and-events/1",
            permanent: false,
        },
    };
};

export default NewsIndex;
