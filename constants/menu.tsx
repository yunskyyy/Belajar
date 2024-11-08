import {
  IcCalendar,
  IcComponent,
  IcDashboard,
  IcDisbursement,
  IcEmployee,
  IcLevel,
  IcManagement,
  IcPayrollData,
  IcPayslip,
  IcPerson,
  IcPosition,
  IcReimbuse,
  IcSavings,
} from '@/components/icons';
import type { Menu } from '@/types/menu';

const MENUS: Menu[] = [
  {
    id: '2',
    path: '/user-access-management',
    name: 'User Access Management',
    icon: <IcPerson />,
  },
  {
    id: '3',
    path: '/calendar-management',
    name: 'Company Calendar',
    icon: <IcManagement />,
  },
  {
    id: '4',
    path: '/4',
    name: 'Master Data',
    icon: null,
    subMenu: [
      {
        id: '4-1',
        path: '/master-data/employee-data',
        name: 'Master Data Employee',
        icon: <IcEmployee />,
      },
      {
        id: '4-2',
        path: '/master-data/position',
        name: 'Master Data Position',
        icon: <IcPosition />,
      },
      {
        id: '4-3',
        path: '/master-data/level',
        name: 'Master Data Level',
        icon: <IcLevel />,
      },
    ],
  },
  {
    id: '5',
    path: '/5',
    name: 'Payroll',
    icon: null,
    subMenu: [
      {
        id: '5-1',
        path: '/payroll/dashboard',
        name: 'Dashboard',
        icon: <IcDashboard />,
      },
      {
        id: '5-2',
        path: '/payroll/cutoff-period',
        name: 'Cut Off Period',
        icon: <IcCalendar />,
      },
      {
        id: '5-3',
        path: '/payroll/payroll-component',
        name: 'Payroll Component',
        icon: <IcComponent />,
      },
      {
        id: '5-4',
        path: '/payroll/additional-earning/',
        name: 'Additional Earning',
        icon: <IcSavings />,
        subMenu: [
          {
            id: '5-4-1',
            path: '/payroll/additional-earning/overtime',
            name: 'Overtime',
            icon: null,
          },
          {
            id: '5-4-2',
            path: '/payroll/additional-earning/onsite-incentive',
            name: 'Onsite & Incentive',
            icon: null,
          },
        ],
      },
      {
        id: '5-5',
        path: '/payroll/payroll-data',
        name: 'Payroll Data',
        icon: <IcPayrollData />,
      },
      {
        id: '5-6',
        path: '/payroll/disbursement/',
        name: 'Disbursement',
        icon: <IcDisbursement />,
        subMenu: [
          {
            id: '5-6-1',
            path: '/payroll/disbursement/run-payroll',
            name: 'Run Payroll',
            icon: null,
          },
          {
            id: '5-6-2',
            path: '/payroll/disbursement/run-thr',
            name: 'Run THR',
            icon: null,
          },
        ],
      },
      {
        id: '5-7',
        path: '/payroll/payslip/',
        name: 'Payslip',
        icon: <IcPayslip />,
        subMenu: [
          {
            id: '5-7-1',
            path: '/payroll/payslip/payslip-payroll',
            name: 'Payslip Payroll',
            icon: null,
          },
          {
            id: '5-7-2',
            path: '/payroll/payslip/payslip-thr',
            name: 'Payslip THR',
            icon: null,
          },
        ],
      },
    ],
  },
  {
    id: '6',
    path: '/6',
    name: 'Reimbursement',
    icon: null,
    subMenu: [
      {
        id: '6-1',
        path: '/reimbursement/reimburse-component',
        name: 'Reimburse Component',
        icon: <IcReimbuse />,
      },
      {
        id: '6-2',
        path: '/reimbursement/reimburse-settings',
        name: 'Reimburse Settings',
        icon: <IcReimbuse />,
      },
      {
        id: '6-3',
        path: '/reimbursement/reimburse-list',
        name: 'Reimburse List',
        icon: <IcReimbuse />,
      },
    ],
  },
];

export default MENUS;
