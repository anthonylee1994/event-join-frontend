import {useNavigate, useParams} from "react-router-dom";
import {AspectRatio, Box, Image, Table, Tag, Tbody, Td, Text, Tr} from "@chakra-ui/react";
import {useDetailStore} from "../../stores/useDetailStore.ts";
import React from "react";
import {BackButton, MainButton, useWebApp} from "@vkruglikov/react-telegram-web-app";
import moment from "moment";
import {useEventStore} from "../../stores/useEventStore.ts";
import {LinearProgress} from "../../components/LinearProgress.tsx";

export const DetailPage = () => {
    const params = useParams<{id: string}>();
    const isFetching = useDetailStore(state => state.isFetching);
    const fetchDetail = useDetailStore(state => state.fetchDetail);
    const setKeyword = useEventStore(state => state.setKeyword);
    const detail = useDetailStore(state => state.detail);

    const navigate = useNavigate();
    const webApp = useWebApp();

    const goBack = () => {
        navigate("/");
    };

    React.useEffect(() => {
        if (params.id) {
            fetchDetail(params.id);
        }
    }, [fetchDetail, params.id]);

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Box>
            <BackButton onClick={goBack} />
            <LinearProgress isLoading={isFetching} />
            {detail && (
                <Box bgColor="white">
                    {detail.photo_url && (
                        <AspectRatio ratio={16 / 9}>
                            <Image w="full" src={detail.photo_url} />
                        </AspectRatio>
                    )}
                    <Box m={3} fontWeight="bold" fontSize="xl" textAlign="center">
                        {detail.title}
                    </Box>
                    <Box mx={3} fontSize="md" pb={3}>
                        {detail.description.split("\n").map((line, index) => (
                            <Text as="p" key={index} mb={2}>
                                {line}
                            </Text>
                        ))}
                    </Box>
                    <Table variant="striped">
                        <Tbody>
                            <Tr>
                                <Td w="30%" fontWeight="bold">
                                    開始時間
                                </Td>
                                <Td>{moment(detail.start_time).format("LL a h:mm")}</Td>
                            </Tr>
                            {detail.end_time && (
                                <Tr>
                                    <Td fontWeight="bold">結束時間</Td>
                                    <Td>{moment(detail.end_time).format("LL a h:mm")}</Td>
                                </Tr>
                            )}
                            {detail.address && (
                                <Tr>
                                    <Td fontWeight="bold">地址</Td>
                                    <Td>
                                        <Text
                                            as="pre"
                                            wordBreak="break-all"
                                            whiteSpace="pre-wrap"
                                            textDecoration="underline"
                                            color="blue.500"
                                            cursor="pointer"
                                            onClick={() => {
                                                webApp.openLink(`https://www.google.com/maps/search/?api=1&query=${detail.address}`);
                                            }}
                                        >
                                            {detail.address}
                                        </Text>
                                    </Td>
                                </Tr>
                            )}
                            {detail.quota && (
                                <Tr>
                                    <Td fontWeight="bold">名額</Td>
                                    <Td>{detail.quota}</Td>
                                </Tr>
                            )}
                            {detail.fee && (
                                <Tr>
                                    <Td fontWeight="bold">費用</Td>
                                    <Td>
                                        <Text as="pre" wordBreak="break-all" whiteSpace="pre-wrap" lineHeight={1.5}>
                                            {detail.fee}
                                        </Text>
                                    </Td>
                                </Tr>
                            )}
                            <Tr>
                                <Td fontWeight="bold">標籤</Td>
                                <Td>
                                    {detail.hashtags.map(hashtag => (
                                        <Tag
                                            m={1}
                                            colorScheme="blue"
                                            key={hashtag}
                                            cursor="pointer"
                                            onClick={e => {
                                                e.stopPropagation();
                                                goBack();
                                                setKeyword(`#${hashtag}`);
                                            }}
                                        >
                                            #{hashtag}
                                        </Tag>
                                    ))}
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                    <MainButton text="參加活動" onClick={() => webApp.openLink(detail.join_link)} />
                </Box>
            )}
        </Box>
    );
};
