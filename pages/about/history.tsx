import { NextPage } from "next";

import Head from "next/head";

import  HistoryDisplay  from "../../components/About/History";

const History: NextPage = () => {
    return (
        <>
            <Head>
                <title>History</title>
            </Head>
            <HistoryDisplay />
        </>
    );
};

export default History;
