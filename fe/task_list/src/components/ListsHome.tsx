import { Heading, Highlight } from "@chakra-ui/react";

export default function ListsHome () {
    return (
        <Heading size="2xl" fontWeight="bold" p="4">
            <Highlight query="選択" styles={ { color: "red.500" } }>
                Listを選択してください
            </Highlight>
        </Heading>
    )
}
