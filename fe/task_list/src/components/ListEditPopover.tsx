import { Flex, PopoverTrigger } from '@chakra-ui/react';
import { Button } from './ui/button.tsx';
import { PopoverArrow, PopoverBody, PopoverContent, PopoverRoot, PopoverTitle } from './ui/popover.tsx';
import { ReactNode } from 'react';

export default function ListEditPopover ({
    children,
    buttonText,
    label,
}: {
    children: ReactNode
    buttonText: string
    label: string
}) {
    return (
        <PopoverRoot lazyMount unmountOnExit positioning={ { placement: "left-end" } }>
            <PopoverTrigger asChild>
                <Button colorPalette="blue">
                    <span className={ "material-icons" }>{ buttonText }</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent zIndex="banner">
                <PopoverArrow />
                <PopoverBody>
                    <PopoverTitle fontWeight="medium">{ label }</PopoverTitle>
                    <Flex gap="5" align="baseline">
                        { children }
                    </Flex>
                </PopoverBody>
            </PopoverContent >
        </PopoverRoot >
    )
}
