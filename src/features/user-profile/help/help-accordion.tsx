import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger
} from '@/components/ui/accordion';
import type { ReactNode } from 'react';

type HelpAccordionType = {
   title: string;
   description: ReactNode;
};

export function HelpAccordion({ title, description }: HelpAccordionType) {
   return (
      <Accordion type="single" collapsible>
         <AccordionItem
            value="item-1"
         className="bg-white rounded-xl px-3 py-3 border border-gray-200 last:border-b data-[state=open]:border-primary-500"
         >
            <AccordionTrigger
               className="px-4 py-1 font-semibold text-gray-600 text-base
                     data-[state=open]:text-primary-500 hover:no-underline hover:cursor-pointer "
            >
               {title}
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-0 text-md text-gray-600">{description}</AccordionContent>
         </AccordionItem>
      </Accordion>
   );
}
