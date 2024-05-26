import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
    {
        id: 2,
        label: 'MENUITEMS.DASHBOARDS.TEXT',
        icon: 'bx-home-circle',
        subItems: [
            {
                id: 3,
                label: 'MENUITEMS.DASHBOARDS.LIST.DEFAULT',
                link: '/dashboard',
                parentId: 2
            },
          /*  {
                id: 4,
                label: 'MENUITEMS.DASHBOARDS.LIST.SAAS',
                link: '/dashboards/saas',
                parentId: 2
            },
            */
   
         ]
    },
    {
        id: 8,
        isLayout: true
    },

    {
        id: 49,
        label: 'MENUITEMS.CONTACTS.TEXT',
        icon: 'bxs-user-detail',
        subItems: [
        
            {
                id: 51,
                label: 'MENUITEMS.CONTACTS.LIST.USERLIST',
                link: '/contacts/list',
                parentId: 49
            },
            {
                id: 52,
                label: 'MENUITEMS.CONTACTS.LIST.PROFILE',
                link: '/contacts/profile',
                parentId: 49
            }
        ]
    },
    {
        id: 57,
        label: 'MENUITEMS.JOBS.TEXT',
        icon: 'bx-briefcase-alt',
        subItems: [
            {
                id: 58,
                label: 'MENUITEMS.JOBS.LIST.JOBLIST',
                link: '/jobs/list',
                parentId: 57
            },
            {
                id: 59,
                label: 'MENUITEMS.JOBS.LIST.JOBGRID',
                link: '/jobs/grid',
                parentId: 57
            },
          /*  {
                id: 60,
                label: 'MENUITEMS.JOBS.LIST.APPLYJOB',
                link: '/jobs/apply',
                parentId: 57
            },
            {
                id: 61,
                label: 'MENUITEMS.JOBS.LIST.JOBDETAILS',
                link: '/jobs/details',
                parentId: 57
            },
            {
                id: 62,
                label: 'MENUITEMS.JOBS.LIST.JOBCATEGORIES',
                link: '/jobs/categories',
                parentId: 57
            },
            */
        ]
    },
];

