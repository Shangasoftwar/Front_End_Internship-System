export type InternshipDetails = {
   id: number;
   department: string;
   position: string;
   status: 'completed' | 'pending' | 'accepted';
   startDate: string;
   endDate: string;
   university: string;
   universityDepartment: string;
   durationInDays: number;
   durationInMonth: number;
};
