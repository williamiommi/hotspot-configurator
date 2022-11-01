import * as Popover from '@radix-ui/react-popover';
import { RefObject } from 'react';

interface PopoverComponentProps {
  children: React.ReactNode;
  collisionBoundaryRef: RefObject<HTMLDivElement>;
  title: string;
  content: string;
}
const PopoverComponent = ({
  children,
  collisionBoundaryRef,
  title,
  content,
}: PopoverComponentProps) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>{children}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          collisionBoundary={collisionBoundaryRef.current}
          collisionPadding={2}
          className="flex flex-col bg-white p-2 rounded-lg max-w-xs shadow-xl"
        >
          <h3 className="font-bold">{title}</h3>
          <p>{content}</p>
          <Popover.Close />
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default PopoverComponent;
