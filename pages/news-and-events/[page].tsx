import { Box } from "@chakra-ui/react"
import {
    GetServerSideProps,
    NextPage,
} from "next";
import { ParsedUrlQuery } from "querystring";

interface NewsPageProps {
    page: string;
}

const NewsPage: NextPage<NewsPageProps> = ({ page }) => {
    return <Box>{page}</Box>;
};

interface NewsPageParams extends ParsedUrlQuery {
    page: string;
}

export const getServerSideProps: GetServerSideProps<{
    [key: string]: string;
}> = async (context) => {
    const { page } = context.params as NewsPageParams;
    return {
        props: {
            page,
        },
    };
};

export default NewsPage;
