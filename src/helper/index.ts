import type { InternshipDetails } from '@/features/user-profile/myapplication/types/index.ts';
import { parseISO, differenceInDays, parse, format } from 'date-fns';

export const formatTime = (seconds: number) => {
   const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
   const secs = (seconds % 60).toString().padStart(2, '0');
   return `${minutes}:${secs}`;
};

export const formatDate = (date: Date) => {
   const AccDate = new Date(date);
   return AccDate.toISOString().substring(0, 10);
};

const parseDate = (dateString: string): Date => {
   if (!dateString) return new Date();

   const parseMethods = [
      () => parseISO(dateString),
      () => parse(dateString, 'dd-MM-yyyy', new Date()),
      () => new Date(dateString)
   ];

   for (const parseMethod of parseMethods) {
      const date = parseMethod();
      if (!isNaN(date.getTime())) {
         return date;
      }
   }

   return new Date();
};

export function calculateProgress(internship: InternshipDetails) {
   const today = new Date();
   const start = parseDate(internship.startDate);
   const end = parseDate(internship.endDate);
   const durationInDays = internship.durationInDays;

   const baseReturn = {
      formattedStartDate: format(start, 'dd MMM yyyy'),
      formattedEndDate: format(end, 'dd MMM yyyy'),
      shortStartDate: format(start, 'dd MMM'),
      shortEndDate: format(end, 'dd MMM')
   };

   if (today < start) {
      return {
         ...baseReturn,
         progress: 0,
         phase: 'not_started' as const,
         daysRemaining: durationInDays,
         daysUntilStart: differenceInDays(start, today)
      };
   }
   if (today > end) {
      return {
         ...baseReturn,
         progress: 100,
         phase: 'completed' as const,
         daysRemaining: 0,
         completedDaysAgo: differenceInDays(today, end)
      };
   }

   const progress = Math.min(100, ((differenceInDays(today, start) + 1) / durationInDays) * 100);

   return {
      ...baseReturn,
      progress: Number(progress.toFixed(2)),
      phase: 'in_progress' as const,
      daysRemaining: Math.max(0, differenceInDays(end, today) + 1),
      daysSinceStart: differenceInDays(today, start) + 1
   };
}
