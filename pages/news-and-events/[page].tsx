import { Box, VStack } from "@chakra-ui/react"
import { GetServerSideProps, NextPage, } from "next";
import { ParsedUrlQuery } from "querystring";
import NewsComponent from "../../components/NewsEvents/News/NewsComponent"
import SectionHeading from "../../components/SectionHeading";
import img1 from "../../assets/News and Events/News/1.jpg"

interface NewsPageProps {
    page: string;
}

const NewsPage: NextPage<NewsPageProps> = ({ page }) => {
    return (
        <>
            <SectionHeading color={"primary"} my={"10"}>
                Latest News
            </SectionHeading>
            <VStack spacing={10} m="10">
                <NewsComponent src={img1.src} heading="Lorem ipsum dolor sit amet." date="July 15, 2022" story="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus, doloremque?"></NewsComponent>
                <NewsComponent src={img1.src} heading="Lorem ipsum dolor sit amet." date="July 15, 2022" story="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus, doloremque?"></NewsComponent>
                <NewsComponent src={img1.src} heading="Lorem ipsum dolor sit amet." date="July 15, 2022" story="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus, doloremque?"></NewsComponent>
                <NewsComponent src={img1.src} heading="Lorem ipsum dolor sit amet." date="July 15, 2022" story="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus, doloremque?"></NewsComponent>
            </VStack>
        </>
    )
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
