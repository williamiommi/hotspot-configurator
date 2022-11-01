import * as Tooltip from '@radix-ui/react-tooltip';
import { RefObject } from 'react';

interface TooltipComponentProps {
  children: React.ReactNode;
  collisionBoundaryRef: RefObject<HTMLDivElement>;
  title: string;
  content: string;
}
const TooltipComponent = ({
  children,
  collisionBoundaryRef,
  title,
  content,
}: TooltipComponentProps) => {
  return (
    <Tooltip.Provider delayDuration={100}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            collisionBoundary={collisionBoundaryRef.current}
            collisionPadding={2}
            className="flex flex-col bg-white p-2 rounded-lg max-w-xs shadow-xl"
          >
            <h3 className="font-bold">{title}</h3>
            <p>{content}</p>
            <Tooltip.Arrow className="fill-white" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default TooltipComponent;
