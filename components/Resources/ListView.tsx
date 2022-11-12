import { VStack } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

const ListView: FC<PropsWithChildren> = ({ children }) => {
    return (
        <VStack w={"full"} pb={"10"} overflowY={"auto"}>
            {children}
        </VStack>
    );
};

export default ListView;

{
    /* 
    {(() => {
        if (data && !isLoading) {
            if (data.length > 0) {
                if ("blobPath" in data[0]) {
                    return (
                        <>
                            {data.map((d) => (
                                <ResourceItem
                                    view={view}
                                    resource={d as ResourceItemType}
                                    reload={() => {
                                        if (!isLoading) {
                                            setMode("resources");
                                            clear();
                                            refetch(
                                                `/api/resource/folders/${current?.id}/resources`
                                            );
                                        }
                                    }}
                                    onManage={manageResource}
                                />
                            ))}
                        </>
                    );
                } else {
                    return (
                        <>
                            {data.map((f) => (
                                <FolderItem
                                    folder={f as FolderType}
                                    onClick={() => navigateFolder(f.id)}
                                />
                            ))}
                        </>
                    );
                }
            } else {
                return (
                    <Text gridColumn={"1 / 5"}>
                        There are currently no {mode} available.
                    </Text>
                );
            }
        } else {
            if (isLoading) {
                return (
                    <Center w={"full"} placeSelf={"center"} gridColumn={"1/6"}>
                        <CircularProgress
                            isIndeterminate
                            color={"secondary"}
                            size={12}
                        />
                    </Center>
                );
            } else {
                return <Text>There are currently no {mode} available.</Text>;
            }
        }
    })()}
</VStack>; */
}
