
import { Subject, Day } from './types';

export const SUBJECTS: Subject[] = [
  {
    id: 'pss',
    code: 'MA23435',
    name: 'Probability, Statistics and Simulation',
    teachers: [
      {
        id: 'pss-subha',
        name: 'M Subha',
        department: 'Department of Mathematics',
        group: 2,
        slots: [
          { day: Day.Friday, startTime: '09:00', endTime: '09:50', location: 'TBD', type: 'Theory' },
          { day: Day.Saturday, startTime: '14:10', endTime: '15:00', location: 'TBD', type: 'Theory' },
          { day: Day.Saturday, startTime: '15:00', endTime: '15:50', location: 'TBD', type: 'Theory' },
          { day: Day.Friday, startTime: '11:50', endTime: '13:20', location: 'Lab', type: 'Lab' }
        ]
      },
      {
        id: 'pss-bharathi',
        name: 'Bharathi Dharmaraj',
        department: 'Department of Mathematics',
        group: 4,
        slots: [
          { day: Day.Thursday, startTime: '14:10', endTime: '15:00', location: 'TBD', type: 'Theory' },
          { day: Day.Friday, startTime: '14:10', endTime: '15:00', location: 'TBD', type: 'Theory' },
          { day: Day.Saturday, startTime: '12:00', endTime: '12:50', location: 'TBD', type: 'Theory' },
          { day: Day.Wednesday, startTime: '10:00', endTime: '11:40', location: 'Lab', type: 'Lab' }
        ]
      },
      {
        id: 'pss-ramalakshmi',
        name: 'Ramalakshmi K',
        department: 'Department of Mathematics',
        group: 2,
        slots: [
          { day: Day.Friday, startTime: '09:00', endTime: '09:50', location: 'TBD', type: 'Theory' },
          { day: Day.Saturday, startTime: '14:10', endTime: '15:00', location: 'TBD', type: 'Theory' },
          { day: Day.Saturday, startTime: '15:00', endTime: '15:50', location: 'TBD', type: 'Theory' },
          { day: Day.Friday, startTime: '11:50', endTime: '13:20', location: 'Lab', type: 'Lab' }
        ]
      },
      {
        id: 'pss-balavidhya',
        name: 'Balavidhya S',
        department: 'Department of Mathematics',
        group: 4,
        slots: [
          { day: Day.Wednesday, startTime: '10:00', endTime: '10:50', location: 'TBD', type: 'Theory' },
          { day: Day.Wednesday, startTime: '11:00', endTime: '11:50', location: 'TBD', type: 'Theory' },
          { day: Day.Thursday, startTime: '14:10', endTime: '15:00', location: 'TBD', type: 'Theory' },
          { day: Day.Saturday, startTime: '11:50', endTime: '13:20', location: 'Lab', type: 'Lab' }
        ]
      },
      {
        id: 'pss-akshaya',
        name: 'A Akshaya',
        department: 'Department of Mathematics',
        group: 2,
        slots: [
          { day: Day.Friday, startTime: '09:00', endTime: '09:50', location: 'TBD', type: 'Theory' },
          { day: Day.Friday, startTime: '12:00', endTime: '12:50', location: 'TBD', type: 'Theory' },
          { day: Day.Saturday, startTime: '14:10', endTime: '15:00', location: 'TBD', type: 'Theory' },
          { day: Day.Saturday, startTime: '15:00', endTime: '16:40', location: 'Lab', type: 'Lab' }
        ]
      },
      {
        id: 'pss-venkatesan',
        name: 'J Venkatesan',
        department: 'Department of Mathematics',
        group: 4,
        slots: [
          { day: Day.Thursday, startTime: '14:10', endTime: '15:00', location: 'TBD', type: 'Theory' },
          { day: Day.Friday, startTime: '14:10', endTime: '15:00', location: 'TBD', type: 'Theory' },
          { day: Day.Saturday, startTime: '12:00', endTime: '12:50', location: 'TBD', type: 'Theory' },
          { day: Day.Wednesday, startTime: '10:00', endTime: '11:40', location: 'Lab', type: 'Lab' }
        ]
      },
      {
        id: 'pss-arulmozhi',
        name: 'Arulmozhi Shanmugam',
        department: 'Department of Mathematics',
        group: 4,
        slots: [
          { day: Day.Thursday, startTime: '14:10', endTime: '15:00', location: 'TBD', type: 'Theory' },
          { day: Day.Friday, startTime: '14:10', endTime: '15:00', location: 'TBD', type: 'Theory' },
          { day: Day.Saturday, startTime: '12:00', endTime: '12:50', location: 'TBD', type: 'Theory' },
          { day: Day.Wednesday, startTime: '10:00', endTime: '11:40', location: 'Lab', type: 'Lab' }
        ]
      },
      {
        id: 'pss-thilagavathi',
        name: 'R Thilagavathi',
        department: 'Department of Mathematics',
        group: 4,
        slots: [
          { day: Day.Wednesday, startTime: '10:00', endTime: '10:50', location: 'TBD', type: 'Theory' },
          { day: Day.Wednesday, startTime: '11:00', endTime: '11:50', location: 'TBD', type: 'Theory' },
          { day: Day.Thursday, startTime: '14:10', endTime: '15:00', location: 'TBD', type: 'Theory' },
          { day: Day.Saturday, startTime: '11:50', endTime: '13:20', location: 'Lab', type: 'Lab' }
        ]
      },
      {
        id: 'pss-yuvashri',
        name: 'Yuvashri P',
        department: 'Department of Mathematics',
        group: 2,
        slots: [
          { day: Day.Friday, startTime: '08:00', endTime: '08:50', location: 'TBD', type: 'Theory' },
          { day: Day.Friday, startTime: '09:00', endTime: '09:50', location: 'TBD', type: 'Theory' },
          { day: Day.Saturday, startTime: '14:10', endTime: '15:00', location: 'TBD', type: 'Theory' },
          { day: Day.Saturday, startTime: '15:00', endTime: '16:40', location: 'Lab', type: 'Lab' }
        ]
      }
    ]
  },
  {
    id: 'dti',
    code: 'GE23627',
    name: 'Design Thinking and Innovation',
    teachers: [
      {
        id: 'dti-balakumar-g3',
        name: 'Balakumar B L',
        department: 'Dept. of CS & Engineering',
        group: 3,
        slots: [
          { day: Day.Thursday, startTime: '08:00', endTime: '08:50', location: 'TBD', type: 'Theory' },
          { day: Day.Thursday, startTime: '09:00', endTime: '09:50', location: 'TBD', type: 'Theory' },
          { day: Day.Saturday, startTime: '10:00', endTime: '10:50', location: 'TBD', type: 'Theory' },
          { day: Day.Saturday, startTime: '11:00', endTime: '11:50', location: 'TBD', type: 'Theory' }
        ]
      },
      {
        id: 'dti-balakumar-g2',
        name: 'Balakumar B L',
        department: 'Dept. of CS & Engineering',
        group: 2,
        slots: [
          { day: Day.Friday, startTime: '08:00', endTime: '08:50', location: 'TBD', type: 'Theory' },
          { day: Day.Friday, startTime: '09:00', endTime: '09:50', location: 'TBD', type: 'Theory' },
          { day: Day.Saturday, startTime: '14:10', endTime: '15:00', location: 'TBD', type: 'Theory' },
          { day: Day.Saturday, startTime: '15:00', endTime: '15:50', location: 'TBD', type: 'Theory' }
        ]
      },
      {
        id: 'dti-jaeyalakshmi',
        name: 'Jaeyalakshmi M',
        department: 'Dept. of CS & Engineering',
        group: 2,
        slots: [
          { day: Day.Friday, startTime: '08:00', endTime: '08:50', location: 'TBD', type: 'Theory' },
          { day: Day.Friday, startTime: '09:00', endTime: '09:50', location: 'TBD', type: 'Theory' },
          { day: Day.Saturday, startTime: '14:10', endTime: '15:00', location: 'TBD', type: 'Theory' },
          { day: Day.Saturday, startTime: '15:00', endTime: '15:50', location: 'TBD', type: 'Theory' }
        ]
      },
      {
        id: 'dti-bhuvaneswari-g2',
        name: 'Bhuvaneswari R',
        department: 'Dept. of CS & Engineering',
        group: 2,
        slots: [
          { day: Day.Friday, startTime: '08:00', endTime: '08:50', location: 'TBD', type: 'Theory' },
          { day: Day.Friday, startTime: '09:00', endTime: '09:50', location: 'TBD', type: 'Theory' },
          { day: Day.Saturday, startTime: '14:10', endTime: '15:00', location: 'TBD', type: 'Theory' },
          { day: Day.Saturday, startTime: '15:00', endTime: '15:50', location: 'TBD', type: 'Theory' }
        ]
      },
      {
        id: 'dti-murali-g3',
        name: 'Murali Bhaskaran V',
        department: 'Dept. of CS & Engineering',
        group: 3,
        slots: [
          { day: Day.Thursday, startTime: '08:00', endTime: '08:50', location: 'TBD', type: 'Theory' },
          { day: Day.Thursday, startTime: '09:00', endTime: '09:50', location: 'TBD', type: 'Theory' },
          { day: Day.Saturday, startTime: '10:00', endTime: '10:50', location: 'TBD', type: 'Theory' },
          { day: Day.Saturday, startTime: '11:00', endTime: '11:50', location: 'TBD', type: 'Theory' }
        ]
      },
      {
        id: 'dti-murali-g2',
        name: 'Murali Bhaskaran V',
        department: 'Dept. of CS & Engineering',
        group: 2,
        slots: [
          { day: Day.Friday, startTime: '08:00', endTime: '08:50', location: 'TBD', type: 'Theory' },
          { day: Day.Friday, startTime: '09:00', endTime: '09:50', location: 'TBD', type: 'Theory' },
          { day: Day.Saturday, startTime: '14:10', endTime: '15:00', location: 'TBD', type: 'Theory' },
          { day: Day.Saturday, startTime: '15:00', endTime: '15:50', location: 'TBD', type: 'Theory' }
        ]
      },
      {
        id: 'dti-bhuvaneswari-g3',
        name: 'Bhuvaneswari R',
        department: 'Dept. of CS & Engineering',
        group: 3,
        slots: [
          { day: Day.Thursday, startTime: '08:00', endTime: '08:50', location: 'TBD', type: 'Theory' },
          { day: Day.Thursday, startTime: '09:00', endTime: '09:50', location: 'TBD', type: 'Theory' },
          { day: Day.Saturday, startTime: '10:00', endTime: '10:50', location: 'TBD', type: 'Theory' },
          { day: Day.Saturday, startTime: '11:00', endTime: '11:50', location: 'TBD', type: 'Theory' }
        ]
      }
    ]
  },
  {
    id: 'os',
    code: 'CS23431',
    name: 'Operating Systems',
    teachers: [
      {
        id: 'os-jenitha',
        name: 'Jenitha T',
        department: 'Dept. of CS & Engineering',
        group: 1,
        slots: [
          { day: Day.Tuesday, startTime: '08:00', endTime: '09:40', location: 'Lab', type: 'Lab' },
          { day: Day.Wednesday, startTime: '13:20', endTime: '15:00', location: 'Lab', type: 'Lab' },
          { day: Day.Thursday, startTime: '10:00', endTime: '11:40', location: 'Lab', type: 'Lab' },
          { day: Day.Friday, startTime: '10:00', endTime: '11:40', location: 'Lab', type: 'Lab' }
        ]
      },
      {
        id: 'os-sabitha',
        name: 'R Sabitha',
        department: 'Dept. of CS & Engineering',
        group: 1,
        slots: [
          { day: Day.Tuesday, startTime: '08:00', endTime: '09:40', location: 'Lab', type: 'Lab' },
          { day: Day.Thursday, startTime: '15:00', endTime: '16:40', location: 'Lab', type: 'Lab' },
          { day: Day.Friday, startTime: '10:00', endTime: '11:40', location: 'Lab', type: 'Lab' },
          { day: Day.Saturday, startTime: '15:00', endTime: '16:40', location: 'Lab', type: 'Lab' }
        ]
      },
      {
        id: 'os-karthi',
        name: 'Karthi S',
        department: 'Dept. of CS & Engineering',
        group: 1,
        slots: [
          { day: Day.Tuesday, startTime: '08:00', endTime: '09:40', location: 'Lab', type: 'Lab' },
          { day: Day.Wednesday, startTime: '13:20', endTime: '15:00', location: 'Lab', type: 'Lab' },
          { day: Day.Thursday, startTime: '10:00', endTime: '11:40', location: 'Lab', type: 'Lab' },
          { day: Day.Thursday, startTime: '15:00', endTime: '16:40', location: 'Lab', type: 'Lab' }
        ]
      },
      {
        id: 'os-dharani',
        name: 'G Dharani Devi',
        department: 'Dept. of CS & Engineering',
        group: 1,
        slots: [
          { day: Day.Wednesday, startTime: '08:00', endTime: '09:40', location: 'Lab', type: 'Lab' },
          { day: Day.Thursday, startTime: '10:00', endTime: '11:40', location: 'Lab', type: 'Lab' },
          { day: Day.Thursday, startTime: '15:00', endTime: '16:40', location: 'Lab', type: 'Lab' },
          { day: Day.Friday, startTime: '15:00', endTime: '16:40', location: 'Lab', type: 'Lab' }
        ]
      },
      {
        id: 'os-anand',
        name: 'K Anand',
        department: 'Dept. of CS & Engineering',
        group: 1,
        slots: [
          { day: Day.Wednesday, startTime: '08:00', endTime: '09:40', location: 'Lab', type: 'Lab' },
          { day: Day.Thursday, startTime: '15:00', endTime: '16:40', location: 'Lab', type: 'Lab' },
          { day: Day.Friday, startTime: '10:00', endTime: '11:40', location: 'Lab', type: 'Lab' },
          { day: Day.Friday, startTime: '15:00', endTime: '16:40', location: 'Lab', type: 'Lab' }
        ]
      },
      {
        id: 'os-bhuvaneswari',
        name: 'Bhuvaneswari R',
        department: 'Dept. of CS & Engineering',
        group: 1,
        slots: [
          { day: Day.Tuesday, startTime: '08:00', endTime: '09:40', location: 'Lab', type: 'Lab' },
          { day: Day.Wednesday, startTime: '08:00', endTime: '09:40', location: 'Lab', type: 'Lab' },
          { day: Day.Wednesday, startTime: '13:20', endTime: '15:00', location: 'Lab', type: 'Lab' },
          { day: Day.Thursday, startTime: '10:00', endTime: '11:40', location: 'Lab', type: 'Lab' }
        ]
      },
      {
        id: 'os-harikumar',
        name: 'Mr. Harikumar',
        department: 'Dept. of CS & Engineering',
        group: 1,
        slots: [
          { day: Day.Tuesday, startTime: '08:00', endTime: '09:40', location: 'Lab', type: 'Lab' },
          { day: Day.Wednesday, startTime: '08:00', endTime: '09:40', location: 'Lab', type: 'Lab' },
          { day: Day.Wednesday, startTime: '13:20', endTime: '15:00', location: 'Lab', type: 'Lab' },
          { day: Day.Friday, startTime: '10:00', endTime: '11:40', location: 'Lab', type: 'Lab' }
        ]
      }
    ]
  },
  {
    id: 'sc',
    code: 'CS23432',
    name: 'Software Construction',
    teachers: [
      {
        id: 'sc-akiladevi-g4',
        name: 'Akiladevi R',
        department: 'Dept. of CS & Engineering',
        group: 4,
        slots: [
          { day: Day.Thursday, startTime: '14:10', endTime: '15:00', location: 'TBD', type: 'Theory' },
          { day: Day.Friday, startTime: '14:10', endTime: '15:00', location: 'TBD', type: 'Theory' },
          { day: Day.Saturday, startTime: '12:00', endTime: '12:50', location: 'TBD', type: 'Theory' },
          { day: Day.Wednesday, startTime: '10:00', endTime: '11:40', location: 'Lab', type: 'Lab' }
        ]
      },
      {
        id: 'sc-srinivasan-g3',
        name: 'Srinivasan N',
        department: 'Dept. of CS & Engineering',
        group: 3,
        slots: [
          { day: Day.Tuesday, startTime: '14:10', endTime: '15:00', location: 'TBD', type: 'Theory' },
          { day: Day.Thursday, startTime: '08:00', endTime: '08:50', location: 'TBD', type: 'Theory' },
          { day: Day.Thursday, startTime: '12:00', endTime: '12:50', location: 'TBD', type: 'Theory' },
          { day: Day.Saturday, startTime: '10:00', endTime: '11:40', location: 'Lab', type: 'Lab' }
        ]
      },
      {
        id: 'sc-srinivasan-g4',
        name: 'Srinivasan N',
        department: 'Dept. of CS & Engineering',
        group: 4,
        slots: [
          { day: Day.Wednesday, startTime: '11:00', endTime: '11:50', location: 'TBD', type: 'Theory' },
          { day: Day.Thursday, startTime: '14:10', endTime: '15:00', location: 'TBD', type: 'Theory' },
          { day: Day.Friday, startTime: '14:10', endTime: '15:00', location: 'TBD', type: 'Theory' },
          { day: Day.Saturday, startTime: '11:50', endTime: '13:20', location: 'Lab', type: 'Lab' }
        ]
      },
      {
        id: 'sc-new-faculty',
        name: 'New Faculty (IT234)',
        department: 'Dept. of IT',
        group: 3,
        slots: [
          { day: Day.Tuesday, startTime: '14:10', endTime: '15:00', location: 'TBD', type: 'Theory' },
          { day: Day.Thursday, startTime: '09:00', endTime: '09:50', location: 'TBD', type: 'Theory' },
          { day: Day.Thursday, startTime: '12:00', endTime: '12:50', location: 'TBD', type: 'Theory' },
          { day: Day.Saturday, startTime: '10:00', endTime: '11:40', location: 'Lab', type: 'Lab' }
        ]
      },
      {
        id: 'sc-mahesmeena',
        name: 'Mahesmeena .',
        department: 'Dept. of CS & Engineering',
        group: 4,
        slots: [
          { day: Day.Thursday, startTime: '14:10', endTime: '15:00', location: 'TBD', type: 'Theory' },
          { day: Day.Friday, startTime: '14:10', endTime: '15:00', location: 'TBD', type: 'Theory' },
          { day: Day.Saturday, startTime: '12:00', endTime: '12:50', location: 'TBD', type: 'Theory' },
          { day: Day.Wednesday, startTime: '10:00', endTime: '11:40', location: 'Lab', type: 'Lab' }
        ]
      },
      {
        id: 'sc-bhavani',
        name: 'Bhavani M',
        department: 'Dept. of CS & Engineering',
        group: 4,
        slots: [
          { day: Day.Thursday, startTime: '14:10', endTime: '15:00', location: 'TBD', type: 'Theory' },
          { day: Day.Friday, startTime: '14:10', endTime: '15:00', location: 'TBD', type: 'Theory' },
          { day: Day.Saturday, startTime: '12:00', endTime: '12:50', location: 'TBD', type: 'Theory' },
          { day: Day.Wednesday, startTime: '10:00', endTime: '11:40', location: 'Lab', type: 'Lab' }
        ]
      },
      {
        id: 'sc-akiladevi-g3',
        name: 'Akiladevi R',
        department: 'Dept. of CS & Engineering',
        group: 3,
        slots: [
          { day: Day.Tuesday, startTime: '14:10', endTime: '15:00', location: 'TBD', type: 'Theory' },
          { day: Day.Saturday, startTime: '10:00', endTime: '10:50', location: 'TBD', type: 'Theory' },
          { day: Day.Saturday, startTime: '11:00', endTime: '11:50', location: 'TBD', type: 'Theory' },
          { day: Day.Tuesday, startTime: '15:00', endTime: '16:40', location: 'Lab', type: 'Lab' }
        ]
      }
    ]
  },
  {
    id: 'rpa',
    code: 'CS23A32',
    name: 'Robotic Process Automation',
    teachers: [
      {
        id: 'rpa-bhuvaneswaran',
        name: 'Bhuvaneswaran B',
        department: 'Dept. of CS & Engineering',
        group: 5,
        slots: [
          { day: Day.Tuesday, startTime: '13:20', endTime: '14:10', location: 'TBD', type: 'Theory' },
          { day: Day.Tuesday, startTime: '11:50', endTime: '13:20', location: 'Lab', type: 'Lab' },
          { day: Day.Wednesday, startTime: '15:00', endTime: '16:40', location: 'Lab', type: 'Lab' }
        ]
      }
    ]
  }
];
