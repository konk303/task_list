import { ReactNode } from 'react';
import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from './ui/dialog.tsx';
import { Button } from './ui/button.tsx';

export default function ListEditDialog ({
    children,
    text,
    colorPalette,
    label,
    executeHandler
}: {
    children: ReactNode
    text: string
    colorPalette: string
    label: string
    executeHandler: () => void
}) {
    return (
        <DialogRoot
            role="alertdialog"
            placement="center"
            size="lg"
        >
            <DialogTrigger asChild>
                { children }
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <p>{ text }</p>
                </DialogBody>
                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button variant="outline">キャンセル</Button>
                    </DialogActionTrigger>
                    <DialogActionTrigger asChild>
                        <Button
                            colorPalette={ colorPalette }
                            onClick={ executeHandler }
                        >{ label }</Button>
                    </DialogActionTrigger>
                </DialogFooter>
                <DialogCloseTrigger />
            </DialogContent>
        </DialogRoot>

    )
}
